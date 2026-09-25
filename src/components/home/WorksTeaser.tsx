import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImages } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";
import { Section, SectionHeader } from "@/components/ui/Section";

export function WorksTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.works;
  const images = getImages(["collisionRepair", "timingBelt", "brakes", "paintBooth", "engineBlock"], locale);
  const worksHref = pagePath(locale, "works");

  return (
    <Section tone="mist" labelledBy="works-title">
      <SectionHeader
        id="works-title"
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        action={
          <Link href={worksHref} className={buttonClasses({ variant: "outline" })}>
            {dict.cta.viewWorks}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        }
      />
      <ul className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] lg:grid-cols-4 lg:gap-4">
        {images.map((img, i) => (
          <li key={img.id} className={`relative overflow-hidden rounded-lg bg-ink-800 ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
            <Link href={worksHref} className="group block size-full" aria-label={`${dict.cta.viewWorks}: ${img.alt}`}>
              <FcImage
                image={img}
                fill
                quality={60}
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {img.category && (
                <span className="absolute bottom-3 left-3 rounded bg-ink-900/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  {dict.gallery.categories[img.category]}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
