import { analyticsConfig } from "@/config/site";

export type EventName =
  | "booking_start"
  | "booking_submit"
  | "phone_click"
  | "email_click"
  | "message_click"
  | "service_view"
  | "before_after_interaction"
  | "video_review_play"
  | "chat_open"
  | "chat_lead"
  | "language_change";

export type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const metaEvents: Partial<Record<EventName, string>> = {
  booking_submit: "Lead",
  chat_lead: "Lead",
  phone_click: "Contact",
  message_click: "Contact",
  email_click: "Contact",
};

/**
 * Trimite un eveniment. Evenimentele ajung în dataLayer; instrumentele (GTM / GA4 / Ads / Meta)
 * sunt încărcate doar după consimțământ, deci nimic nu pleacă din browser fără acord.
 * Nu trimite niciodată date personale (nume, telefon, email) ca parametri.
 */
export function track(name: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...clean });

  if (!analyticsConfig.gtmId && typeof window.gtag === "function") {
    window.gtag("event", name, clean);
    if (name === "booking_submit" && analyticsConfig.googleAdsId && analyticsConfig.googleAdsBookingLabel) {
      window.gtag("event", "conversion", {
        send_to: `${analyticsConfig.googleAdsId}/${analyticsConfig.googleAdsBookingLabel}`,
      });
    }
  }

  const metaEvent = metaEvents[name];
  if (metaEvent && typeof window.fbq === "function") window.fbq("track", metaEvent);
}
