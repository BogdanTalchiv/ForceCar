import type { ServiceId } from "@/config/services";

export interface ServiceContent {
  /** Denumirea scurtă (meniu, carduri, formular). */
  name: string;
  short: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  symptoms: string[];
  checks: string[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  safety?: string;
}

export type ServiceContentMap = Record<ServiceId, ServiceContent>;
