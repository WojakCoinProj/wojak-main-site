import { formatUnits, parseUnits } from 'viem';

/** Parse a human string into base units; returns null if invalid or non-positive. */
export function toBaseUnits(amount: string, decimals: number): bigint | null {
  if (!amount) return null;
  const trimmed = amount.trim();
  if (!/^\d*\.?\d*$/.test(trimmed) || trimmed === '.' || trimmed === '') return null;
  try {
    const v = parseUnits(trimmed as `${number}`, decimals);
    return v > 0n ? v : null;
  } catch {
    return null;
  }
}

/** Format base units to a trimmed, human-readable string. */
export function fromBaseUnits(
  value: bigint | string | undefined,
  decimals: number,
  maxFrac = 6,
): string {
  if (value === undefined) return '0';
  const v = typeof value === 'string' ? BigInt(value) : value;
  const full = formatUnits(v, decimals);
  const [int, frac = ''] = full.split('.');
  if (!frac) return int;
  const cut = frac.slice(0, maxFrac).replace(/0+$/, '');
  return cut ? `${int}.${cut}` : int;
}

/** Compact USD-ish display. */
export function formatNumber(n: number, maxFrac = 4): string {
  if (!isFinite(n)) return '0';
  return n.toLocaleString('en-US', { maximumFractionDigits: maxFrac });
}

export function shortAddress(addr?: string): string {
  if (!addr) return '';
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
