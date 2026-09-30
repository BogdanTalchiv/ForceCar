import { getBeforeAfterPairs, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { BeforeAfterSlider } from "@/components/before-after/BeforeAfterSlider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/Section";
import { TechSurface } from "@/components/ui/TechSurface";

export function ResultsSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.results;
  const pairs = getBeforeAfterPairs()
    .map((p) => ({ ...p, before: getImage(p.before, locale), after: getImage(p.after, locale) }))
    .filter((p) => p.before && p.after);
  const preview = getImage("collisionRepair", locale);

  return (
    <TechSurface variant="blueprint" labelledBy="results-title" tone="mist">
      <SectionHeader id="results-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Reveal>
        {pairs.length > 0 ? (
          <div className={`grid gap-8 ${pairs.length > 1 ? "lg:grid-cols-2" : ""}`}>
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
        ) : (
          preview && (
            <BeforeAfterSlider
              id="preview-collision"
              preview={preview}
              title={t.title}
              labels={dict.beforeAfter}
              notice={t.previewNotice}
            />
          )
        )}
      </Reveal>
    </TechSurface>
  );
}
