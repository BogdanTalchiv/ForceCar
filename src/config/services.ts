/**
 * ForceCar — CONFIGURAȚIA SERVICIILOR.
 *
 * `enabled: false` ascunde complet serviciul: pagina, meniul, sitemap-ul, schema,
 * formularul de programare și asistentul AI. Textele sunt în src/content/services/<limba>.ts.
 *
 * ⚠ OWNER: confirmă lista serviciilor. Au fost activate serviciile ilustrate în fotografiile
 *   și pe panoul ForceCar (diagnoză, mecanică, motor, distribuție, frâne, suspensie,
 *   caroserie, vopsitorie). Dezactivează orice serviciu pe care nu îl oferiți.
 */
import type { Locale, Localized } from "@/i18n/config";
import type { GalleryCategory, ImageKey } from "./forcecar-images";
import { forceCarImages } from "./forcecar-images";

export type ServiceId =
  | "diagnostics"
  | "engine"
  | "timing"
  | "brakes"
  | "suspension"
  | "mechanical"
  | "bodywork"
  | "paint";

export type ServiceIcon = "diagnostics" | "engine" | "timing" | "brakes" | "suspension" | "mechanical" | "bodywork" | "paint";

export interface ServiceConfig {
  id: ServiceId;
  enabled: boolean;
  group: "mechanical" | "body";
  icon: ServiceIcon;
  slugs: Localized;
  image: ImageKey;
  photos: readonly ImageKey[];
  galleryCategory: GalleryCategory;
  related: ServiceId[];
  /** Denumire în engleză pentru schema.org `serviceType`. */
  schemaType: string;
}

export const services: ServiceConfig[] = [
  {
    id: "diagnostics",
    enabled: true,
    group: "mechanical",
    icon: "diagnostics",
    slugs: {
      ro: "diagnostica-auto-chisinau",
      ru: "diagnostika-avto-kishinev",
      it: "diagnosi-auto-chisinau",
      en: "car-diagnostics-chisinau",
    },
    image: forceCarImages.services.diagnostics,
    photos: forceCarImages.workshop,
    galleryCategory: "mechanical",
    related: ["engine", "mechanical", "brakes"],
    schemaType: "Car diagnostics",
  },
  {
    id: "engine",
    enabled: true,
    group: "mechanical",
    icon: "engine",
    slugs: {
      ro: "reparatie-motor-chisinau",
      ru: "remont-dvigatelya-kishinev",
      it: "riparazione-motore-chisinau",
      en: "engine-repair-chisinau",
    },
    image: forceCarImages.services.engine,
    photos: forceCarImages.engine,
    galleryCategory: "engine",
    related: ["timing", "diagnostics", "mechanical"],
    schemaType: "Engine repair",
  },
  {
    id: "timing",
    enabled: true,
    group: "mechanical",
    icon: "timing",
    slugs: {
      ro: "distributie-auto-chisinau",
      ru: "zamena-grm-kishinev",
      it: "cinghia-distribuzione-chisinau",
      en: "timing-belt-replacement-chisinau",
    },
    image: forceCarImages.services.timing,
    photos: forceCarImages.timing,
    galleryCategory: "timing",
    related: ["engine", "mechanical", "diagnostics"],
    schemaType: "Timing belt and chain replacement",
  },
  {
    id: "brakes",
    enabled: true,
    group: "mechanical",
    icon: "brakes",
    slugs: {
      ro: "reparatie-frane-chisinau",
      ru: "remont-tormozov-kishinev",
      it: "riparazione-freni-chisinau",
      en: "brake-repair-chisinau",
    },
    image: forceCarImages.services.brakes,
    photos: forceCarImages.brakes,
    galleryCategory: "brakes",
    related: ["suspension", "mechanical", "diagnostics"],
    schemaType: "Brake repair",
  },
  {
    id: "suspension",
    enabled: true,
    group: "mechanical",
    icon: "suspension",
    slugs: {
      ro: "reparatie-suspensie-directie-chisinau",
      ru: "remont-hodovoy-kishinev",
      it: "riparazione-sospensioni-sterzo-chisinau",
      en: "suspension-steering-repair-chisinau",
    },
    image: forceCarImages.services.suspension,
    photos: forceCarImages.mechanical,
    galleryCategory: "mechanical",
    related: ["brakes", "mechanical", "diagnostics"],
    schemaType: "Suspension and steering repair",
  },
  {
    id: "mechanical",
    enabled: true,
    group: "mechanical",
    icon: "mechanical",
    slugs: {
      ro: "mecanica-auto-chisinau",
      ru: "slesarnyy-remont-avto-kishinev",
      it: "meccanica-auto-chisinau",
      en: "car-mechanic-chisinau",
    },
    image: forceCarImages.services.mechanical,
    photos: forceCarImages.parts,
    galleryCategory: "mechanical",
    related: ["diagnostics", "brakes", "suspension"],
    schemaType: "General car mechanics and maintenance",
  },
  {
    id: "bodywork",
    enabled: true,
    group: "body",
    icon: "bodywork",
    slugs: {
      ro: "reparatie-caroserie-chisinau",
      ru: "kuzovnoy-remont-kishinev",
      it: "carrozzeria-chisinau",
      en: "car-body-repair-chisinau",
    },
    image: forceCarImages.services.bodywork,
    photos: forceCarImages.bodywork,
    galleryCategory: "bodywork",
    related: ["paint", "diagnostics", "suspension"],
    schemaType: "Auto body and collision repair",
  },
  {
    id: "paint",
    enabled: true,
    group: "body",
    icon: "paint",
    slugs: {
      ro: "vopsitorie-auto-chisinau",
      ru: "pokraska-avto-kishinev",
      it: "verniciatura-auto-chisinau",
      en: "car-painting-chisinau",
    },
    image: forceCarImages.services.paint,
    photos: forceCarImages.paint,
    galleryCategory: "paint",
    related: ["bodywork", "diagnostics", "mechanical"],
    schemaType: "Car painting",
  },
];

export const enabledServices = services.filter((s) => s.enabled);

export function getService(id: string): ServiceConfig | undefined {
  return enabledServices.find((s) => s.id === id);
}

export function getServiceBySlug(locale: Locale, slug: string): ServiceConfig | undefined {
  return enabledServices.find((s) => s.slugs[locale] === slug);
}

export function isServiceId(value: unknown): value is ServiceId {
  return typeof value === "string" && enabledServices.some((s) => s.id === value);
}
