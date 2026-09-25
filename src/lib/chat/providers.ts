/**
 * Furnizori AI — apelați DOAR pe server, cheia rămâne în variabilele de mediu.
 * AI_PROVIDER=openai    → API compatibil OpenAI (OpenAI sau alt furnizor prin AI_BASE_URL)
 * AI_PROVIDER=anthropic → Anthropic Messages API
 * Fără AI_PROVIDER / AI_API_KEY / AI_MODEL → asistentul funcționează în modul fără AI.
 */
import type { ChatMessage } from "./types";

export type ProviderName = "openai" | "anthropic";

export interface ProviderConfig {
  provider: ProviderName;
  apiKey: string;
  model: string;
  baseUrl: string | null;
}

export function getProviderConfig(): ProviderConfig | null {
  const provider = process.env.AI_PROVIDER?.trim().toLowerCase();
  const apiKey = process.env.AI_API_KEY?.trim();
  const model = process.env.AI_MODEL?.trim();
  if ((provider !== "openai" && provider !== "anthropic") || !apiKey || !model) return null;
  return { provider, apiKey, model, baseUrl: process.env.AI_BASE_URL?.trim().replace(/\/+$/, "") || null };
}

const TIMEOUT_MS = 20_000;
const MAX_TOKENS = 450;

async function callOpenAI(cfg: ProviderConfig, system: string, messages: ChatMessage[]): Promise<string> {
  const custom = Boolean(cfg.baseUrl);
  const res = await fetch(`${cfg.baseUrl ?? "https://api.openai.com/v1"}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({
      model: cfg.model,
      messages: [{ role: "system", content: system }, ...messages],
      // Furnizorii compatibili acceptă de regulă `max_tokens`; OpenAI folosește `max_completion_tokens`.
      ...(custom ? { max_tokens: MAX_TOKENS, temperature: 0.3 } : { max_completion_tokens: MAX_TOKENS }),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`AI provider error ${res.status}`);
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error("AI provider returned an empty reply");
  return text;
}

async function callAnthropic(cfg: ProviderConfig, system: string, messages: ChatMessage[]): Promise<string> {
  const res = await fetch(`${cfg.baseUrl ?? "https://api.anthropic.com"}/v1/messages`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": cfg.apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model: cfg.model, max_tokens: MAX_TOKENS, temperature: 0.3, system, messages }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`AI provider error ${res.status}`);
  const json = (await res.json()) as { content?: { type: string; text?: string }[] };
  const text = json.content?.filter((b) => b.type === "text").map((b) => b.text ?? "").join("");
  if (!text) throw new Error("AI provider returned an empty reply");
  return text;
}

export function complete(cfg: ProviderConfig, system: string, messages: ChatMessage[]): Promise<string> {
  return cfg.provider === "anthropic" ? callAnthropic(cfg, system, messages) : callOpenAI(cfg, system, messages);
}
