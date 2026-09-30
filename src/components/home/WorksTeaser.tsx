import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImage, type GalleryCategory, type ImageKey } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";
import { SectionHeader } from "@/components/ui/Section";

const teaserCases: { image: ImageKey; category: GalleryCategory }[] = [
  { image: "collisionRepair", category: "bodywork" },
  { image: "timingBelt", category: "timing" },
  { image: "brakes", category: "brakes" },
  { image: "paintBooth", category: "paint" },
];

export function WorksTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.works;
  const worksHref = pagePath(locale, "works");

  return (
    <section aria-labelledby="works-title" className="bg-ink-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="container-fc">
        <SectionHeader
          id="works-title"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          dark
          action={
            <Link href={worksHref} className={buttonClasses({ variant: "onDark" })}>
              {dict.cta.viewWorks}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {teaserCases.map((item) => {
            const img = getImage(item.image, locale);
            const copy = t.cases[item.category];
            return (
              <li key={item.image}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-ink-900 ring-1 ring-white/10 transition-[transform,ring-color] duration-300 hover:-translate-y-0.5 hover:ring-brand/50">
                  <Link href={worksHref} className="flex h-full flex-col" aria-label={`${t.viewCase}: ${dict.gallery.categories[item.category]}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                      <FcImage
                        image={img}
                        fill
                        decorative
                        quality={60}
                        sizes="(min-width: 1024px) 24vw, 50vw"
                        className="transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <span className="absolute top-3 left-3 rounded bg-ink-950/85 px-2.5 py-1 text-xs font-bold tracking-wide text-white uppercase backdrop-blur-sm">
                        {dict.gallery.categories[item.category]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs font-bold tracking-wide text-steel-400 uppercase">{t.problem}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-steel-200">{copy.problem}</p>
                      <p className="mt-4 text-xs font-bold tracking-wide text-steel-400 uppercase">{t.result}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-steel-200">{copy.result}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-white group-hover:text-brand-bright">
                        {t.viewCase}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
