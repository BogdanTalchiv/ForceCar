import type { Locale } from "@/i18n/config";
import type { LegalContent } from "./types";
import ro from "./ro";
import ru from "./ru";
import it from "./it";
import en from "./en";

const content: Record<Locale, LegalContent> = { ro, ru, it, en };

export function getLegalContent(locale: Locale): LegalContent {
  return content[locale];
}

export type { LegalContent };
