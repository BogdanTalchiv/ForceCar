import Image from "next/image";
import { ArrowUpRight, CircleDot, Disc3, Gauge, Wrench } from "lucide-react";
import { business } from "@/config/business";
import { forceCarImages, getImages } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";

const icons = [CircleDot, Disc3, Gauge, Wrench];

export function VulcanizareTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.vulcanizare;
  const url = business.vulcanizareUrl;
  const photos = getImages(forceCarImages.vulcanizare, locale);

  return (
    <section id="vulcanizare" aria-labelledby="vulcanizare-title" className="relative scroll-mt-24 overflow-hidden bg-ink-900 section-y text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/forcecar/_og/background2.png"
          alt=""
          fill
          quality={72}
          sizes="100vw"
          className="object-cover object-[82%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink-950 from-0% via-ink-950/88 via-48% to-ink-950/55" />
      </div>

      <div className="container-fc relative">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="relative min-w-0 max-w-[36rem]">
            <p className="eyebrow mb-3">{t.eyebrow}</p>
            <h2 id="vulcanizare-title" className="text-h2 font-extrabold text-balance">
              {t.title}
            </h2>
            <p className="mt-5 text-lead text-steel-300">{t.lead}</p>
            <div className="mt-8 flex flex-wrap items-start gap-5">
              <div>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses({ size: "lg" })}
                    data-track-location="home_vulcanizare"
                  >
                    {t.cta}
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                    <span className="sr-only">{dict.a11y.newTab}</span>
                  </a>
                ) : (
                  <>
                    <a href="#vulcanizare" className={buttonClasses({ size: "lg" })} data-track-location="home_vulcanizare">
                      {t.cta}
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </a>
                    <p className="mt-3 max-w-[16.5rem] text-sm leading-relaxed text-steel-400">{t.soon}</p>
                  </>
                )}
              </div>
              {photos.length > 0 && (
                <div className="fc-vulc-reel" aria-hidden="true">
                  {photos.map((image, i) => (
                    <div key={image.id} className={`fc-vulc-reel__slide${i === 0 ? " fc-vulc-reel__slide--base" : ""}`}>
                      <FcImage
                      image={image}
                      fill
                      decorative
                      quality={80}
                      sizes="(min-width: 640px) 640px, 480px"
                    />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative min-h-[22rem] min-w-0">
            <div className="fc-tyre hidden lg:block" aria-hidden="true">
              <span className="fc-tyre__ring" />
              <span className="fc-tyre__ring fc-tyre__ring--2" />
              <span className="fc-tyre__ring fc-tyre__ring--3" />
              <span className="fc-tyre__ring fc-tyre__ring--4" />
              <span className="fc-tyre__hub" />
            </div>
            <ul className="relative grid gap-3 sm:grid-cols-2">
              {t.items.map((item, i) => {
                const Icon = icons[i] ?? CircleDot;
                return (
                  <li key={item.title} className="fc-vulc-card">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="fc-vulc-card__icon flex size-10 items-center justify-center rounded-md border border-brand/45 text-brand">
                        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold tracking-[0.16em] text-steel-400 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-steel-300">{item.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
