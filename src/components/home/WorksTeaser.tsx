import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImage, type GalleryCategory, type ImageKey } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/Section";

const teaserCases: { image: ImageKey; category: Exclude<GalleryCategory, "video"> }[] = [
  { image: "caroserie", category: "bodywork" },
  { image: "distributie", category: "timing" },
  { image: "frane", category: "brakes" },
  { image: "motor", category: "engine" },
];

export function WorksTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.works;
  const worksHref = pagePath(locale, "works");

  return (
    <section aria-labelledby="works-title" className="bg-ink-950 section-y text-white">
      <div className="container-fc">
        <SectionHeader
          id="works-title"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          dark
          action={
            <Link href={pagePath(locale, "works")} className={buttonClasses({ variant: "onDark" })}>
              {dict.cta.viewWorks}
              <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
            </Link>
          }
        />
        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teaserCases.map((item, i) => {
              const img = getImage(item.image, locale);
              const copy = t.cases[item.category];
              const category = dict.gallery.categories[item.category];
              const featured = i === 0;
              return (
                <li key={item.image} className={featured ? "sm:col-span-2 lg:col-span-3" : ""}>
                  <article className="group relative overflow-hidden rounded-lg bg-ink-800 ring-1 ring-white/10 transition-[ring-color] duration-300 hover:ring-white/25">
                    <Link
                      href={worksHref}
                      className={`relative block overflow-hidden ${featured ? "aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/3]"}`}
                      aria-label={`${t.viewCase}: ${category}. ${copy.result}`}
                    >
                      <FcImage
                        image={img}
                        fill
                        decorative
                        quality={featured ? 72 : 60}
                        sizes={featured ? "100vw" : "(min-width: 1024px) 33vw, 50vw"}
                        className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-ink-950/15 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                        <div className="min-w-0">
                          <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-white/80 uppercase">{category}</p>
                          <p className="mt-1 max-w-md truncate text-sm font-bold text-white opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                            {copy.result}
                          </p>
                        </div>
                        <ArrowRight
                          className="btn-arrow size-5 shrink-0 text-white opacity-80 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
