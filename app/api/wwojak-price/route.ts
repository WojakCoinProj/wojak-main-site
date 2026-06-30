import { NextResponse } from 'next/server';

// Live $wWojakcoin (Base) price proxy.
//
// GeckoTerminal has the data but sends no CORS header, so the bridge price card
// can't fetch it directly from the browser. Dexscreener's API currently returns
// no pairs for this token (the main pool is a Uniswap V4 pool, whose bytes32
// pool id Dexscreener's API no longer serves). This server route fetches the
// price server-side: GeckoTerminal first, Dexscreener as a fallback.

const TOKEN = '0x867340cfc92a771cd3cffcff056a84490cade7c0';
// Uniswap V4 "wWojakcoin / ETH 1%" pool — the main wWojakcoin/ETH pool on Base.
const GT_POOL = '0xac8a7e57cffe5d5c89c4161d6551b36df9a0ca5710c79387f6c0ba3e2d422b3f';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PricePayload = {
  priceUsd: number | null;
  change24h: number | null;
  source: string | null;
};

async function fromGeckoTerminal(): Promise<PricePayload | null> {
  try {
    const res = await fetch(
      `https://api.geckoterminal.com/api/v2/networks/base/pools/${GT_POOL}`,
      { headers: { accept: 'application/json' }, cache: 'no-store' },
    );
    if (!res.ok) return null;
    const json = await res.json();
    const a = json?.data?.attributes;
    const price = a?.base_token_price_usd != null ? Number(a.base_token_price_usd) : NaN;
    if (!Number.isFinite(price)) return null;
    const ch = a?.price_change_percentage?.h24;
    return {
      priceUsd: price,
      change24h: ch != null && Number.isFinite(Number(ch)) ? Number(ch) : null,
      source: 'GeckoTerminal',
    };
  } catch {
    return null;
  }
}

async function fromDexscreener(): Promise<PricePayload | null> {
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    const pairs: any[] = Array.isArray(json?.pairs) ? json.pairs : [];
    const best = pairs
      .filter((p) => p?.priceUsd)
      .sort((a, b) => (b?.liquidity?.usd ?? 0) - (a?.liquidity?.usd ?? 0))[0];
    const price = best?.priceUsd != null ? Number(best.priceUsd) : NaN;
    if (!Number.isFinite(price)) return null;
    const ch = best?.priceChange?.h24;
    return {
      priceUsd: price,
      change24h: ch != null && Number.isFinite(Number(ch)) ? Number(ch) : null,
      source: 'Dexscreener',
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const payload: PricePayload =
    (await fromGeckoTerminal()) ??
    (await fromDexscreener()) ?? { priceUsd: null, change24h: null, source: null };

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'public, max-age=30, s-maxage=30' },
  });
}
