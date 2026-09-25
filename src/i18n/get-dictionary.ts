import type { Locale } from "./config";
import ro, { type Dictionary } from "./dictionaries/ro";
import ru from "./dictionaries/ru";
import it from "./dictionaries/it";
import en from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { ro, ru, it, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
