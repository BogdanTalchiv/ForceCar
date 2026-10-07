import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { forceCarImages, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { phoneLink } from "@/lib/business-info";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";

export function FinalCta({ locale, title, text }: { locale: Locale; title?: string; text?: string }) {
  const dict = getDictionary(locale);
  const image = getImage(forceCarImages.finalCta, locale);
  const phone = phoneLink();

  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-ink-900 text-white">
      <div className="absolute inset-0 -z-10 opacity-35">
        <FcImage image={image} fill decorative quality={60} sizes="100vw" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-ink-900 via-ink-900/90 to-ink-900/50" />
      <div className="container-fc section-y">
        <div className="max-w-2xl">
          <h2 id="final-cta-title" className="text-h2 font-extrabold text-balance">
            {title ?? dict.home.finalCta.title}
          </h2>
          <p className="mt-4 text-lead text-steel-300">{text ?? dict.home.finalCta.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={pagePath(locale, "booking")} className={buttonClasses({ size: "lg", className: "fc-book-glow" })}>
              <CalendarCheck className="size-5" aria-hidden="true" />
              {dict.cta.bookCheck}
            </Link>
            {phone ? (
              <a href={phone.href} className={buttonClasses({ variant: "onDark", size: "lg" })} data-track-location="final_cta">
                <Phone className="size-5" aria-hidden="true" />
                {phone.label}
              </a>
            ) : (
              <Link href={pagePath(locale, "contact")} className={buttonClasses({ variant: "onDark", size: "lg" })}>
                {dict.cta.contact}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
