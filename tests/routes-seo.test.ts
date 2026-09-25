import { describe, expect, it } from "vitest";
import { enabledServices } from "@/config/services";
import { articles } from "@/content/articles";
import { locales } from "@/i18n/config";
import { localizedPaths, resolveSection, sectionSegments, type SectionKey } from "@/i18n/routes";
import { businessNode } from "@/lib/schema";
import { alternatesFor, buildMetadata } from "@/lib/seo";

describe("rute localizate", () => {
  it("fiecare segment se rezolvă înapoi la secțiunea lui", () => {
    for (const locale of locales) {
      for (const key of Object.keys(sectionSegments) as SectionKey[]) {
        expect(resolveSection(locale, sectionSegments[key][locale])).toBe(key);
      }
    }
  });
  it("segmentele și sluguri sunt unice per limbă și URL-safe", () => {
    for (const locale of locales) {
      const segs = Object.values(sectionSegments).map((s) => s[locale]);
      expect(new Set(segs).size).toBe(segs.length);
      const slugs = enabledServices.map((s) => s.slugs[locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const s of [...segs, ...slugs]) expect(s).toMatch(/^[a-z0-9-]+$/);
    }
  });
  it("articolele au traduceri complete", () => {
    for (const a of articles) {
      for (const locale of locales) {
        const t = a.translations[locale];
        expect(t, `${a.id}/${locale}`).toBeDefined();
        expect(t!.slug).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });
});

describe("SEO", () => {
  it("hreflang include toate limbile și x-default", () => {
    const { languages } = alternatesFor({ type: "page", key: "home" });
    expect(Object.keys(languages).sort()).toEqual(["en", "it", "ro", "ru", "x-default"]);
    expect(languages["x-default"]).toBe("/");
  });
  it("canonical corespunde limbii paginii", () => {
    const s = enabledServices[0];
    const m = buildMetadata({ locale: "it", ref: { type: "service", id: s.id, slugs: s.slugs }, title: "T", description: "D" });
    expect(m.alternates?.canonical).toBe(localizedPaths({ type: "service", id: s.id, slugs: s.slugs }).it);
  });
  it("JSON-LD nu conține date neconfigurate", () => {
    const node = businessNode("ro") as Record<string, unknown>;
    expect(node["@type"]).toBe("AutoRepair");
    for (const key of ["aggregateRating", "review", "priceRange"]) expect(node).not.toHaveProperty(key);
    const json = JSON.stringify(node);
    expect(json).not.toContain("null");
    expect(json).not.toContain("undefined");
  });
});
