import { NATIVE_TOKEN_ADDRESS } from './constants';

export interface Token {
  symbol: string;
  name: string;
  /** ERC-20 address, or the native sentinel for ETH. */
  address: `0x${string}`;
  decimals: number;
  isNative: boolean;
  /** Logo image path under /public. */
  logo: string;
  /** Fallback accent color (used if the logo fails to load). */
  color: string;
}

// The token this app is built around — always one side of every swap.
export const WWOJAK: Token = {
  symbol: 'wWojak',
  name: 'Wrapped Wojakcoin',
  address: '0x867340cFC92a771cd3cFFCfF056a84490cAde7C0',
  decimals: 8,
  isNative: false,
  logo: '/tokens/wwojak.png',
  color: '#9aa3af',
};

export const ETH: Token = {
  symbol: 'ETH',
  name: 'Ether',
  address: NATIVE_TOKEN_ADDRESS,
  decimals: 18,
  isNative: true,
  logo: '/tokens/eth.png',
  color: '#5b76f7',
};

export const WETH: Token = {
  symbol: 'WETH',
  name: 'Wrapped Ether',
  address: '0x4200000000000000000000000000000000000006',
  decimals: 18,
  isNative: false,
  logo: '/tokens/weth.png',
  color: '#8a93b8',
};

export const USDC: Token = {
  symbol: 'USDC',
  name: 'USD Coin',
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  decimals: 6,
  isNative: false,
  logo: '/tokens/usdc.png',
  color: '#2775ca',
};

export const USDT: Token = {
  symbol: 'USDT',
  name: 'Tether USD',
  address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
  decimals: 6,
  isNative: false,
  logo: '/tokens/usdt.png',
  color: '#26a17b',
};

export const DAI: Token = {
  symbol: 'DAI',
  name: 'Dai Stablecoin',
  address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
  decimals: 18,
  isNative: false,
  logo: '/tokens/dai.png',
  color: '#f5ac37',
};

export const CBBTC: Token = {
  symbol: 'cbBTC',
  name: 'Coinbase Wrapped BTC',
  address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
  decimals: 8,
  isNative: false,
  logo: '/tokens/cbbtc.webp',
  color: '#f7931a',
};

/** Selectable counter-tokens, in display order. */
export const PAIR_TOKENS: Token[] = [ETH, WETH, USDC, USDT, DAI, CBBTC];
