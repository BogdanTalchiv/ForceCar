/** Consimțământ cookie — stocat first-party în cookie-ul `fc_consent`. */

export const CONSENT_COOKIE = "fc_consent";
export const CONSENT_VERSION = 1;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export const CONSENT_CHANGED_EVENT = "fc:consent-changed";
export const OPEN_CONSENT_EVENT = "fc:open-consent";

export interface ConsentState {
  v: number;
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

export function parseConsent(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>;
    if (value.v !== CONSENT_VERSION) return null;
    return { v: CONSENT_VERSION, analytics: value.analytics === true, marketing: value.marketing === true, ts: Number(value.ts) || 0 };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  return parseConsent(match?.slice(CONSENT_COOKIE.length + 1));
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }): ConsentState {
  const state: ConsentState = { v: CONSENT_VERSION, ...choice, ts: Date.now() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(state))}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGED_EVENT, { detail: state }));
  return state;
}

/** Semnalele Google Consent Mode v2. */
export function googleConsent(state: Pick<ConsentState, "analytics" | "marketing">) {
  const ad = state.marketing ? "granted" : "denied";
  return {
    ad_storage: ad,
    ad_user_data: ad,
    ad_personalization: ad,
    analytics_storage: state.analytics ? "granted" : "denied",
  } as const;
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
