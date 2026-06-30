import { NextRequest, NextResponse } from 'next/server';
import {
  BASE_CHAIN_ID,
  SWAP_FEE_BPS,
  SWAP_FEE_RECIPIENT,
} from '@/components/wojakswap/lib/constants';
import { callZeroEx } from '@/components/wojakswap/lib/zeroex';
import { WWOJAK } from '@/components/wojakswap/lib/tokens';
import { rateLimited } from '@/components/wojakswap/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Indicative price (no executable transaction). Used to populate the UI as the
// user types.
export async function GET(req: NextRequest) {
  if (rateLimited(req)) {
    return NextResponse.json({ error: 'Too many requests — slow down.' }, { status: 429 });
  }
  const apiKey = process.env.ZEROX_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is missing ZEROX_API_KEY. Add it to .env.local.' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const sellToken = searchParams.get('sellToken');
  const buyToken = searchParams.get('buyToken');
  const sellAmount = searchParams.get('sellAmount');

  if (!sellToken || !buyToken || !sellAmount) {
    return NextResponse.json({ error: 'Missing required params' }, { status: 400 });
  }

  // Fee in the counter currency (non-wWojak side) so the indicative price the
  // user sees matches how the fee is actually charged on execution.
  const feeToken =
    buyToken.toLowerCase() === WWOJAK.address.toLowerCase()
      ? sellToken
      : buyToken;

  const params = new URLSearchParams({
    chainId: String(BASE_CHAIN_ID),
    sellToken,
    buyToken,
    sellAmount,
    swapFeeRecipient: SWAP_FEE_RECIPIENT,
    swapFeeBps: String(SWAP_FEE_BPS),
    swapFeeToken: feeToken,
  });
  const taker = searchParams.get('taker');
  if (taker) params.set('taker', taker);
  const slippageBps = searchParams.get('slippageBps');
  if (slippageBps) params.set('slippageBps', slippageBps);

  const { status, data } = await callZeroEx('price', params, apiKey);
  return NextResponse.json(data, { status });
}
