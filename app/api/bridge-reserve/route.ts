import { NextResponse } from 'next/server';

// Proof-of-reserve proxy for the WJK <-> wWojakcoin bridge.
//
// The bridge publishes a public reserve endpoint that reconciles the native WJK
// locked in custody against the wWojakcoin (wWJK) minted on Base. It sends no
// CORS header, so the bridge tab can't read it directly from the browser — this
// server route fetches it, trims the heavy event arrays, and computes the peg.

const RESERVE_API = 'https://wojakcoin-bridge.dedoo.xyz/api/reserve';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ReservePayload = {
  ok: boolean;
  wrappedSupply: number | null; // wWJK minted on Base
  nativeLocked: number | null; // native WJK locked in custody
  delta: number | null; // nativeLocked - wrappedSupply (surplus if positive)
  backedPct: number | null; // nativeLocked / wrappedSupply * 100
  status: string | null; // "surplus" | "deficit" | ...
  custodyAddress: string | null;
  feeBps: number | null;
  utxoCount: number | null;
  chainId: number | null;
};

const EMPTY: ReservePayload = {
  ok: false,
  wrappedSupply: null,
  nativeLocked: null,
  delta: null,
  backedPct: null,
  status: null,
  custodyAddress: null,
  feeBps: null,
  utxoCount: null,
  chainId: null,
};

const num = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export async function GET() {
  try {
    const res = await fetch(RESERVE_API, { cache: 'no-store' });
    if (!res.ok) throw new Error(`reserve ${res.status}`);
    const d = await res.json();

    const wrappedSupply = num(d?.wjkcTotalSupplyJkc);
    const nativeLocked = num(d?.jkcReserveJkc);
    const valid = wrappedSupply != null && nativeLocked != null;
    const backedPct =
      valid && (wrappedSupply as number) > 0
        ? ((nativeLocked as number) / (wrappedSupply as number)) * 100
        : null;

    const payload: ReservePayload = {
      ok: Boolean(d?.ok) && valid,
      wrappedSupply,
      nativeLocked,
      delta: num(d?.deltaJkc),
      backedPct,
      status: typeof d?.reserveStatus === 'string' ? d.reserveStatus : null,
      custodyAddress: typeof d?.custodyAddress === 'string' ? d.custodyAddress : null,
      feeBps: num(d?.feeBps),
      utxoCount: num(d?.utxos?.count),
      chainId: num(d?.chainId),
    };

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' },
    });
  } catch {
    return NextResponse.json(EMPTY, {
      headers: { 'Cache-Control': 'public, max-age=30, s-maxage=30' },
    });
  }
}
