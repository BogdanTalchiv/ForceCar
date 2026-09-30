import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { forceCarImages, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { fmt } from "@/lib/format";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";

export function AboutTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.about;
  const years = business.experienceYears;
  const image = getImage(forceCarImages.about, locale);

  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden bg-ink-900 section-y text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/forcecar/_og/background2.png"
          alt=""
          fill
          quality={72}
          sizes="100vw"
          className="object-cover object-[82%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink-900 from-0% via-ink-900/78 via-42% to-ink-900/25 lg:via-ink-900/50 lg:to-transparent" />
      </div>
      <div className="container-fc relative pb-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="lg:pr-6">
            <p className="eyebrow mb-3">{t.eyebrow}</p>
            <h2 id="about-title" className="text-h2 font-extrabold text-balance">
              {fmt(t.title, { years })}
            </h2>
            {t.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 max-w-[38rem] text-lead text-steel-300">
                {fmt(p, { years })}
              </p>
            ))}
            <Link href={pagePath(locale, "about")} className={buttonClasses({ variant: "onDark", className: "mt-8" })}>
              {dict.cta.about}
              <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="relative lg:-ml-4 lg:translate-x-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-800 ring-1 ring-white/10">
              <FcImage image={image} fill quality={72} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div className="absolute -bottom-5 left-3 bg-ink-950 px-5 py-4 text-white ring-1 ring-white/12 sm:left-0 sm:-translate-x-4">
              <p className="text-[2.75rem] leading-none font-extrabold tabular-nums">
                {years}
                <span className="text-brand">+</span>
              </p>
              <p className="mt-1.5 text-[0.6875rem] font-bold tracking-[0.14em] text-steel-300 uppercase">
                {dict.home.hero.stats.experienceLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
