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
  fatada: {
    file: "workshop/atelier-19.jpg",
    focal: "50% 55%",
    category: "mechanical",
    alt: {
      ro: "BMW parcat în fața service-ului auto ForceCar din Chișinău",
      ru: "BMW у здания автосервиса ForceCar в Кишинёве",
      it: "BMW parcheggiata davanti all'officina ForceCar di Chișinău",
      en: "BMW parked in front of the ForceCar workshop in Chișinău",
    },
  },
  diagnostica: {
    file: "workshop/atelier-18.jpg",
    focal: "42% 45%",
    category: "mechanical",
    alt: {
      ro: "Porsche cu capota deschisă și bara demontată, în atelier",
      ru: "Porsche с открытым капотом и снятым бампером в мастерской",
      it: "Porsche con cofano aperto e paraurti smontato in officina",
      en: "Porsche with the bonnet open and bumper removed in the workshop",
    },
  },
  motor: {
    file: "workshop/atelier-09.jpg",
    focal: "45% 42%",
    category: "engine",
    alt: {
      ro: "Motor și structura față a unui Porsche, în lucru în atelier",
      ru: "Двигатель и передняя структура Porsche в работе в мастерской",
      it: "Motore e struttura anteriore di una Porsche in lavorazione",
      en: "Porsche engine and front structure being worked on in the workshop",
    },
  },
  distributie: {
    file: "workshop/atelier-09.jpg",
    focal: "45% 42%",
    category: "timing",
    alt: {
      ro: "Compartimentul motor al unui automobil, deschis pentru intervenție în atelier",
      ru: "Моторный отсек автомобиля, открытый для ремонта в мастерской",
      it: "Vano motore di un'auto aperto per l'intervento in officina",
      en: "Car engine bay opened for workshop work",
    },
  },
  frane: {
    file: "workshop/atelier-14.jpg",
    focal: "58% 62%",
    category: "brakes",
    alt: {
      ro: "Automobil pe standul de îndreptare, cu discul de frână și suspensia vizibile",
      ru: "Автомобиль на стапеле, видны тормозной диск и подвеска",
      it: "Auto sul banco di raddrizzatura, con disco freno e sospensione visibili",
      en: "Car on a frame bench with the brake disc and suspension visible",
    },
  },
  mecanica: {
    file: "workshop/atelier-17.jpg",
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
    file: "workshop/atelier-01.jpg",
    focal: "38% 48%",
    category: "bodywork",
    alt: {
      ro: "Automobil pe standul de îndreptare a caroseriei, în atelier",
      ru: "Автомобиль на стапеле для правки кузова в мастерской",
      it: "Auto sul banco di raddrizzatura della carrozzeria in officina",
      en: "Car on a body-alignment bench in the workshop",
    },
  },
  vopsitorie: {
    file: "workshop/atelier-06.jpg",
    focal: "50% 45%",
    category: "paint",
    alt: {
      ro: "Element de caroserie vopsit în cabina de vopsire",
      ru: "Деталь кузова после покраски в окрасочной камере",
      it: "Elemento di carrozzeria verniciato in cabina di verniciatura",
      en: "Body panel painted inside the paint booth",
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
  hero: "fatada",
  about: "mecanica",
  workshop: ["mecanica", "fatada"],
  finalCta: "fatada",
  services: {
    diagnostics: "diagnostica",
    engine: "motor",
    timing: "distributie",
    brakes: "frane",
    suspension: "mecanica",
    mechanical: "mecanica",
    bodywork: "caroserie",
    paint: "vopsitorie",
  },
  engine: ["motor"],
  timing: ["motor"],
  brakes: ["frane"],
  mechanical: ["mecanica"],
  bodywork: ["caroserie"],
  paint: ["vopsitorie"],
  parts: ["mecanica"],
  gallery: ["caroserie", "vopsitorie", "frane", "motor", "mecanica", "diagnostica", "fatada"],
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
  workshop: "bodywork",
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
