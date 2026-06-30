'use client';

import { useEffect, useState } from 'react';
import { Providers } from './providers';
import { SwapCard } from './SwapCard';
import { ConnectButton } from './ConnectButton';

function Brand() {
  return (
    <div className="brand">
      <img className="brand-logo" src="/wojak-logo.png" alt="WojakSwap" />
      WojakSwap
    </div>
  );
}

function FooterNote() {
  return (
    <p className="footer-note">
      Swaps route through the 0x Swap API across Uniswap liquidity on Base.
      <br />
      Wallets by Privy · wWojak ⇄ ETH · USDC · USDT · DAI · WETH · cbBTC · Base
      (8453)
    </p>
  );
}

/**
 * Client-only entry for the WojakSwap tab. The Privy/wagmi stack is heavy and
 * not SSR-friendly, so a single Providers tree (shared by the connect button
 * and the swap card) is gated behind a mount check — nothing web3 runs during
 * server rendering; it hydrates on the client.
 */
export function WojakSwapClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="wjk-swap">
        <div className="page">
          <div className="topbar">
            <Brand />
          </div>
          <div className="card" style={{ minHeight: 280 }} />
          <FooterNote />
        </div>
      </div>
    );
  }

  return (
    <div className="wjk-swap">
      <Providers>
        <div className="page">
          <div className="topbar">
            <Brand />
            <ConnectButton />
          </div>
          <SwapCard />
          <FooterNote />
        </div>
      </Providers>
    </div>
  );
}
