'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import {
  useAccount,
  useBalance,
  usePublicClient,
  useReadContract,
  useSendTransaction,
  useSwitchChain,
  useWriteContract,
} from 'wagmi';
import { erc20Abi, maxUint256 } from 'viem';
import { PAIR_TOKENS, ETH, WWOJAK, type Token } from './lib/tokens';
import {
  BASE_CHAIN_ID,
  BASESCAN_URL,
  DEFAULT_SLIPPAGE_BPS,
  SWAP_FEE_BPS,
} from './lib/constants';
import type { ZeroExQuote } from './lib/zeroex';
import { fromBaseUnits, toBaseUnits } from './lib/format';

type Phase =
  | 'idle'
  | 'switching'
  | 'quoting'
  | 'approving'
  | 'swapping'
  | 'success'
  | 'error';

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`toggle ${on ? 'on' : ''}`}
      onClick={() => onChange(!on)}
    >
      <span className="knob" />
    </button>
  );
}

function TokenIcon({ token, size = 24 }: { token: Token; size?: number }) {
  return (
    <img
      className="token-ic"
      src={token.logo}
      alt={token.symbol}
      width={size}
      height={size}
      style={{ width: size, height: size, background: token.color }}
    />
  );
}

/** Fixed badge (used for the wWojak side — not selectable). */
function TokenBadge({ token }: { token: Token }) {
  return (
    <span className="token-badge">
      <TokenIcon token={token} />
      {token.symbol}
    </span>
  );
}

/** Selectable badge with a dropdown (used for the counter-token side). */
function TokenSelect({
  token,
  onSelect,
}: {
  token: Token;
  onSelect: (t: Token) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="token-select">
      <button
        className="token-badge selectable"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <TokenIcon token={token} />
        {token.symbol}
        <span className="chevron" aria-hidden="true" />
      </button>
      {open && (
        <>
          <div className="picker-backdrop" onClick={() => setOpen(false)} />
          <div className="token-menu">
            {PAIR_TOKENS.map((t) => (
              <button
                key={t.symbol}
                className={`token-menu-item ${
                  t.symbol === token.symbol ? 'active' : ''
                }`}
                onClick={() => {
                  onSelect(t);
                  setOpen(false);
                }}
                type="button"
              >
                <TokenIcon token={t} size={28} />
                <span className="tm-sym">{t.symbol}</span>
                <span className="tm-name">{t.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function SwapCard() {
  const { ready, authenticated, login } = usePrivy();
  const { address, chainId } = useAccount();
  const publicClient = usePublicClient();
  const { switchChainAsync } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  // wWojak is always one side; `pairToken` is the selectable other side.
  const [pairToken, setPairToken] = useState<Token>(ETH);
  // false => buying wWojak (pay pairToken); true => selling wWojak (receive pairToken)
  const [sellingWojak, setSellingWojak] = useState(false);

  const sellToken = sellingWojak ? WWOJAK : pairToken;
  const buyToken = sellingWojak ? pairToken : WWOJAK;

  const [amountIn, setAmountIn] = useState('');

  // ---- Settings ----
  const [slippageAuto, setSlippageAuto] = useState(true);
  const [slippagePct, setSlippagePct] = useState(
    (DEFAULT_SLIPPAGE_BPS / 100).toString(),
  );
  const [deadlineMin, setDeadlineMin] = useState('30');
  const [oneClick, setOneClick] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tradeOptOpen, setTradeOptOpen] = useState(false);
  const [refreshNonce, setRefreshNonce] = useState(0);

  const [price, setPrice] = useState<ZeroExQuote | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);

  const [phase, setPhase] = useState<Phase>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  // ---- USD prices (per token symbol), refreshed periodically ----
  const [usdPrices, setUsdPrices] = useState<Record<string, number> | null>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/wojakswap/prices');
        const data = await res.json();
        if (alive && res.ok && !data.error) setUsdPrices(data);
      } catch {
        /* ignore — USD display is best-effort */
      }
    };
    load();
    const i = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(i);
    };
  }, []);

  const slippageBps = useMemo(() => {
    if (slippageAuto) return DEFAULT_SLIPPAGE_BPS;
    const pct = parseFloat(slippagePct);
    if (!isFinite(pct) || pct <= 0) return DEFAULT_SLIPPAGE_BPS;
    return Math.round(pct * 100);
  }, [slippageAuto, slippagePct]);

  // Live liquidity sources for the current route (shown under Trade options).
  const routeSources = useMemo(() => {
    const fills = (price as any)?.route?.fills as
      | { source?: string }[]
      | undefined;
    if (!fills?.length) return null;
    return Array.from(new Set(fills.map((f) => f.source).filter(Boolean))).join(
      ' → ',
    );
  }, [price]);

  const sellAmountBase = useMemo(
    () => toBaseUnits(amountIn, sellToken.decimals),
    [amountIn, sellToken.decimals],
  );

  // ---- Balances ----
  const { data: ethBal, refetch: refetchEth } = useBalance({
    address,
    query: { enabled: !!address },
  });
  const { data: wojakBal, refetch: refetchWojak } = useReadContract({
    address: WWOJAK.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
  // Balance of the selected ERC-20 counter-token (skipped when it's native ETH).
  const { data: pairBal, refetch: refetchPair } = useReadContract({
    address: pairToken.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !pairToken.isNative },
  });

  const balanceOf = useCallback(
    (t: Token): bigint | undefined => {
      if (t.address === WWOJAK.address) return wojakBal as bigint | undefined;
      if (t.isNative) return ethBal?.value;
      return pairBal as bigint | undefined; // the active ERC-20 counter-token
    },
    [wojakBal, ethBal, pairBal],
  );

  const sellBalance = balanceOf(sellToken);
  const buyBalance = balanceOf(buyToken);

  // ---- Indicative price (debounced) ----
  const reqId = useRef(0);
  useEffect(() => {
    if (!sellAmountBase) {
      setPrice(null);
      setPriceError(null);
      return;
    }
    const id = ++reqId.current;
    setLoadingPrice(true);
    const t = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          sellToken: sellToken.address,
          buyToken: buyToken.address,
          sellAmount: sellAmountBase.toString(),
          slippageBps: slippageBps.toString(),
        });
        if (address) params.set('taker', address);
        const res = await fetch(`/api/wojakswap/price?${params.toString()}`);
        const data: ZeroExQuote = await res.json();
        if (id !== reqId.current) return; // stale
        if (!res.ok || data.error) {
          setPrice(null);
          setPriceError(data.error || 'Could not fetch price');
        } else if (data.liquidityAvailable === false) {
          setPrice(null);
          setPriceError('No liquidity available for this trade size');
        } else {
          setPrice(data);
          setPriceError(null);
        }
      } catch {
        if (id === reqId.current) setPriceError('Network error fetching price');
      } finally {
        if (id === reqId.current) setLoadingPrice(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [sellAmountBase, sellToken, buyToken, slippageBps, address, refreshNonce]);

  // Keep the displayed quote fresh: re-poll every 15s while an amount is set.
  useEffect(() => {
    if (!sellAmountBase) return;
    const i = setInterval(() => setRefreshNonce((n) => n + 1), 15000);
    return () => clearInterval(i);
  }, [sellAmountBase]);

  // Reset transient swap status when the user edits inputs / changes tokens.
  useEffect(() => {
    if (phase === 'success' || phase === 'error') {
      setPhase('idle');
      setMessage(null);
      setTxHash(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountIn, sellingWojak, pairToken]);

  const buyAmountDisplay = price?.buyAmount
    ? fromBaseUnits(price.buyAmount, buyToken.decimals)
    : '';

  // USD label for an amount of a token, e.g. "≈ $42.18". Null if unavailable.
  function usdLabel(amount: string, token: Token): string | null {
    const px = usdPrices?.[token.symbol];
    const qty = Number(amount);
    if (!px || !isFinite(qty) || qty <= 0) return null;
    const v = qty * px;
    const frac = v >= 1 ? 2 : v >= 0.01 ? 4 : 6;
    return `≈ $${v.toLocaleString('en-US', { maximumFractionDigits: frac })}`;
  }
  const payUsd = usdLabel(amountIn, sellToken);
  const receiveUsd = usdLabel(buyAmountDisplay, buyToken);

  const rate = useMemo(() => {
    if (!price?.buyAmount || !sellAmountBase) return null;
    const out = Number(fromBaseUnits(price.buyAmount, buyToken.decimals, 12));
    const inn = Number(fromBaseUnits(sellAmountBase, sellToken.decimals, 12));
    if (!inn) return null;
    return out / inn;
  }, [price, sellAmountBase, buyToken.decimals, sellToken.decimals]);

  function flip() {
    setSellingWojak((v) => !v);
    setAmountIn(buyAmountDisplay || '');
    setPrice(null);
    setPriceError(null);
  }

  function selectPair(t: Token) {
    setPairToken(t);
    setAmountIn('');
    setPrice(null);
    setPriceError(null);
  }

  function setMax() {
    if (sellBalance === undefined) return;
    let usable = sellBalance;
    if (sellToken.isNative) {
      const buffer = 200000000000000n; // ~0.0002 ETH for gas
      usable = sellBalance > buffer ? sellBalance - buffer : 0n;
    }
    setAmountIn(fromBaseUnits(usable, sellToken.decimals, sellToken.decimals));
  }

  async function fetchQuote(): Promise<ZeroExQuote> {
    const params = new URLSearchParams({
      sellToken: sellToken.address,
      buyToken: buyToken.address,
      sellAmount: sellAmountBase!.toString(),
      taker: address!,
      slippageBps: slippageBps.toString(),
    });
    const res = await fetch(`/api/wojakswap/quote?${params.toString()}`);
    const data: ZeroExQuote = await res.json();
    if (!res.ok) throw new Error(data.error || 'Quote request failed');
    return data;
  }

  const onSwap = useCallback(async () => {
    if (!authenticated) {
      login();
      return;
    }
    if (!address || !sellAmountBase || !publicClient) return;

    try {
      setTxHash(null);
      if (chainId !== BASE_CHAIN_ID) {
        setPhase('switching');
        setMessage('Switch your wallet to Base…');
        await switchChainAsync({ chainId: BASE_CHAIN_ID });
      }

      setPhase('quoting');
      setMessage('Fetching best route…');
      let quote = await fetchQuote();

      if (quote.liquidityAvailable === false) {
        throw new Error('No liquidity available for this trade.');
      }
      if (
        quote.issues?.balance &&
        BigInt(quote.issues.balance.actual) <
          BigInt(quote.issues.balance.expected)
      ) {
        throw new Error(`Insufficient ${sellToken.symbol} balance.`);
      }

      // ERC-20 allowance (only when selling a token, not native ETH).
      const allowance = quote.issues?.allowance;
      if (!sellToken.isNative && allowance) {
        setPhase('approving');
        setMessage(
          oneClick
            ? `One-time approval for ${sellToken.symbol} (enables 1-click swaps)…`
            : `Approve ${sellToken.symbol} for this swap…`,
        );
        // 1-click on → approve max once so future swaps skip the approval tx.
        const approveAmount = oneClick ? maxUint256 : sellAmountBase;
        const approveHash = await writeContractAsync({
          address: sellToken.address,
          abi: erc20Abi,
          functionName: 'approve',
          args: [allowance.spender, approveAmount],
        });
        setMessage('Waiting for approval to confirm…');
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
        quote = await fetchQuote(); // re-quote with fresh allowance
      }

      if (!quote.transaction) {
        throw new Error(quote.error || 'No executable transaction returned.');
      }

      setPhase('swapping');
      setMessage('Confirm the swap in your wallet…');
      const hash = await sendTransactionAsync({
        to: quote.transaction.to,
        data: quote.transaction.data,
        value: BigInt(quote.transaction.value ?? '0'),
      });
      setTxHash(hash);
      setMessage('Swap submitted, waiting for confirmation…');
      await publicClient.waitForTransactionReceipt({ hash });

      setPhase('success');
      setMessage('Swap confirmed 🎉');
      // NOTE: don't clear amountIn here — doing so triggers the input-reset
      // effect, which would wipe this success message and the tx link.
      // The result stays visible until the user's next edit.
      refetchEth();
      refetchWojak();
      refetchPair();
    } catch (err: any) {
      const raw = err?.shortMessage || err?.message || 'Swap failed';
      const friendly = /user rejected|denied|rejected the request/i.test(raw)
        ? 'Transaction rejected.'
        : raw;
      setPhase('error');
      setMessage(friendly);
    }
  }, [
    authenticated,
    login,
    address,
    sellAmountBase,
    publicClient,
    chainId,
    switchChainAsync,
    sellToken,
    buyToken,
    slippageBps,
    writeContractAsync,
    sendTransactionAsync,
    oneClick,
    refetchEth,
    refetchWojak,
    refetchPair,
  ]);

  // ---- Button state ----
  const busy =
    phase === 'switching' ||
    phase === 'quoting' ||
    phase === 'approving' ||
    phase === 'swapping';

  const insufficient =
    sellAmountBase !== null &&
    sellBalance !== undefined &&
    sellAmountBase > sellBalance;

  let actionLabel = 'Enter an amount';
  let actionDisabled = true;
  if (!ready) {
    actionLabel = 'Loading…';
  } else if (!authenticated) {
    actionLabel = 'Connect Wallet';
    actionDisabled = false;
  } else if (!sellAmountBase) {
    actionLabel = 'Enter an amount';
  } else if (insufficient) {
    actionLabel = `Insufficient ${sellToken.symbol}`;
  } else if (busy) {
    actionLabel =
      phase === 'switching'
        ? 'Switching network…'
        : phase === 'approving'
          ? 'Approving…'
          : phase === 'swapping'
            ? 'Swapping…'
            : 'Finding route…';
  } else if (priceError) {
    actionLabel = 'No route';
  } else {
    actionLabel = `Swap ${sellToken.symbol} → ${buyToken.symbol}`;
    actionDisabled = false;
  }

  // wWojak side is fixed; the counter-token side gets the picker.
  const sellIsWojak = sellToken.address === WWOJAK.address;

  return (
    <div className="card">
      <div className="card-head">
        <h2>Swap</h2>
        <button
          type="button"
          className={`gear-btn ${settingsOpen ? 'on' : ''}`}
          onClick={() => setSettingsOpen((v) => !v)}
          aria-label="Swap settings"
          title="Settings"
        >
          ⚙
        </button>
      </div>

      {settingsOpen && (
        <div className="settings-panel">
          {/* Max slippage */}
          <div className="set-row">
            <div className="set-label">Max slippage</div>
            <div className="slip-control">
              <button
                type="button"
                className={`auto-pill ${slippageAuto ? 'on' : ''}`}
                onClick={() => setSlippageAuto(true)}
              >
                Auto
              </button>
              <div className={`slip-custom ${!slippageAuto ? 'on' : ''}`}>
                <input
                  className="slip-input"
                  inputMode="decimal"
                  value={
                    slippageAuto
                      ? (DEFAULT_SLIPPAGE_BPS / 100).toString()
                      : slippagePct
                  }
                  onFocus={() => setSlippageAuto(false)}
                  onChange={(e) => {
                    setSlippageAuto(false);
                    const v = e.target.value;
                    if (v === '' || /^\d*\.?\d*$/.test(v)) setSlippagePct(v);
                  }}
                />
                <span>%</span>
              </div>
            </div>
          </div>

          {/* Swap deadline */}
          <div className="set-row">
            <div className="set-label">Swap deadline</div>
            <div className="deadline-control">
              <input
                className="deadline-input"
                inputMode="numeric"
                value={deadlineMin}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === '' || /^\d+$/.test(v)) setDeadlineMin(v);
                }}
              />
              <span>minutes</span>
            </div>
          </div>

          {/* Trade options */}
          <button
            type="button"
            className="set-row expandable"
            onClick={() => setTradeOptOpen((v) => !v)}
          >
            <div className="set-label">Trade options</div>
            <div className="set-value">
              {routeSources ? 'Custom route' : 'Default'}{' '}
              <span className={`caret ${tradeOptOpen ? 'open' : ''}`}>›</span>
            </div>
          </button>
          {tradeOptOpen && (
            <div className="trade-opts">
              <div className="to-line">
                <span>Routing</span>
                <span>0x aggregator · best execution</span>
              </div>
              <div className="to-line">
                <span>Current route</span>
                <span>{routeSources || '—'}</span>
              </div>
            </div>
          )}

          {/* 1-click swaps */}
          <div className="set-row">
            <div className="set-label">
              1-click swaps
              <div className="set-hint">
                Approve a token once, then swap it in a single click
              </div>
            </div>
            <Toggle on={oneClick} onChange={setOneClick} />
          </div>
        </div>
      )}

      {/* Sell field */}
      <div className="field">
        <div className="field-label">You pay</div>
        <div className="field-row">
          <input
            className="amount-input"
            placeholder="0"
            value={amountIn}
            inputMode="decimal"
            onChange={(e) => {
              const v = e.target.value;
              if (v === '' || /^\d*\.?\d*$/.test(v)) setAmountIn(v);
            }}
          />
          {sellIsWojak ? (
            <TokenBadge token={sellToken} />
          ) : (
            <TokenSelect token={sellToken} onSelect={selectPair} />
          )}
        </div>
        <div className="usd-value">{payUsd || ' '}</div>
        <div className="balance-row">
          <span>
            {sellBalance !== undefined
              ? `Balance: ${fromBaseUnits(sellBalance, sellToken.decimals, 5)}`
              : ' '}
          </span>
          {sellBalance !== undefined && sellBalance > 0n && (
            <button className="max-btn" onClick={setMax}>
              MAX
            </button>
          )}
        </div>
      </div>

      <div className="flip-wrap">
        <button className="flip-btn" onClick={flip} title="Flip direction">
          ↓
        </button>
      </div>

      {/* Buy field */}
      <div className="field">
        <div className="field-label">You receive</div>
        <div className="field-row">
          <input
            className="amount-input"
            placeholder="0"
            value={loadingPrice && !buyAmountDisplay ? '…' : buyAmountDisplay}
            disabled
          />
          {sellIsWojak ? (
            <TokenSelect token={buyToken} onSelect={selectPair} />
          ) : (
            <TokenBadge token={buyToken} />
          )}
        </div>
        <div className="usd-value">{receiveUsd || ' '}</div>
        <div className="balance-row">
          <span>
            {buyBalance !== undefined
              ? `Balance: ${fromBaseUnits(buyBalance, buyToken.decimals, 5)}`
              : ' '}
          </span>
        </div>
      </div>

      {/* Quote details */}
      {price && rate && (
        <div className="quote-info">
          <div className="quote-line">
            <span>Rate</span>
            <span>
              1 {sellToken.symbol} ={' '}
              {rate.toLocaleString('en-US', { maximumFractionDigits: 6 })}{' '}
              {buyToken.symbol}
            </span>
          </div>
          {price.minBuyAmount && (
            <div className="quote-line">
              <span>Min received ({slippagePct}% slip)</span>
              <span>
                {fromBaseUnits(price.minBuyAmount, buyToken.decimals, 6)}{' '}
                {buyToken.symbol}
              </span>
            </div>
          )}
          {(price as any).fees?.integratorFee?.amount && (
            <div className="quote-line">
              <span>Service fee ({SWAP_FEE_BPS / 100}%)</span>
              <span>
                {fromBaseUnits(
                  (price as any).fees.integratorFee.amount,
                  pairToken.decimals,
                  8,
                )}{' '}
                {pairToken.symbol}
              </span>
            </div>
          )}
          {price.totalNetworkFee && (
            <div className="quote-line">
              <span>Est. network fee</span>
              <span>{fromBaseUnits(price.totalNetworkFee, 18, 6)} ETH</span>
            </div>
          )}
        </div>
      )}

      {priceError && !busy && <div className="status error">{priceError}</div>}

      <button
        className="btn btn-accent action"
        onClick={onSwap}
        disabled={actionDisabled}
      >
        {busy && <span className="spinner" />}
        {actionLabel}
      </button>

      {message && (
        <div
          className={`status ${
            phase === 'success' ? 'success' : phase === 'error' ? 'error' : ''
          }`}
        >
          {message}
          {txHash && (
            <>
              {' '}
              <a
                href={`${BASESCAN_URL}/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Basescan ↗
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
