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
 * Dacă o imagine lipsește, site-ul afișează un fallback grafic controlat (nu imagine spartă).
 */
import type { Locale, Localized } from "@/i18n/config";
import manifestJson from "./generated/image-manifest.json";

export type GalleryCategory = "engine" | "timing" | "brakes" | "mechanical" | "bodywork" | "paint";

interface ManifestEntry {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  og: string;
  bytes: number;
}

const manifest = manifestJson as Record<string, ManifestEntry>;

interface ImageDef {
  file: string;
  alt: Localized;
  /** CSS object-position — păstrează în cadru mecanicul / zona reparată la decupare. */
  focal: string;
  category?: GalleryCategory;
}

const images = {
  hero: {
    file: "hero/forcecar-service-auto-chisinau-hero.webp",
    focal: "40% 40%",
    category: "engine",
    alt: {
      ro: "Mecanic ForceCar lucrând la motorul unui automobil în atelierul service-ului auto din Chișinău",
      ru: "Механик ForceCar ремонтирует двигатель автомобиля в автосервисе в Кишинёве",
      it: "Meccanico ForceCar al lavoro sul motore di un'auto nell'officina di Chișinău",
      en: "ForceCar mechanic working on a car engine in the Chișinău workshop",
    },
  },
  mechanicsUnderCar: {
    file: "workshop/forcecar-mecanici-sub-masina.webp",
    focal: "50% 45%",
    category: "mechanical",
    alt: {
      ro: "Doi mecanici verificând suspensia și partea de jos a unui automobil ridicat pe elevator",
      ru: "Два механика проверяют подвеску и днище автомобиля на подъёмнике",
      it: "Due meccanici controllano sospensioni e sottoscocca di un'auto sul ponte sollevatore",
      en: "Two mechanics inspecting the suspension and underside of a car on a lift",
    },
  },
  timingBelt: {
    file: "timing/forcecar-curea-distributie.webp",
    focal: "50% 45%",
    category: "timing",
    alt: {
      ro: "Mecanic montând cureaua de distribuție și rolele pe motorul unui automobil",
      ru: "Механик устанавливает ремень ГРМ и ролики на двигатель автомобиля",
      it: "Meccanico che monta la cinghia di distribuzione e i rulli sul motore",
      en: "Mechanic fitting a timing belt and rollers on a car engine",
    },
  },
  timingRollers: {
    file: "timing/forcecar-distributie-role-rulmenti.webp",
    focal: "62% 45%",
    category: "timing",
    alt: {
      ro: "Role de distribuție, rulmenți și componente mecanice pregătite pentru montaj",
      ru: "Ролики ГРМ, подшипники и механические детали, подготовленные к установке",
      it: "Rulli della distribuzione, cuscinetti e componenti meccanici pronti per il montaggio",
      en: "Timing belt rollers, bearings and mechanical components ready for fitting",
    },
  },
  engineBlock: {
    file: "engine/forcecar-bloc-motor.webp",
    focal: "50% 50%",
    category: "engine",
    alt: {
      ro: "Bloc motor curățat, pregătit pentru reparație în atelier",
      ru: "Очищенный блок цилиндров, подготовленный к ремонту в мастерской",
      it: "Blocco motore pulito, pronto per la riparazione in officina",
      en: "Cleaned engine block prepared for repair in the workshop",
    },
  },
  brakes: {
    file: "brakes/forcecar-reparatie-frane.webp",
    focal: "50% 45%",
    category: "brakes",
    alt: {
      ro: "Mecanic ForceCar verificând discul și etrierul de frână al unui automobil",
      ru: "Механик ForceCar проверяет тормозной диск и суппорт автомобиля",
      it: "Meccanico ForceCar che controlla disco e pinza del freno di un'auto",
      en: "ForceCar mechanic checking a car's brake disc and caliper",
    },
  },
  collisionRepair: {
    file: "bodywork/forcecar-reparatie-dupa-accident.webp",
    focal: "55% 50%",
    category: "bodywork",
    alt: {
      ro: "Mecanic reparând caroseria unui automobil avariat după un accident, pe standul de îndreptare",
      ru: "Мастер восстанавливает кузов автомобиля после ДТП на стапеле",
      it: "Carrozziere che ripara un'auto incidentata sul banco di raddrizzatura",
      en: "Technician repairing a collision-damaged car on a frame straightening bench",
    },
  },
  bodyPrep: {
    file: "bodywork/forcecar-pregatire-caroserie.webp",
    focal: "40% 45%",
    category: "paint",
    alt: {
      ro: "Tehnician șlefuind un panou de caroserie înainte de vopsire",
      ru: "Мастер шлифует кузовную панель перед покраской",
      it: "Tecnico che carteggia un pannello della carrozzeria prima della verniciatura",
      en: "Technician sanding a body panel before painting",
    },
  },
  paintBooth: {
    file: "paint/forcecar-vopsitorie-auto.webp",
    focal: "45% 50%",
    category: "paint",
    alt: {
      ro: "Vopsitor auto aplicând vopsea pe o ușă de automobil în cabina de vopsire",
      ru: "Маляр наносит краску на дверь автомобиля в покрасочной камере",
      it: "Verniciatore che applica la vernice sulla portiera di un'auto in cabina di verniciatura",
      en: "Painter spraying a car door inside a paint booth",
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
  hero: "hero",
  about: "mechanicsUnderCar",
  workshop: ["mechanicsUnderCar", "hero"],
  finalCta: "timingBelt",
  services: {
    diagnostics: "hero",
    engine: "engineBlock",
    timing: "timingBelt",
    brakes: "brakes",
    suspension: "mechanicsUnderCar",
    mechanical: "timingRollers",
    bodywork: "collisionRepair",
    paint: "paintBooth",
  },
  engine: ["engineBlock", "hero"],
  timing: ["timingBelt", "timingRollers"],
  brakes: ["brakes"],
  mechanical: ["mechanicsUnderCar", "timingRollers"],
  bodywork: ["collisionRepair", "bodyPrep"],
  paint: ["paintBooth", "bodyPrep"],
  parts: ["timingRollers"],
  gallery: [
    "engineBlock",
    "timingBelt",
    "brakes",
    "collisionRepair",
    "paintBooth",
    "mechanicsUnderCar",
    "bodyPrep",
    "timingRollers",
    "hero",
  ],
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
    });
  }
  return [...configured, ...extra];
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
