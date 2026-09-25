"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { readConsent } from "@/lib/analytics/consent";
import { track, type EventName } from "@/lib/analytics/track";
import { captureUtm } from "@/lib/analytics/utm";

const trackable = new Set<EventName>([
  "booking_start",
  "phone_click",
  "email_click",
  "message_click",
  "chat_open",
  "language_change",
]);

/**
 * Captură UTM + măsurarea click-urilor de contact prin delegare
 * (tel:, mailto:, WhatsApp/Viber/Telegram, [data-track]) — fără cod în fiecare buton.
 */
export function TrackingBootstrap() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    captureUtm(location.search, readConsent()?.analytics === true);
    if (first.current) {
      first.current = false;
      return;
    }
    if (typeof window.fbq === "function") window.fbq("track", "PageView");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a[href], [data-track]");
      if (!el) return;
      const location = el.closest("[data-track-location]")?.getAttribute("data-track-location") ?? undefined;
      const params = { location, page: window.location.pathname };
      const explicit = el.getAttribute("data-track") as EventName | null;
      if (explicit && trackable.has(explicit)) return track(explicit, params);
      const href = el.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("phone_click", params);
      else if (href.startsWith("mailto:")) track("email_click", params);
      else if (/^https:\/\/wa\.me\//.test(href)) track("message_click", { ...params, channel: "whatsapp" });
      else if (href.startsWith("viber:")) track("message_click", { ...params, channel: "viber" });
      else if (/^https:\/\/t\.me\//.test(href)) track("message_click", { ...params, channel: "telegram" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
