import { afterEach, describe, expect, it, vi } from "vitest";
import { sanitizeUtmValue } from "@/lib/analytics/utm";
import { createRateLimiter } from "@/lib/rate-limit";
import { escapeHtml, getClientIp, isSameOrigin, singleLine } from "@/lib/security";

describe("escapeHtml / singleLine", () => {
  it("escapează HTML", () => {
    expect(escapeHtml(`<img src=x onerror="alert('x')">&`)).toBe("&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;&amp;");
  });
  it("elimină CR/LF (injecție în antete)", () => {
    expect(singleLine("Subiect\r\nBcc: a@b.c")).toBe("Subiect Bcc: a@b.c");
    expect(singleLine("x".repeat(300), 10)).toHaveLength(10);
  });
  it("curăță valorile UTM", () => {
    expect(sanitizeUtmValue(" google<script>\n ")).toBe("googlescript");
    expect(sanitizeUtmValue("a".repeat(500))).toHaveLength(150);
  });
});

describe("isSameOrigin", () => {
  it("acceptă aceeași origine sau lipsa antetului Origin", () => {
    expect(isSameOrigin(new Headers({ origin: "https://forcecar.md", host: "forcecar.md" }))).toBe(true);
    expect(isSameOrigin(new Headers({ host: "forcecar.md" }))).toBe(true);
  });
  it("respinge alte origini", () => {
    expect(isSameOrigin(new Headers({ origin: "https://evil.example", host: "forcecar.md" }))).toBe(false);
    expect(isSameOrigin(new Headers({ origin: "null", host: "forcecar.md" }))).toBe(false);
  });
  it("citește IP-ul clientului", () => {
    expect(getClientIp(new Headers({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" }))).toBe("1.2.3.4");
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});

describe("createRateLimiter", () => {
  afterEach(() => vi.useRealTimers());

  it("blochează după limită și se resetează după fereastră", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-25T10:00:00Z"));
    const rl = createRateLimiter({ limit: 2, windowMs: 60_000 });
    expect(rl.check("ip").ok).toBe(true);
    expect(rl.check("ip").ok).toBe(true);
    const blocked = rl.check("ip");
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(60);
    expect(rl.check("other").ok).toBe(true);
    vi.advanceTimersByTime(60_001);
    expect(rl.check("ip").ok).toBe(true);
  });
});
