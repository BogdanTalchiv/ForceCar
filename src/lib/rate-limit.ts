/**
 * Limitare simplă în memorie (fereastră fixă per cheie).
 * Pe hosting serverless contorul este per instanță — pentru trafic mare înlocuiește
 * implementarea cu un store partajat (ex. Upstash Redis) păstrând aceeași interfață.
 */
export interface RateLimiter {
  check(key: string): { ok: boolean; retryAfterSeconds: number };
}

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();
  let lastSweep = Date.now();

  return {
    check(key) {
      const now = Date.now();
      if (now - lastSweep > windowMs) {
        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
        lastSweep = now;
      }
      const entry = hits.get(key);
      if (!entry || entry.resetAt <= now) {
        hits.set(key, { count: 1, resetAt: now + windowMs });
        return { ok: true, retryAfterSeconds: 0 };
      }
      entry.count += 1;
      if (entry.count > limit) {
        return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
      }
      return { ok: true, retryAfterSeconds: 0 };
    },
  };
}
