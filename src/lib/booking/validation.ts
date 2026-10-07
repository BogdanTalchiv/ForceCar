/**
 * Validarea cererii de programare — folosită identic în browser și pe server.
 * Fără dependențe de framework, ca să poată fi testată izolat.
 */
import { bookingLimits } from "@/config/site";

export const contactMethods = ["phone", "whatsapp", "viber", "telegram", "email"] as const;
export type ContactMethod = (typeof contactMethods)[number];

export const preferredTimes = ["any", "morning", "midday", "afternoon"] as const;
export type PreferredTime = (typeof preferredTimes)[number];

export const SERVICE_UNKNOWN = "unknown";
export const SERVICE_OTHER = "other";

export type BookingField =
  | "name"
  | "phone"
  | "email"
  | "contactMethod"
  | "carBrand"
  | "carModel"
  | "carYear"
  | "mileage"
  | "plate"
  | "service"
  | "description"
  | "preferredDate"
  | "preferredTime"
  | "consent"
  | "photos";

export type BookingErrorKey =
  | "required"
  | "name"
  | "phone"
  | "email"
  | "emailRequired"
  | "year"
  | "mileage"
  | "service"
  | "date"
  | "consent"
  | "description"
  | "photoType"
  | "photoSize"
  | "photoCount"
  | "photoTotal";

export type BookingErrors = Partial<Record<BookingField, BookingErrorKey>>;

export interface BookingData {
  name: string;
  phone: string;
  email: string;
  contactMethod: ContactMethod;
  carBrand: string;
  carModel: string;
  carYear: number;
  mileage: number | null;
  plate: string | null;
  service: string;
  description: string;
  preferredDate: string | null;
  preferredTime: PreferredTime;
}

export type RawBooking = Partial<Record<Exclude<BookingField, "photos">, unknown>>;

export interface ValidationContext {
  serviceIds: readonly string[];
  /** Data curentă YYYY-MM-DD (fusul orar Europe/Chisinau). */
  today: string;
}

const str = (v: unknown) => (typeof v === "string" ? v : "");
const oneLine = (v: unknown, max: number) =>
  str(v)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/** Normalizează numere moldovenești și internaționale: „069 123 456” → „+37369123456”. */
export function normalizePhone(raw: string): string | null {
  let v = raw.trim().replace(/[\s().\-/]/g, "");
  if (v.startsWith("00")) v = `+${v.slice(2)}`;
  if (/^0\d{8}$/.test(v)) v = `+373${v.slice(1)}`;
  else if (/^373\d{8}$/.test(v)) v = `+${v}`;
  if (!/^\+?\d{8,15}$/.test(v)) return null;
  return v;
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function isValidEmail(value: string): boolean {
  return value.length <= 120 && EMAIL_RE.test(value);
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function todayInChisinau(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Chisinau" }).format(now);
}

export function yearRange(today: string): { min: number; max: number } {
  return { min: 1960, max: Number(today.slice(0, 4)) + 1 };
}

export function validateBooking(
  raw: RawBooking,
  ctx: ValidationContext,
): { ok: true; data: BookingData } | { ok: false; errors: BookingErrors } {
  const errors: BookingErrors = {};

  const name = oneLine(raw.name, 80);
  if (!name) errors.name = "required";
  else if (name.length < 2) errors.name = "name";

  const phoneRaw = oneLine(raw.phone, 32);
  const phone = phoneRaw ? normalizePhone(phoneRaw) : null;
  if (!phoneRaw) errors.phone = "required";
  else if (!phone) errors.phone = "phone";

  const contactMethod = (contactMethods as readonly string[]).includes(str(raw.contactMethod))
    ? (str(raw.contactMethod) as ContactMethod)
    : "phone";

  const email = oneLine(raw.email, 120).toLowerCase();
  if (!email) errors.email = "emailRequired";
  else if (!isValidEmail(email)) errors.email = "email";

  const carBrand = oneLine(raw.carBrand, 40);
  if (!carBrand) errors.carBrand = "required";
  const carModel = oneLine(raw.carModel, 40);
  if (!carModel) errors.carModel = "required";

  const { min, max } = yearRange(ctx.today);
  const yearStr = oneLine(raw.carYear, 4);
  const carYear = Number(yearStr);
  if (!yearStr || !Number.isInteger(carYear) || carYear < min || carYear > max) errors.carYear = "year";

  const mileageStr = oneLine(raw.mileage, 12).replace(/[\s.,]/g, "");
  let mileage: number | null = null;
  if (mileageStr) {
    mileage = /^\d{1,7}$/.test(mileageStr) ? Number(mileageStr) : NaN;
    if (!Number.isFinite(mileage) || mileage > 2_000_000) {
      errors.mileage = "mileage";
      mileage = null;
    }
  }

  const plate = oneLine(raw.plate, 15).toUpperCase() || null;

  const service = str(raw.service);
  if (!service) errors.service = "service";
  else if (service !== SERVICE_UNKNOWN && service !== SERVICE_OTHER && !ctx.serviceIds.includes(service)) {
    errors.service = "service";
  }

  const descriptionRaw = str(raw.description).replace(/\r\n?/g, "\n").trim();
  if (descriptionRaw.length > bookingLimits.maxDescription) errors.description = "description";
  const description = descriptionRaw.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").slice(0, bookingLimits.maxDescription);

  const dateStr = oneLine(raw.preferredDate, 10);
  let preferredDate: string | null = null;
  if (dateStr) {
    // O zi de toleranță pentru clienții din alt fus orar.
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !Number.isNaN(Date.parse(`${dateStr}T12:00:00Z`));
    if (!valid || dateStr < addDays(ctx.today, -1) || dateStr > addDays(ctx.today, 366)) errors.preferredDate = "date";
    else preferredDate = dateStr;
  }

  const preferredTime = (preferredTimes as readonly string[]).includes(str(raw.preferredTime))
    ? (str(raw.preferredTime) as PreferredTime)
    : "any";

  const consent = raw.consent === true || raw.consent === "on" || raw.consent === "true";
  if (!consent) errors.consent = "consent";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: {
      name,
      phone: phone!,
      email,
      contactMethod,
      carBrand,
      carModel,
      carYear,
      mileage,
      plate,
      service,
      description,
      preferredDate,
      preferredTime,
    },
  };
}

export interface PhotoMeta {
  name: string;
  type: string;
  size: number;
}

export function validatePhotos(files: PhotoMeta[]): BookingErrorKey | null {
  if (files.length > bookingLimits.maxPhotos) return "photoCount";
  let total = 0;
  for (const f of files) {
    const ext = f.name.toLowerCase().slice(f.name.lastIndexOf("."));
    if (!(bookingLimits.acceptedTypes as readonly string[]).includes(f.type)) return "photoType";
    if (!(bookingLimits.acceptedExtensions as readonly string[]).includes(ext)) return "photoType";
    if (f.size <= 0 || f.size > bookingLimits.maxPhotoBytes) return "photoSize";
    total += f.size;
  }
  if (total > bookingLimits.maxTotalBytes) return "photoTotal";
  return null;
}

/** Verifică semnătura reală a fișierului (nu ne bazăm pe extensie sau pe tipul declarat). */
export function detectImageType(bytes: Uint8Array): "image/jpeg" | "image/png" | "image/webp" | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length >= 8 && png.every((b, i) => bytes[i] === b)) return "image/png";
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
  if (bytes.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  return null;
}

const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function createBookingId(now = new Date(), random: (n: number) => Uint8Array = defaultRandom): string {
  const date = todayInChisinau(now).slice(2).replace(/-/g, "");
  const suffix = Array.from(random(4), (b) => ID_ALPHABET[b % ID_ALPHABET.length]).join("");
  return `FC-${date}-${suffix}`;
}

function defaultRandom(n: number): Uint8Array {
  const out = new Uint8Array(n);
  globalThis.crypto.getRandomValues(out);
  return out;
}
