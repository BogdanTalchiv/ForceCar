import { business } from "@/config/business";
import { isServiceId } from "@/config/services";
import type { ChatAction } from "./types";

/** Extrage marcajele [[service:id]] / [[booking]] din răspunsul AI. */
export function parseMarkers(raw: string): { text: string; serviceId?: string; actions: ChatAction[] } {
  let serviceId: string | undefined;
  let booking = false;
  const text = raw
    .replace(/\[\[\s*service\s*:\s*([a-z-]+)\s*\]\]/gi, (_, id: string) => {
      if (!serviceId && isServiceId(id)) serviceId = id;
      return "";
    })
    .replace(/\[\[\s*booking\s*\]\]/gi, () => {
      booking = true;
      return "";
    })
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 1500);

  const actions: ChatAction[] = [];
  if (booking || serviceId) actions.push({ type: "booking", serviceId });
  return { text, serviceId, actions };
}

const PRICE_RE = /(\d[\d\s.,]*\s?(lei|leu|mdl|eur\b|euro\b|€|usd|\$|руб|лей|евро|доллар))|((€|\$)\s?\d)/i;
const PHONE_RE = /(?:\+|(?<![\d.,])0)\d[\d\s().-]{6,}\d(?!\s?(km|км|mi|mm|ml))/gi;

/** Plasă de siguranță: un răspuns AI cu prețuri sau numere de telefon neconfigurate este respins. */
export function findPolicyViolation(text: string): "price" | "phone" | null {
  if (PRICE_RE.test(text)) return "price";
  const allowed = [business.phone, ...business.additionalPhones, business.whatsapp, business.viber]
    .filter((p): p is string => Boolean(p))
    .map((p) => p.replace(/\D/g, ""));
  for (const n of text.match(PHONE_RE) ?? []) {
    const digits = n.replace(/\D/g, "");
    if (digits.length >= 8 && digits.length <= 15 && !allowed.some((a) => a.endsWith(digits.slice(-8)))) return "phone";
  }
  return null;
}
