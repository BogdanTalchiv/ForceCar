/**
 * Răspunsuri fără AI: clasificare pe cuvinte-cheie + texte aprobate din dicționar.
 * Folosit când nu există cheie API sau când furnizorul AI nu răspunde.
 * Nu inventează nimic: fiecare frază vine din dicționar sau din config.
 */
import { enabledServices, type ServiceId } from "@/config/services";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { emailLink, openingHoursText, phoneLink, streetAddressLine } from "@/lib/business-info";
import { serviceNamesList } from "@/lib/faq";
import { fmt } from "@/lib/format";
import { intentKeywords, normalize, safetyKeywords, serviceKeywords, type Intent } from "./keywords";
import type { ChatAction, ChatReply } from "./types";

const prepKeyword = (k: string) => k.toLowerCase().replace(/ё/g, "е").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const has = (text: string, keywords: string[]) => keywords.some((k) => text.includes(prepKeyword(k)));

export function detectService(text: string): ServiceId | undefined {
  const n = normalize(text);
  let best: { id: ServiceId; score: number } | undefined;
  for (const [id, keywords] of serviceKeywords) {
    if (!enabledServices.some((s) => s.id === id)) continue;
    // Expresiile mai lungi sunt mai specifice („check engine” > „engine”, „schimb ulei” > „ulei”).
    const score = keywords.filter((k) => n.includes(prepKeyword(k))).reduce((sum, k) => sum + k.trim().length, 0);
    if (score > 0 && (!best || score > best.score)) best = { id, score };
  }
  return best?.id;
}

export function detectIntents(text: string): Intent[] {
  const n = normalize(text);
  return (Object.keys(intentKeywords) as Intent[]).filter((i) => has(n, intentKeywords[i]));
}

export function needsSafetyWarning(text: string): boolean {
  return has(normalize(text), safetyKeywords);
}

function uniqueActions(actions: ChatAction[]): ChatAction[] {
  const seen = new Set<string>();
  return actions.filter((a) => {
    const key = a.type;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function fallbackReply(locale: Locale, lastUserMessage: string): ChatReply {
  const dict = getDictionary(locale);
  const t = dict.chatFallback;
  const phone = phoneLink();
  const email = emailLink();
  const address = streetAddressLine();
  const hours = openingHoursText(dict);

  const intents = detectIntents(lastUserMessage);
  const serviceId = detectService(lastUserMessage);
  const parts: string[] = [];
  const actions: ChatAction[] = [];

  if (needsSafetyWarning(lastUserMessage)) parts.push(t.safety);

  if (serviceId) {
    const content = getServiceContent(locale, serviceId);
    parts.push(fmt(t.serviceMatch, { service: content.name, short: content.short }));
    actions.push({ type: "booking", serviceId });
  }

  for (const intent of ["price", "hours", "location", "contact", "booking", "services"] as const) {
    if (!intents.includes(intent) || parts.length >= 3) continue;
    switch (intent) {
      case "price":
        parts.push(t.price);
        actions.push({ type: "booking", serviceId });
        break;
      case "hours":
        parts.push(hours ? fmt(t.hoursKnown, { hours }) : t.hoursUnknown);
        actions.push({ type: "contact" });
        break;
      case "location":
        parts.push([t.location, address ? fmt(t.locationAddress, { address }) : t.locationUnknown].join(" "));
        actions.push({ type: "contact" });
        break;
      case "contact":
        parts.push(
          [t.contactBase, phone && fmt(t.contactPhone, { phone: phone.label }), email && fmt(t.contactEmail, { email: email.label })]
            .filter(Boolean)
            .join(" "),
        );
        if (phone) actions.push({ type: "call" });
        actions.push({ type: "contact" });
        break;
      case "booking":
        parts.push(t.booking);
        actions.push({ type: "booking", serviceId });
        break;
      case "services":
        if (!serviceId) parts.push(fmt(t.services, { list: serviceNamesList(locale) }));
        actions.push({ type: "booking" });
        break;
    }
  }

  if (parts.length === 0) {
    if (intents.includes("thanks")) parts.push(t.thanks);
    else if (intents.includes("greeting")) parts.push(t.greeting);
    else {
      parts.push(t.unknown);
      actions.push({ type: "booking" }, { type: "contact" });
    }
  }

  return { reply: parts.join("\n\n"), serviceId, actions: uniqueActions(actions), mode: "fallback" };
}
