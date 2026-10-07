/**
 * ForceCar — SURSA UNICĂ pentru datele firmei.
 *
 * Folosită în: header, footer, pagina de contact, JSON-LD, formularul de programare,
 * emailuri, asistentul AI și FAQ. Nu duplica aceste date în componente.
 *
 * REGULĂ: nu completa nimic ce nu este confirmat de proprietar.
 * Câmpurile `null` marcate cu ⚠ OWNER lipsesc încă — site-ul le ascunde automat
 * (nu apar în pagină, în schema.org sau în răspunsurile asistentului).
 *
 * Fișierul nu importă nimic (este citit și de next.config.ts pentru avertismente).
 */

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHoursSpec {
  days: DayOfWeek[];
  /** Format 24h "HH:MM" */
  opens: string;
  closes: string;
}

export interface BusinessConfig {
  name: string;
  legalName: string | null;
  experienceYears: number;
  foundingYear: number | null;
  /** Format E.164, ex. "+37369000000" */
  phone: string | null;
  secondaryPhone: string | null;
  email: string | null;
  /** Număr E.164 folosit pentru WhatsApp */
  whatsapp: string | null;
  /** Număr E.164 folosit pentru Viber */
  viber: string | null;
  /** Username Telegram fără "@" */
  telegram: string | null;
  address: {
    streetAddress: string | null;
    locality: string;
    region: string;
    postalCode: string | null;
    countryCode: string;
    countryName: string;
  };
  geo: { lat: number; lng: number } | null;
  openingHours: OpeningHoursSpec[];
  googleBusinessProfileUrl: string | null;
  googleMapsUrl: string | null;
  socials: {
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    youtube: string | null;
  };
  /** Politici operaționale — `null` = necunoscut, întrebarea FAQ aferentă este ascunsă. */
  policies: {
    walkInsAccepted: boolean | null;
  };
  /** Logo oficial (PNG/SVG în /public). `null` = se folosește wordmark-ul tipografic. */
  logo: string | null;
}

export const business: BusinessConfig = {
  name: "ForceCar",
  legalName: null, // ⚠ OWNER: denumirea juridică (ex. „... S.R.L.”)
  experienceYears: 20,
  foundingYear: null, // ⚠ OWNER: anul înființării (opțional)

  phone: "+37362115092",
  secondaryPhone: null,
  email: "talchivbogdan03@gmail.com",
  whatsapp: null, // ⚠ OWNER
  viber: null, // ⚠ OWNER
  telegram: null, // ⚠ OWNER

  address: {
    streetAddress: "str. Ismail 103",
    locality: "Chișinău",
    region: "Municipiul Chișinău",
    postalCode: null, // ⚠ OWNER: ex. "MD-2000"
    countryCode: "MD",
    countryName: "Republica Moldova",
  },
  geo: null, // coordonatele anterioare nu coincideau cu str. Ismail 103

  // ⚠ OWNER: programul real, ex. [{ days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" }]
  openingHours: [],

  googleBusinessProfileUrl: null, // ⚠ OWNER: link profil Google Business
  googleMapsUrl: null, // ⚠ OWNER: link Google Maps către service

  socials: {
    facebook: null,
    instagram: null,
    tiktok: null,
    youtube: null,
  },

  policies: {
    walkInsAccepted: null, // ⚠ OWNER: primiți clienți fără programare?
  },

  logo: "/images/forcecar/_og/forcecarlogo2.png",
};

/** Lista câmpurilor esențiale care lipsesc — afișată în dev și la build. */
export function getMissingBusinessFields(b: BusinessConfig = business): string[] {
  const missing: string[] = [];
  if (!b.phone) missing.push("telefon");
  if (!b.email) missing.push("email");
  if (!b.address.streetAddress) missing.push("adresă (stradă)");
  if (!b.geo) missing.push("coordonate GPS");
  if (b.openingHours.length === 0) missing.push("program de lucru");
  if (!b.whatsapp && !b.viber && !b.telegram) missing.push("WhatsApp / Viber / Telegram");
  if (!b.googleBusinessProfileUrl) missing.push("profil Google Business");
  if (!b.legalName) missing.push("denumire juridică");
  if (!b.logo) missing.push("logo oficial");
  return missing;
}
