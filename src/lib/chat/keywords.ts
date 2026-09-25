/**
 * Cuvinte-cheie multilingve (RO/RU/IT/EN) pentru modul fără AI.
 * Textul este normalizat (litere mici, fără diacritice) înainte de comparare,
 * așa că aici se scriu rădăcini fără diacritice.
 */
import type { ServiceId } from "@/config/services";

export function normalize(text: string): string {
  return ` ${text
    .toLowerCase()
    .replace(/ё/g, "е")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

/** Ordinea contează la egalitate de scor: serviciile specifice înaintea celor generale. */
export const serviceKeywords: [ServiceId, string[]][] = [
  ["timing", ["distributi", "curea", "lant de distr", "грм", "ремень", "цеп", "timing", "cam belt", "cinghia", "catena", "distribuzion"]],
  [
    "brakes",
    ["fran", "placut", "etrier", "discuri", "тормоз", "колодк", "суппорт", "brake", "pads", "caliper", "freni", "freno", "pastigl", "pinz"],
  ],
  [
    "suspension",
    [
      "suspensi", "amortiz", "directi", "volan", "bucs", "pivot", "bieleta", "ходов", "подвеск", "амортиз", "рулев", "руль",
      "suspension", "shock absorb", "steering", "sospension", "ammortizz", "sterzo",
    ],
  ],
  [
    "bodywork",
    [
      "caroser", "tinichig", "accident", "lovit", "lovitur", "indoit", "кузов", "дтп", "вмятин", "авари", "body", "dent", "collision",
      "crash", "carrozz", "ammacc", "incident",
    ],
  ],
  ["paint", ["vopsi", "zgarietur", "покрас", "краск", "царап", "paint", "scratch", "vernic", "graffi"]],
  [
    "engine",
    [
      "motor", "двигат", "мотор", "engine", "fum", "дым", "smoke", "fumo", "ulei", "масл", "oil", "olio", "supraincalz", "перегрев",
      "overheat", "surriscald", "pierde putere", "не тянет", "power loss", "potenza",
    ],
  ],
  [
    "diagnostics",
    [
      "diagnost", "check engine", "martor", "eroare", "erori", "диагност", "чек", "ошибк", "лампочк", "горит", "spia", "diagnosi", "errore",
      "warning light", "fault code", "obd", "nu stiu ce are", "не знаю", "non so",
    ],
  ],
  [
    "mechanical",
    [
      "revizi", "intretiner", "ambreiaj", "filtr", "schimb ulei", " то ", "обслуживан", "сцеплен", "замена масла", "maintenance", "clutch",
      "oil change", "tagliando", "frizione", "manutenzion", "mecanic", "механик", "слесар", "meccanic", "mechanic",
    ],
  ],
];

export type Intent = "greeting" | "thanks" | "booking" | "price" | "hours" | "location" | "contact" | "services";

export const intentKeywords: Record<Intent, string[]> = {
  greeting: [" buna ", " salut", "привет", "здравств", "добрый", " ciao", "buongiorno", "buonasera", " hello", " hi ", " hey "],
  thanks: ["multumesc", "mersi", "спасибо", "благодар", "grazie", "thank"],
  booking: ["programare", "programez", "programa ", "rezerv", "запис", "запиш", "prenot", "appuntamento", "appointment", " book", "reserve"],
  price: [" pret", " cost", "cat costa", "tarif", " lei ", "цен", "стоим", "сколько", "prezz", "costo", "quanto", "price", "how much"],
  hours: [
    "program de lucru", "programul", " orar", "deschis", "inchis", "ce ore", "часы", "график", "работаете", "режим работы", " orari",
    " aperto", "apert", " hours", " open", "closing",
  ],
  location: [" unde ", "adres", "locati", "harta", " где ", "адрес", "находит", " dove ", "indirizzo", " where", "address", "location", "map"],
  contact: ["telefon", "contact", " numar", " sun ", " email", "телефон", "контакт", "номер", "позвон", "почт", "chiamare", " phone", " call"],
  services: ["servicii", "ce faceti", "oferiti", "услуг", "что делаете", "servizi", "cosa fate", "services", "what do you do", "what can you"],
};

/** Semne care cer un avertisment de siguranță (nu un diagnostic). */
export const safetyKeywords = [
  " fum", "дым", "smoke", "fumo", "miros de ars", " ars ", "горел", "гарь", "burning", "bruciat", "supraincalz", "temperatura", "перегрев",
  "температур", "overheat", "surriscald", "nu franeaza", "nu mai franeaza", "pedala", "не тормоз", "педал", "won t brake", "no brakes",
  "pedal", "non frena", "pedale", "volanul se blocheaz", "руль заклин", "steering lock", "sterzo bloccat",
];
