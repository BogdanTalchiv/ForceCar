import { videoReviews } from "@/config/reviews";
import { analyticsConfig } from "@/config/site";
import type { ConsentChoice } from "@/lib/analytics/consent";
import { mapsEmbedUrl } from "@/lib/business-info";

/** Instrumente care cer categoria „funcționale” — folosite la textele din banner/legal. */
export const functionalTools = {
  maps: Boolean(mapsEmbedUrl()),
  youtube: videoReviews.length > 0,
} as const;

/**
 * Categoriile opționale care există efectiv pe site, deduse din configurație.
 * O categorie apare în banner și în politica de cookie-uri doar dacă un instrument real o folosește.
 */
export const consentCategories: ConsentChoice = {
  analytics: Boolean(analyticsConfig.gtmId || analyticsConfig.ga4Id),
  marketing: Boolean(analyticsConfig.gtmId || analyticsConfig.googleAdsId || analyticsConfig.metaPixelId),
  functional: functionalTools.maps || functionalTools.youtube,
};

/** Bannerul și linkul „Setări cookie-uri” apar doar dacă există cel puțin o categorie opțională. */
export const consentManaged = Object.values(consentCategories).some(Boolean);
