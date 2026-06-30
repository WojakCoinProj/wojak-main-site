// Base mainnet
export const BASE_CHAIN_ID = 8453;

// 0x's canonical sentinel address for the chain's native asset (ETH on Base).
export const NATIVE_TOKEN_ADDRESS =
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as const;

// 0x Swap API v2
export const ZEROX_BASE_URL = 'https://api.0x.org';

// Default slippage tolerance (100 bps = 1%).
export const DEFAULT_SLIPPAGE_BPS = 100;

// Affiliate / service fee taken on every swap, collected in the buyToken.
// 3 bps = 0.03%.
export const SWAP_FEE_BPS = 3;
export const SWAP_FEE_RECIPIENT =
  '0x82d764AE78F8263741a9C285F828ec6416075978' as `0x${string}`;

export const BASESCAN_URL = 'https://basescan.org';
