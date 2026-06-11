// Dependency-free rate limiting backed by the Upstash Redis REST API.
// If UPSTASH_REDIS_REST_URL / _TOKEN are not set, every check passes (graceful
// no-op) so the app keeps working until Upstash is configured in Vercel.
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export function isRateLimitConfigured() {
  return Boolean(UPSTASH_URL && UPSTASH_TOKEN);
}

/** Returns true if ALLOWED, false if the limit was exceeded. Fails open on error. */
export async function checkRateLimit(key: string, limit: number, windowSec: number): Promise<boolean> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return true;
  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", `rl:${key}`],
        ["EXPIRE", `rl:${key}`, windowSec, "NX"],
      ]),
      cache: "no-store",
    });
    if (!res.ok) return true;
    const data = (await res.json()) as Array<{ result?: number }>;
    const count = Number(data?.[0]?.result ?? 0);
    return count <= limit;
  } catch {
    return true;
  }
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
