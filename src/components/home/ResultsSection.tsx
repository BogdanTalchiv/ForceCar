import { getBeforeAfterPairs, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ResultsShowcase, type ResultSlide } from "@/components/home/ResultsShowcase";
import { TechSurface } from "@/components/ui/TechSurface";

export function ResultsSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.results;
  const pairs = getBeforeAfterPairs()
    .map((p) => ({ ...p, before: getImage(p.before, locale), after: getImage(p.after, locale) }))
    .filter((p) => p.before && p.after);
  const preview = getImage("caroserie", locale);

  const slides: ResultSlide[] =
    pairs.length > 0
      ? pairs.map((p) => ({
          id: p.id,
          title: p.title[locale],
          before: p.before!,
          after: p.after!,
        }))
      : preview
        ? [{ id: "preview-collision", title: t.title, preview, notice: t.previewNotice }]
        : [];

  if (slides.length === 0) return null;

  return (
    <TechSurface variant="blueprint" labelledBy="results-title" tone="dark">
      <ResultsShowcase
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        slides={slides}
        labels={{ ...dict.beforeAfter, prev: dict.gallery.prev, next: dict.gallery.next }}
      />
    </TechSurface>
  );
}
