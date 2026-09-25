import type { Locale } from "@/i18n/config";
import type { ServiceId } from "@/config/services";
import type { ServiceContent, ServiceContentMap } from "./types";
import ro from "./ro";
import ru from "./ru";
import it from "./it";
import en from "./en";

const content: Record<Locale, ServiceContentMap> = { ro, ru, it, en };

export function getServiceContent(locale: Locale, id: ServiceId): ServiceContent {
  return content[locale][id];
}

export type { ServiceContent };
