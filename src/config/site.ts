/** Configurație tehnică a site-ului (non-business). Valorile publice vin din NEXT_PUBLIC_*. */

function cleanUrl(url: string | undefined): string {
  return (url ?? "").trim().replace(/\/+$/, "");
}

export const siteConfig = {
  url: cleanUrl(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "true",
  /** Data ultimei actualizări majore a conținutului (sitemap lastModified). */
  contentUpdatedAt: "2026-09-25",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || null,
} as const;

export const analyticsConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || null,
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || null,
  googleAdsBookingLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_LABEL || null,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
} as const;

/** Bannerul de consimțământ apare doar dacă există instrumente care necesită consimțământ. */
export const consentRequired = Boolean(
  analyticsConfig.gtmId || analyticsConfig.ga4Id || analyticsConfig.googleAdsId || analyticsConfig.metaPixelId,
);

export const bookingLimits = {
  maxPhotos: 4,
  maxPhotoBytes: 5 * 1024 * 1024,
  maxTotalBytes: 12 * 1024 * 1024,
  /** Fotografiile sunt redimensionate în browser înainte de trimitere. */
  clientResizeMaxEdge: 1920,
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"] as const,
  acceptedExtensions: [".jpg", ".jpeg", ".png", ".webp"] as const,
  maxDescription: 2000,
} as const;

/** Variabilă server-side: încărcarea fotografiilor poate fi oprită fără modificări de cod. */
export function isUploadsEnabled(): boolean {
  return process.env.BOOKING_UPLOADS_ENABLED !== "false";
}

export const chatLimits = {
  maxMessageChars: 600,
  maxHistory: 12,
  maxUserTurns: 20,
} as const;
