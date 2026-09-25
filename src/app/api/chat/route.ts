import { NextResponse } from "next/server";
import { chatLimits } from "@/config/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fallbackReply } from "@/lib/chat/fallback";
import { buildSystemPrompt } from "@/lib/chat/knowledge";
import { findPolicyViolation, parseMarkers } from "@/lib/chat/postprocess";
import { complete, getProviderConfig } from "@/lib/chat/providers";
import type { ChatMessage, ChatReply } from "@/lib/chat/types";
import { createRateLimiter } from "@/lib/rate-limit";
import { getClientIp, isSameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const perMinute = createRateLimiter({ limit: 12, windowMs: 60 * 1000 });
const perHour = createRateLimiter({ limit: 80, windowMs: 60 * 60 * 1000 });
const MAX_BODY = 32 * 1024;

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 40) return null;
  const out: ChatMessage[] = [];
  for (const m of input) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim();
    if (!text) continue;
    if (role === "user" && text.length > chatLimits.maxMessageChars) return null;
    out.push({ role, content: text.slice(0, 2000) });
  }
  const recent = out.slice(-chatLimits.maxHistory);
  while (recent.length && recent[0].role !== "user") recent.shift();
  if (!recent.length || recent[recent.length - 1].role !== "user") return null;
  return recent;
}

export async function POST(req: Request) {
  if (!isSameOrigin(req.headers)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) return NextResponse.json({ error: "too_large" }, { status: 413 });

  const ip = getClientIp(req.headers);
  const a = perMinute.check(ip);
  const b = perHour.check(ip);
  if (!a.ok || !b.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(Math.max(a.retryAfterSeconds, b.retryAfterSeconds)) } },
    );
  }

  let body: { locale?: unknown; messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const locale: Locale = isLocale(body.locale) ? body.locale : "ro";
  const messages = sanitizeMessages(body.messages);
  if (!messages) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const userTurns = messages.filter((m) => m.role === "user").length;
  const lastUser = messages[messages.length - 1].content;

  if (userTurns > chatLimits.maxUserTurns) {
    const reply: ChatReply = {
      reply: getDictionary(locale).chat.limitReached,
      actions: [{ type: "booking" }, { type: "contact" }],
      mode: "fallback",
      limitReached: true,
    };
    return NextResponse.json(reply);
  }

  const cfg = getProviderConfig();
  if (cfg) {
    try {
      const raw = await complete(cfg, buildSystemPrompt(locale), messages);
      const parsed = parseMarkers(raw);
      if (parsed.text && !findPolicyViolation(parsed.text)) {
        const reply: ChatReply = { reply: parsed.text, serviceId: parsed.serviceId, actions: parsed.actions, mode: "ai" };
        return NextResponse.json(reply);
      }
      if (parsed.text) console.warn("[chat] Răspuns AI respins de filtrul de siguranță; se folosește modul fără AI.");
    } catch (err) {
      console.error("[chat] Furnizorul AI nu a răspuns:", err instanceof Error ? err.message : "unknown");
    }
  }

  return NextResponse.json(fallbackReply(locale, lastUser));
}
