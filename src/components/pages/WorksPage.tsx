import { getBeforeAfterPairs, getGalleryImages, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fmt } from "@/lib/format";
import { crumbsFor } from "@/lib/page-meta";
import { BeforeAfterSlider } from "@/components/before-after/BeforeAfterSlider";
import { Gallery } from "@/components/gallery/Gallery";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, Section, SectionHeader } from "@/components/ui/Section";

export function WorksPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.works;
  const crumbs = crumbsFor(locale, "works");
  const images = getGalleryImages(locale, (category) => fmt(dict.gallery.genericAlt, { category: dict.gallery.categories[category] }));
  const pairs = getBeforeAfterPairs()
    .map((p) => ({ ...p, before: getImage(p.before, locale), after: getImage(p.after, locale) }))
    .filter((p) => p.before && p.after);

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "works" }} current="works" schema={[crumbs.schema]}>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />} />

      {pairs.length > 0 && (
        <Section labelledBy="before-after-title">
          <SectionHeader id="before-after-title" title={t.beforeAfterTitle} lead={t.beforeAfterLead} />
          <div className="grid gap-8 lg:grid-cols-2">
            {pairs.map((p) => (
              <BeforeAfterSlider
                key={p.id}
                id={p.id}
                before={p.before!}
                after={p.after!}
                title={p.title[locale]}
                labels={dict.beforeAfter}
              />
            ))}
          </div>
        </Section>
      )}

      <Section tone={pairs.length ? "mist" : "white"}>
        <Gallery images={images} labels={dict.gallery} />
      </Section>

      <FinalCta locale={locale} />
    </PageShell>
  );
}
