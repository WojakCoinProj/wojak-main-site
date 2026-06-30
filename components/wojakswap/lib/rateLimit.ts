// Lightweight in-memory, per-IP sliding-window rate limiter shared across the
// WojakSwap proxy routes. Per-process (fine for the single Next instance) and
// not durable across restarts — acceptable; its only job is to stop a single
// client from hammering the upstream 0x key.
const WINDOW_MS = 10_000;
const MAX_REQUESTS = 60; // per IP per window, across price/quote/prices combined

const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

/** Returns true if this request should be rejected (over the limit). */
export function rateLimited(req: Request): boolean {
  const ip = clientIp(req);
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_REQUESTS;
}
