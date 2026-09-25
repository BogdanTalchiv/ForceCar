/**
 * Parametrii campaniei (UTM) sunt reținuți pentru a fi atașați cererii de programare.
 * sessionStorage: mereu (necesar pentru atribuirea cererii trimise în aceeași vizită).
 * localStorage (30 de zile): doar cu consimțământ pentru analiză.
 */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type Utm = Partial<Record<UtmKey, string>>;

const SESSION_KEY = "fc_utm";
const LOCAL_KEY = "fc_utm";
const LONG_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function sanitizeUtmValue(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, 150);
}

export function parseUtm(search: string): Utm {
  const params = new URLSearchParams(search);
  const out: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      const clean = sanitizeUtmValue(value);
      if (clean) out[key] = clean;
    }
  }
  return out;
}

function safe<T>(fn: () => T): T | null {
  try {
    return fn();
  } catch {
    return null;
  }
}

export function captureUtm(search: string, persistLong: boolean): void {
  const utm = parseUtm(search);
  if (Object.keys(utm).length === 0) {
    if (persistLong) promoteUtm();
    return;
  }
  safe(() => sessionStorage.setItem(SESSION_KEY, JSON.stringify(utm)));
  if (persistLong) safe(() => localStorage.setItem(LOCAL_KEY, JSON.stringify({ utm, exp: Date.now() + LONG_TTL_MS })));
}

export function getUtm(): Utm {
  const session = safe(() => sessionStorage.getItem(SESSION_KEY));
  if (session) return safe(() => JSON.parse(session) as Utm) ?? {};
  const local = safe(() => localStorage.getItem(LOCAL_KEY));
  if (!local) return {};
  const parsed = safe(() => JSON.parse(local) as { utm: Utm; exp: number });
  if (!parsed || parsed.exp < Date.now()) {
    safe(() => localStorage.removeItem(LOCAL_KEY));
    return {};
  }
  return parsed.utm;
}

/** La acordarea consimțământului pentru analiză, UTM-ul din sesiune este păstrat 30 de zile. */
export function promoteUtm(): void {
  const session = safe(() => sessionStorage.getItem(SESSION_KEY));
  if (session) safe(() => localStorage.setItem(LOCAL_KEY, JSON.stringify({ utm: JSON.parse(session), exp: Date.now() + LONG_TTL_MS })));
}

export function clearLongUtm(): void {
  safe(() => localStorage.removeItem(LOCAL_KEY));
}
