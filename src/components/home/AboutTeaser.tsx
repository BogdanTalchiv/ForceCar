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
    <section aria-labelledby="about-title" className="relative overflow-hidden bg-ink-900 py-16 text-white sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/forcecar/_og/background2.png"
          alt=""
          fill
          quality={75}
          sizes="100vw"
          className="object-cover object-[82%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink-900 from-0% via-ink-900/70 via-38% to-ink-900/20 lg:via-ink-900/40 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-ink-900/35" />
      </div>
      <div className="container-fc relative pb-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{t.eyebrow}</p>
            <h2 id="about-title" className="text-h2 font-extrabold text-balance">
              {fmt(t.title, { years })}
            </h2>
            {t.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-lead text-steel-300">
                {fmt(p, { years })}
              </p>
            ))}
            <Link href={pagePath(locale, "about")} className={buttonClasses({ variant: "onDark", className: "mt-8" })}>
              {dict.cta.about}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-800 shadow-float ring-1 ring-white/10">
              <FcImage image={image} fill quality={72} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div className="absolute -bottom-6 left-5 rounded-lg bg-ink-900 px-6 py-5 text-white shadow-float ring-1 ring-white/10 sm:left-8">
              <p className="text-4xl leading-none font-extrabold">
                {years}
                <span className="text-brand">+</span>
              </p>
              <p className="mt-1.5 text-sm font-semibold text-steel-300">{dict.common.experience.replace("{years}+ ", "")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
