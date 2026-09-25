/**
 * Încărcarea instrumentelor de măsurare — apelată DOAR după consimțământ.
 * GTM are prioritate: dacă NEXT_PUBLIC_GTM_ID este setat, GA4 / Ads se configurează în GTM
 * (fără încărcare directă, pentru a evita dublarea măsurătorilor).
 */
import { analyticsConfig } from "@/config/site";
import { googleConsent, type ConsentState } from "@/lib/analytics/consent";

const loaded = new Set<string>();

function loadScript(id: string, src: string) {
  if (loaded.has(id) || document.getElementById(id)) return;
  loaded.add(id);
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js cere obiectul `arguments`, nu un array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
}

export function updateGoogleConsent(state: ConsentState) {
  ensureGtag();
  window.gtag!("consent", "update", googleConsent(state));
}

function loadMetaPixel(pixelId: string) {
  if (window.fbq) return;
  type Fbq = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[];
    push: Fbq;
    loaded: boolean;
    version: string;
  };
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  (window as unknown as { _fbq?: Fbq })._fbq = fbq;
  loadScript("fc-meta", "https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", pixelId);
  fbq("track", "PageView");
}

const configured = new Set<string>();

export function applyConsent(state: ConsentState) {
  const { gtmId, ga4Id, googleAdsId, metaPixelId } = analyticsConfig;
  updateGoogleConsent(state);

  if (gtmId) {
    if ((state.analytics || state.marketing) && !loaded.has("fc-gtm")) {
      window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
      loadScript("fc-gtm", `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
    }
  } else {
    const wantGa = state.analytics && ga4Id;
    const wantAds = state.marketing && googleAdsId;
    if (wantGa || wantAds) {
      const primary = (wantGa ? ga4Id : googleAdsId)!;
      if (!loaded.has("fc-gtag")) {
        loadScript("fc-gtag", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primary)}`);
        window.gtag!("js", new Date());
      }
      if (wantGa && !configured.has(ga4Id!)) {
        configured.add(ga4Id!);
        window.gtag!("config", ga4Id);
      }
      if (wantAds && !configured.has(googleAdsId!)) {
        configured.add(googleAdsId!);
        window.gtag!("config", googleAdsId);
      }
    }
  }

  if (metaPixelId) {
    if (state.marketing) {
      if (window.fbq) window.fbq("consent", "grant");
      else loadMetaPixel(metaPixelId);
    } else if (window.fbq) {
      window.fbq("consent", "revoke");
    }
  }
}
