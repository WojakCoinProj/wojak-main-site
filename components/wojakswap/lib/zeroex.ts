import { ZEROX_BASE_URL } from './constants';

export type ZeroExEndpoint = 'price' | 'quote';

/**
 * Server-side call into the 0x Swap API v2 (allowance-holder flow).
 * The API key is read here and never reaches the browser.
 */
export async function callZeroEx(
  endpoint: ZeroExEndpoint,
  params: URLSearchParams,
  apiKey: string,
): Promise<{ status: number; data: any }> {
  const url = `${ZEROX_BASE_URL}/swap/allowance-holder/${endpoint}?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      '0x-api-key': apiKey,
      '0x-version': 'v2',
    },
    cache: 'no-store',
  });
  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    data = { error: text || 'Unexpected response from 0x' };
  }
  return { status: res.status, data };
}

// Shape of the bits of the 0x response the client cares about.
export interface ZeroExQuote {
  liquidityAvailable: boolean;
  buyAmount: string;
  sellAmount: string;
  minBuyAmount?: string;
  totalNetworkFee?: string;
  issues?: {
    allowance?: { actual: string; spender: `0x${string}` } | null;
    balance?: { token: string; actual: string; expected: string } | null;
  };
  transaction?: {
    to: `0x${string}`;
    data: `0x${string}`;
    value: string;
    gas?: string;
    gasPrice?: string;
  };
  error?: string;
}
