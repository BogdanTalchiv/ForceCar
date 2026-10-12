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
    file: "workshop/atelier-01.jpg",
    focal: "38% 48%",
    category: "bodywork",
    alt: {
      ro: "Automobil pe standul de îndreptare a caroseriei, în atelierul ForceCar",
      ru: "Автомобиль на стапеле для правки кузова в мастерской ForceCar",
      it: "Auto sul banco di raddrizzatura della carrozzeria in officina ForceCar",
      en: "Car on a body-alignment bench in the ForceCar workshop",
    },
  },
  diagnostica: {
    file: "homepage/diagnostica-auto.webp",
    focal: "52% 42%",
    category: "mechanical",
    alt: {
      ro: "Diagnostică auto: calculator de diagnoză pe motor, cu multimetru în mână",
      ru: "Компьютерная диагностика: ноутбук на двигателе и мультиметр в руке",
      it: "Diagnosi auto: computer di diagnosi sul motore, con tester in mano",
      en: "Car diagnostics: a scan laptop on the engine, with a multimeter in hand",
    },
  },
  motor: {
    file: "workshop/bloc-motor.webp",
    focal: "48% 46%",
    category: "engine",
    alt: {
      ro: "Bloc motor pe stand, în atelierul ForceCar",
      ru: "Блок двигателя на стенде в мастерской ForceCar",
      it: "Blocco motore sul banco in officina ForceCar",
      en: "Engine block on a stand in the ForceCar workshop",
    },
  },
  distributie: {
    file: "homepage/schimb-distributie.webp",
    focal: "50% 48%",
    category: "timing",
    alt: {
      ro: "Lanț, role și pinioane de distribuție, detaliu din motor",
      ru: "Цепь ГРМ, ролики и шестерни — деталь двигателя",
      it: "Catena, rulli e pignoni della distribuzione, dettaglio del motore",
      en: "Timing chain, sprockets and guides, a close-up of the engine",
    },
  },
  frane: {
    file: "homepage/reparatii-frane.webp",
    focal: "68% 48%",
    category: "brakes",
    alt: {
      ro: "Disc de frână demontat, ținut în mână în timpul verificării",
      ru: "Снятый тормозной диск в руках во время проверки",
      it: "Disco freno smontato, tenuto in mano durante il controllo",
      en: "A removed brake disc held in the hand during inspection",
    },
  },
  suspensie: {
    file: "homepage/suspensie-directie.webp",
    focal: "40% 32%",
    category: "mechanical",
    alt: {
      ro: "Sistem de suspensie și direcție: amortizoare, brațe și cremalieră",
      ru: "Подвеска и рулевое: амортизаторы, рычаги и рулевая рейка",
      it: "Sospensioni e sterzo: ammortizzatori, bracci e scatola sterzo",
      en: "Suspension and steering: shock absorbers, control arms and rack",
    },
  },
  mecanica: {
    file: "workshop/atelier-04.jpg",
    focal: "48% 40%",
    category: "mechanical",
    alt: {
      ro: "Mecanici la lucru sub un automobil ridicat pe elevator",
      ru: "Механики работают под автомобилем на подъёмнике",
      it: "Meccanici al lavoro sotto un'auto sul ponte sollevatore",
      en: "Mechanics working under a car on a lift",
    },
  },
  caroserie: {
    file: "homepage/caroserie-tinichigerie.webp",
    focal: "48% 42%",
    category: "bodywork",
    alt: {
      ro: "Tinichigerie: tehnician lucrează la caroseria avariată a unui automobil",
      ru: "Жестяные работы: мастер ремонтирует повреждённый кузов",
      it: "Lattoneria: un tecnico lavora sulla carrozzeria danneggiata",
      en: "Panel work: a technician repairing a damaged car body",
    },
  },
  vopsitorie: {
    file: "homepage/vopsitorie-auto.webp",
    focal: "42% 48%",
    category: "paint",
    alt: {
      ro: "Vopsitorie auto: aplicarea vopselei pe portieră, în cabina de vopsire",
      ru: "Покраска авто: нанесение краски на дверь в окрасочной камере",
      it: "Verniciatura auto: applicazione della vernice sulla portiera in cabina",
      en: "Car painting: spraying paint onto a door in the paint booth",
    },
  },
  despreAtelier: {
    file: "workshop/atelier-13.jpg",
    focal: "42% 40%",
    category: "paint",
    alt: {
      ro: "Tehnician ForceCar șlefuiește un element de caroserie, pregătire pentru vopsire",
      ru: "Техник ForceCar шлифует деталь кузова перед покраской",
      it: "Tecnico ForceCar che carteggia un pannello, preparazione alla verniciatura",
      en: "ForceCar technician sanding a body panel, preparing it for paint",
    },
  },
  ctaAtelier: {
    file: "workshop/atelier-20.jpg",
    focal: "50% 48%",
    category: "bodywork",
    alt: {
      ro: "Mercedes cu avarie laterală și spate, pregătit pentru reparația de caroserie",
      ru: "Mercedes с боковым и задним повреждением, подготовлен к ремонту кузова",
      it: "Mercedes con danno laterale e posteriore, pronta per la riparazione",
      en: "Mercedes with side and rear damage, ready for body repair",
    },
  },
  lucrareCaroserie: {
    file: "homepage/caroserie-reparata-atelier.webp",
    focal: "38% 48%",
    category: "bodywork",
    alt: {
      ro: "Caroserie reparată în atelier: îndreptarea unei uși pe un automobil albastru",
      ru: "Кузовной ремонт в мастерской: правка двери синего автомобиля",
      it: "Carrozzeria riparata in officina: raddrizzatura di una portiera su un'auto blu",
      en: "Bodywork in the workshop: dent repair on the door of a blue car",
    },
  },
  lucrareVopsitorie: {
    file: "homepage/vopsitorie-cabina-forcecar.webp",
    focal: "42% 48%",
    category: "paint",
    alt: {
      ro: "Vopsitorie realizată în cabina ForceCar: aplicarea vopselei pe un automobil mascat",
      ru: "Покраска в камере ForceCar: нанесение краски на закрытый автомобиль",
      it: "Verniciatura in cabina ForceCar: applicazione della vernice su un'auto mascherata",
      en: "Paintwork in the ForceCar booth: spraying a masked car",
    },
  },
  lucrarePregatire: {
    file: "homepage/vopsitorie-cabina-forcecar-3.webp",
    focal: "48% 48%",
    category: "paint",
    alt: {
      ro: "Vopsitorie în cabina ForceCar: aplicarea vopselei pe un automobil roșu",
      ru: "Покраска в камере ForceCar: нанесение краски на красный автомобиль",
      it: "Verniciatura in cabina ForceCar: applicazione della vernice su un'auto rossa",
      en: "Paintwork in the ForceCar booth: spraying a red car",
    },
  },
  lucrareBara: {
    file: "homepage/caroserie-reparata-atelier-2.webp",
    focal: "52% 46%",
    category: "bodywork",
    alt: {
      ro: "Caroserie în atelier: pregătirea aripii înainte de vopsire",
      ru: "Кузов в мастерской: подготовка крыла перед покраской",
      it: "Carrozzeria in officina: preparazione del parafango prima della verniciatura",
      en: "Bodywork in the workshop: preparing a wing before painting",
    },
  },
  lucrareAripa: {
    file: "workshop/atelier-12.jpg",
    focal: "50% 50%",
    category: "bodywork",
    alt: {
      ro: "Aripă deteriorată, detaliu din reparația de caroserie",
      ru: "Повреждённое крыло, деталь кузовного ремонта",
      it: "Parafrango danneggiato, dettaglio della riparazione carrozzeria",
      en: "Damaged wing, a detail from body repair",
    },
  },
  lucrareHaion: {
    file: "workshop/atelier-11.jpg",
    focal: "48% 45%",
    category: "bodywork",
    alt: {
      ro: "Mercedes cu avarie față și haionul deschis, în atelier",
      ru: "Mercedes с повреждением переда и открытым багажником",
      it: "Mercedes con danno anteriore e portellone aperto in officina",
      en: "Mercedes with front damage and the boot open, in the workshop",
    },
  },
  lucrareImpact: {
    file: "workshop/atelier-05.jpg",
    focal: "40% 42%",
    category: "engine",
    alt: {
      ro: "Porsche cu capota deschisă, compartimentul motor vizibil în atelier",
      ru: "Porsche с открытым капотом, моторный отсек виден в мастерской",
      it: "Porsche con cofano aperto, vano motore visibile in officina",
      en: "Porsche with the bonnet open and the engine bay visible in the workshop",
    },
  },
  bmwCaroserieBefore: {
    file: "results/bmw-caroserie-inainte.jpg",
    focal: "50% 48%",
    category: "bodywork",
    alt: {
      ro: "BMW în atelier, înainte de reparația de caroserie: ușa demontată, structura laterală deschisă",
      ru: "BMW в мастерской до ремонта кузова: дверь снята, боковая структура открыта",
      it: "BMW in officina prima della riparazione della carrozzeria: portiera smontata, struttura laterale aperta",
      en: "BMW in the workshop before body repair: door removed, side structure exposed",
    },
  },
  bmwCaroserieAfter: {
    file: "results/bmw-caroserie-dupa.jpg",
    focal: "48% 52%",
    category: "bodywork",
    alt: {
      ro: "Același BMW după reparația de caroserie, parcat în fața service-ului ForceCar",
      ru: "Тот же BMW после ремонта кузова, припаркован у сервиса ForceCar",
      it: "La stessa BMW dopo la riparazione della carrozzeria, parcheggiata davanti a ForceCar",
      en: "The same BMW after body repair, parked in front of the ForceCar workshop",
    },
  },
  recenzieBmw: {
    file: "reviews/bmw-3.webp",
    focal: "50% 72%",
    alt: {
      ro: "BMW Seria 3 roșu, parcat în fața service-ului ForceCar din Chișinău",
      ru: "Красный BMW 3 серии у сервиса ForceCar в Кишинёве",
      it: "BMW Serie 3 rossa parcheggiata davanti all'officina ForceCar a Chișinău",
      en: "Red BMW 3 Series parked in front of the ForceCar workshop in Chișinău",
    },
  },
  recenzieVolvo: {
    file: "reviews/volvo-s90.webp",
    focal: "48% 48%",
    alt: {
      ro: "Volvo alb după lucrarea de la ForceCar",
      ru: "Белый Volvo после работы в ForceCar",
      it: "Volvo bianca dopo il lavoro da ForceCar",
      en: "White Volvo after work at ForceCar",
    },
  },
  recenzieFiat: {
    file: "reviews/fiat-500.webp",
    focal: "42% 58%",
    alt: {
      ro: "Fiat 500 roșie pe elevator, în atelier",
      ru: "Красный Fiat 500 на подъёмнике в мастерской",
      it: "Fiat 500 rossa sul sollevatore in officina",
      en: "Red Fiat 500 on a lift in the workshop",
    },
  },
  sfatDistributie: {
    file: "homepage/sfat-curea-distributie.webp",
    focal: "52% 48%",
    category: "timing",
    alt: {
      ro: "Curea de distribuție uzată, cu fire desfăcute pe rolă",
      ru: "Изношенный ремень ГРМ с растрёпанными нитями на ролике",
      it: "Cinghia di distribuzione usurata, con fili sfilacciati sul rullo",
      en: "A worn timing belt with frayed fibres on the pulley",
    },
  },
  sfatFrane: {
    file: "homepage/sfat-placute-frana.webp",
    focal: "58% 46%",
    category: "brakes",
    alt: {
      ro: "Plăcuțe de frână uzate, ținute lângă discul de frână",
      ru: "Изношенные тормозные колодки рядом с тормозным диском",
      it: "Pastiglie dei freni usurate, tenute accanto al disco",
      en: "Worn brake pads held next to the brake disc",
    },
  },
  sfatCheckEngine: {
    file: "homepage/sfat-check-engine.webp",
    focal: "48% 46%",
    category: "mechanical",
    alt: {
      ro: "Diagnostică la volan: tabletă de diagnoză conectată în habitaclu",
      ru: "Диагностика за рулём: планшет подключен в салоне",
      it: "Diagnosi al volante: tablet di diagnosi collegato in abitacolo",
      en: "In-car diagnostics: a scan tablet connected in the cabin",
    },
  },
  vulcanizareBalans: {
    file: "homepage/vulcanizare-echilibrare.webp",
    focal: "50% 62%",
    alt: {
      ro: "Roată pe mașina de echilibrat, în vulcanizare",
      ru: "Колесо на балансировочном станке в шиномонтаже",
      it: "Ruota sull'equilibratrice, dal gommista",
      en: "A wheel on the balancing machine in the tire shop",
    },
  },
  vulcanizareStoc: {
    file: "homepage/vulcanizare-depozit.webp",
    focal: "50% 48%",
    alt: {
      ro: "Anvelope stivuite pe rafturi, în depozitul de vulcanizare",
      ru: "Шины на стеллажах на складе шиномонтажа",
      it: "Pneumatici impilati sugli scaffali nel magazzino del gommista",
      en: "Tires stacked on racks in the tire-shop storage",
    },
  },
  vulcanizareMontaj: {
    file: "homepage/vulcanizare-montaj.webp",
    focal: "28% 42%",
    alt: {
      ro: "Tehnician montează o anvelopă pe mașina de vulcanizare",
      ru: "Техник устанавливает шину на шиномонтажном станке",
      it: "Tecnico che monta uno pneumatico sulla macchina del gommista",
      en: "A technician fitting a tire on the tire-changing machine",
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
  about: "despreAtelier",
  workshop: ["lucrareAripa", "lucrareHaion", "lucrareImpact"],
  finalCta: "ctaAtelier",
  services: {
    diagnostics: "diagnostica",
    engine: "motor",
    timing: "distributie",
    brakes: "frane",
    suspension: "suspensie",
    mechanical: "mecanica",
    bodywork: "caroserie",
    paint: "vopsitorie",
  },
  engine: ["motor"],
  timing: ["distributie"],
  brakes: ["frane"],
  suspension: ["suspensie"],
  mechanical: ["mecanica"],
  bodywork: ["caroserie", "lucrareCaroserie", "lucrareBara"],
  paint: ["vopsitorie", "lucrareVopsitorie", "lucrarePregatire"],
  parts: ["mecanica"],
  vulcanizare: ["vulcanizareBalans", "vulcanizareStoc", "vulcanizareMontaj"],
  gallery: [
    "fatada",
    "motor",
    "mecanica",
    "despreAtelier",
    "lucrareAripa",
    "lucrareHaion",
    "lucrareImpact",
  ],
  beforeAfter: [
    {
      id: "bmw-caroserie",
      serviceId: "bodywork",
      before: "bmwCaroserieBefore",
      after: "bmwCaroserieAfter",
      title: {
        ro: "Reparație caroserie BMW",
        ru: "Ремонт кузова BMW",
        it: "Riparazione carrozzeria BMW",
        en: "BMW body repair",
      },
    },
  ] as BeforeAfterPair[],
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

/** Sursele Înainte/După — nu le mai arătăm și în grila Lucrări. */
const GALLERY_SKIP_FILES = new Set(["workshop/atelier-14.jpg", "workshop/atelier-19.jpg"]);

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
    if (knownFiles.has(file) || GALLERY_SKIP_FILES.has(file)) continue;
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
  const seen = new Set<string>();
  const unique: ResolvedImage[] = [];
  for (const img of [...configured, ...extra]) {
    if (seen.has(img.src)) continue;
    seen.add(img.src);
    unique.push(img);
  }
  return unique;
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
