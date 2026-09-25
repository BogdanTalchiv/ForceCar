"use client";

import { openConsentPreferences } from "@/lib/analytics/consent";

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={openConsentPreferences} className="hover:text-white">
      {label}
    </button>
  );
}
