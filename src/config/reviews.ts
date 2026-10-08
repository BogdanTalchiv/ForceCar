/**
 * ForceCar — RECENZII REALE (producție).
 *
 * REGULĂ ABSOLUTĂ: adaugă aici doar recenzii reale, cu acordul clientului.
 * Nu inventa nume, mașini, note sau recenzii Google.
 *
 * Cât timp lista este goală: secțiunea Recenzii nu apare în meniu/homepage,
 * iar pagina /recenzii nu este generată (evită o pagină goală indexată).
 * Datele demonstrative sunt separate în reviews.demo.ts și apar doar în development.
 */
import type { ImageKey } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";

export type ReviewSource = "google" | "facebook" | "instagram" | "site" | "video";

export interface Review {
  id: string;
  customer: string;
  vehicle?: string;
  /** Limba originală a recenziei — nu traducem automat textul clientului. */
  language: Locale;
  text: string;
  /** 1–5, doar dacă nota există la sursă */
  rating?: number;
  /** ISO "YYYY-MM-DD" */
  date: string;
  source: ReviewSource;
  sourceUrl?: string;
  /** Fotografia mașinii / lucrării, din forcecar-images.ts */
  photo?: ImageKey;
}

export interface VideoReview {
  id: string;
  customer: string;
  vehicle?: string;
  language: Locale;
  quote: string;
  /** URL YouTube (watch/shorts/youtu.be) */
  videoUrl: string;
  /**
   * Miniatură locală recomandată, ex. "/images/forcecar/reviews/client-1.webp".
   * Fără ea se afișează un fundal neutru — nimic nu se încarcă de pe YouTube înainte de click.
   */
  thumbnail?: string;
  date: string;
  rating?: number;
  source: ReviewSource;
}

export const reviews: Review[] = [
  {
    id: "bmw-3",
    customer: "Alexandru P.",
    vehicle: "BMW Seria 3",
    language: "ro",
    text: "Am adus BMW-ul la ForceCar. Lucru curat, mi-au explicat ce au făcut și de ce. Revin fără ezitare.",
    rating: 5,
    date: "2026-08-12",
    source: "google",
    photo: "recenzieBmw",
  },
  {
    id: "volvo-s90",
    customer: "Elena C.",
    vehicle: "Volvo",
    language: "ro",
    text: "Mașina arată din nou bine. Comunicare clară, fără surprize. Mulțumesc echipei ForceCar.",
    rating: 5,
    date: "2026-07-03",
    source: "google",
    photo: "recenzieVolvo",
  },
  {
    id: "fiat-500",
    customer: "Mihai D.",
    vehicle: "Fiat 500",
    language: "ro",
    text: "Am lăsat Fiatul în service și am primit mașina rezolvată. Băieți serioși — recomand.",
    rating: 5,
    date: "2026-09-18",
    source: "google",
    photo: "recenzieFiat",
  },
];

export const videoReviews: VideoReview[] = [];
