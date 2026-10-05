/**
 * ForceCar — CONFIGURAȚIA CENTRALĂ A IMAGINILOR.
 *
 * Fotografiile stau în public/images/forcecar/<categorie>/.
 * Dimensiunile, placeholder-ul blur și varianta Open Graph sunt generate automat
 * de `npm run images` (rulează singur înainte de dev/build) în generated/image-manifest.json.
 *
 * Pentru a înlocui o fotografie: pune fișierul nou în folder și schimbă `file` mai jos.
 * Pentru a adăuga una nouă: pune-o în folderul categoriei — apare automat în galerie;
 * adaug-o aici doar dacă vrei text alternativ specific sau să o folosești pe un serviciu.
 *
 * Videoclipurile din folderele de categorie (în afară de `_og`) apar în Lucrări.
 * Videoclipul din header rămâne în `_og` și nu intră în galerie.
 *
 * Dacă o imagine lipsește, site-ul afișează un fallback grafic controlat (nu imagine spartă).
 */
import type { Locale, Localized } from "@/i18n/config";
import manifestJson from "./generated/image-manifest.json";
import videoManifestJson from "./generated/video-manifest.json";

export type GalleryCategory = "engine" | "timing" | "brakes" | "mechanical" | "bodywork" | "paint" | "video";
export type MediaKind = "image" | "video";

interface ManifestEntry {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  og: string;
  bytes: number;
}

interface VideoManifestEntry {
  src: string;
  bytes: number;
  width?: number;
  height?: number;
  poster?: string;
  posterBlur?: string;
}

const manifest = manifestJson as Record<string, ManifestEntry>;
const videoManifest = videoManifestJson as Record<string, VideoManifestEntry>;

const VIDEO_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

interface ImageDef {
  file: string;
  alt: Localized;
  /** CSS object-position — păstrează în cadru mecanicul / zona reparată la decupare. */
  focal: string;
  category?: GalleryCategory;
}

const images = {
  diagnostica: {
    file: "services/diagnostica.jpg",
    focal: "42% 38%",
    category: "mechanical",
    alt: {
      ro: "Mecanic diagnosticând un automobil cu laptop-ul conectat la motor, capota deschisă",
      ru: "Механик диагностирует автомобиль с ноутбуком, подключённым к двигателю, капот открыт",
      it: "Meccanico che diagnostica un'auto con il laptop collegato al motore, cofano aperto",
      en: "Mechanic diagnosing a car with a laptop connected to the engine, bonnet open",
    },
  },
  motor: {
    file: "services/motor.jpg",
    focal: "55% 48%",
    category: "engine",
    alt: {
      ro: "Motor scos pe stand, în lucru, în atelierul auto",
      ru: "Двигатель на стенде в работе в автомастерской",
      it: "Motore sul banco di lavoro in officina",
      en: "Engine on a stand being worked on in the workshop",
    },
  },
  distributie: {
    file: "services/distributie.jpg",
    focal: "48% 45%",
    category: "timing",
    alt: {
      ro: "Lanț de distribuție și ax cu came vizibile pe un motor deschis",
      ru: "Цепь ГРМ и распредвал на открытом двигателе",
      it: "Catena di distribuzione e albero a camme su un motore aperto",
      en: "Timing chain and camshaft on an opened engine",
    },
  },
  frane: {
    file: "services/frane.webp",
    focal: "50% 50%",
    category: "brakes",
    alt: {
      ro: "Disc și etrier de frână verificați pe un automobil ridicat",
      ru: "Тормозной диск и суппорт на поднятом автомобиле",
      it: "Disco e pinza del freno su un'auto sollevata",
      en: "Brake disc and caliper on a car on a lift",
    },
  },
  mecanica: {
    file: "services/mecanica.jpg",
    focal: "50% 42%",
    category: "mechanical",
    alt: {
      ro: "Verificare a părții de jos a unui automobil ridicat pe elevator",
      ru: "Проверка днища автомобиля на подъёмнике",
      it: "Controllo del sottoscocca di un'auto sul ponte sollevatore",
      en: "Underside inspection of a car on a lift",
    },
  },
  caroserie: {
    file: "services/caroserie.jpg",
    focal: "50% 50%",
    category: "bodywork",
    alt: {
      ro: "Tehnicieni lucrând la caroseria unui automobil pe standul de îndreptare",
      ru: "Мастера работают с кузовом автомобиля на стапеле",
      it: "Tecnici al lavoro sulla carrozzeria di un'auto sul banco di raddrizzatura",
      en: "Technicians working on a car body on a frame bench",
    },
  },
} satisfies Record<string, ImageDef>;

export type ImageKey = keyof typeof images;

/** O pereche Înainte/După — DOAR fotografii reale ale aceleiași mașini și aceleiași lucrări. */
export interface BeforeAfterPair {
  id: string;
  serviceId: string;
  before: ImageKey;
  after: ImageKey;
  title: Localized;
}

/**
 * Harta semantică folosită de componente. Nu scrie căi de imagini în componente.
 */
export const forceCarImages = {
  hero: "diagnostica",
  about: "mecanica",
  workshop: ["mecanica", "diagnostica"],
  finalCta: "motor",
  services: {
    diagnostics: "diagnostica",
    engine: "motor",
    timing: "distributie",
    brakes: "frane",
    suspension: "mecanica",
    mechanical: "mecanica",
    bodywork: "caroserie",
    paint: "caroserie",
  },
  engine: ["motor"],
  timing: ["distributie"],
  brakes: ["frane"],
  mechanical: ["mecanica"],
  bodywork: ["caroserie"],
  paint: ["caroserie"],
  parts: ["mecanica"],
  gallery: ["motor", "distributie", "frane", "caroserie", "mecanica", "diagnostica"],
  /**
   * NU există încă perechi reale Înainte/După. Nu combina fotografii ale unor mașini diferite.
   * Exemplu (după ce ai fotografiile reale ale aceleiași lucrări):
   * { id: "bmw-bara-fata", serviceId: "bodywork", before: "bmwBefore", after: "bmwAfter", title: {...} }
   */
  beforeAfter: [] as BeforeAfterPair[],
} as const satisfies {
  hero: ImageKey;
  about: ImageKey;
  workshop: readonly ImageKey[];
  finalCta: ImageKey;
  services: Record<string, ImageKey>;
  gallery: readonly ImageKey[];
  [key: string]: unknown;
};

export interface ResolvedImage {
  id: string;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  og: string;
  alt: string;
  focal: string;
  category?: GalleryCategory;
  kind?: MediaKind;
  poster?: string;
}

export function getImage(key: ImageKey, locale: Locale): ResolvedImage | null {
  const def: ImageDef = images[key];
  const entry = manifest[def.file];
  if (!entry) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[ForceCar] Imagine lipsă: public/images/forcecar/${def.file} (se afișează fallback)`);
    }
    return null;
  }
  return {
    id: key,
    src: entry.src,
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blurDataURL,
    og: entry.og,
    alt: def.alt[locale],
    focal: def.focal,
    category: def.category,
    kind: "image",
  };
}

export function getImages(keys: readonly ImageKey[], locale: Locale): ResolvedImage[] {
  return keys.map((k) => getImage(k, locale)).filter((i): i is ResolvedImage => i !== null);
}

const folderCategory: Record<string, GalleryCategory> = {
  engine: "engine",
  timing: "timing",
  brakes: "brakes",
  workshop: "mechanical",
  parts: "mechanical",
  services: "mechanical",
  bodywork: "bodywork",
  paint: "paint",
};

/**
 * Galeria = imaginile configurate + fotografiile noi adăugate în folderele de categorie
 * (fără configurare manuală). Textul alternativ generic vine din dicționar.
 */
export function getGalleryImages(
  locale: Locale,
  genericAlt: (category: GalleryCategory) => string,
): ResolvedImage[] {
  const configured = getImages(forceCarImages.gallery, locale);
  const knownFiles = new Set(Object.values(images).map((d: ImageDef) => d.file));
  const extra: ResolvedImage[] = [];
  for (const [file, entry] of Object.entries(manifest)) {
    if (knownFiles.has(file)) continue;
    const category = folderCategory[file.split("/")[0]];
    if (!category) continue;
    extra.push({
      id: file,
      src: entry.src,
      width: entry.width,
      height: entry.height,
      blurDataURL: entry.blurDataURL,
      og: entry.og,
      alt: genericAlt(category),
      focal: "50% 50%",
      category,
      kind: "image",
    });
  }
  return [...configured, ...extra];
}

/** Galeria Lucrări: fotografii + videoclipuri din atelier (fără videoclipul din header). */
export function getGalleryMedia(
  locale: Locale,
  genericAlt: (category: GalleryCategory) => string,
  genericVideoAlt: string,
): ResolvedImage[] {
  const photos = getGalleryImages(locale, genericAlt);
  const videos: ResolvedImage[] = [];
  for (const [file, entry] of Object.entries(videoManifest)) {
    videos.push({
      id: file,
      src: entry.src,
      width: entry.width ?? 1080,
      height: entry.height ?? 1920,
      blurDataURL: entry.posterBlur ?? VIDEO_PLACEHOLDER,
      og: entry.poster ?? entry.src,
      alt: genericVideoAlt,
      focal: "50% 50%",
      category: "video",
      kind: "video",
      poster: entry.poster,
    });
  }
  return [...photos, ...videos];
}

export function getBeforeAfterPairs(serviceId?: string): BeforeAfterPair[] {
  return forceCarImages.beforeAfter.filter(
    (p) => (!serviceId || p.serviceId === serviceId) && manifest[images[p.before].file] && manifest[images[p.after].file],
  );
}

export function getOgImage(key: ImageKey): { url: string; width: number; height: number } | null {
  const entry = manifest[images[key].file];
  return entry ? { url: entry.og, width: 1200, height: 630 } : null;
}
