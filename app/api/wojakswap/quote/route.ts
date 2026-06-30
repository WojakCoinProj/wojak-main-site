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

// Firm quote with an executable transaction. Requires `taker` (the connected
// wallet) so 0x can build calldata and report any allowance/balance issues.
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
  const taker = searchParams.get('taker');

  if (!sellToken || !buyToken || !sellAmount || !taker) {
    return NextResponse.json(
      { error: 'Missing required params (sellToken, buyToken, sellAmount, taker)' },
      { status: 400 },
    );
  }

  // Collect the service fee in the counter currency (the non-wWojak side):
  // ETH/USDC/etc. — when buying it's the token paid in, when selling it's the
  // token received. Never charge the fee in wWojak.
  const feeToken =
    buyToken.toLowerCase() === WWOJAK.address.toLowerCase()
      ? sellToken
      : buyToken;

  const params = new URLSearchParams({
    chainId: String(BASE_CHAIN_ID),
    sellToken,
    buyToken,
    sellAmount,
    taker,
    swapFeeRecipient: SWAP_FEE_RECIPIENT,
    swapFeeBps: String(SWAP_FEE_BPS),
    swapFeeToken: feeToken,
  });
  const slippageBps = searchParams.get('slippageBps');
  if (slippageBps) params.set('slippageBps', slippageBps);

  const { status, data } = await callZeroEx('quote', params, apiKey);
  return NextResponse.json(data, { status });
}
