import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { mapsUrl, openingHoursRows, phoneLink, streetAddressLine } from "@/lib/business-info";
import { buttonClasses } from "@/components/ui/button";
import { TechSurface } from "@/components/ui/TechSurface";

export function ContactBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.contactBand;
  const phone = phoneLink();
  const address = streetAddressLine();
  const hours = openingHoursRows(dict);
  const maps = mapsUrl();
  const location = address ?? dict.common.locationLong;

  return (
    <TechSurface variant="nav" labelledBy="contact-band-title" tone="dark" compact>
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto] lg:gap-12">
        <div className="fc-copy">
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 id="contact-band-title" className="text-h2 font-extrabold text-balance">
            {t.title}
          </h2>
          <p className="mt-3 max-w-[32rem] text-lead text-steel-300">{t.lead}</p>
        </div>

        <ul className="fc-stage flex flex-col gap-5 sm:flex-row sm:gap-10">
          {phone && (
            <li>
              <a href={phone.href} className="flex items-start gap-3 transition-colors hover:text-white" data-track-location="home_contact">
                <Phone className="mt-0.5 size-5 shrink-0 text-brand-bright" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-steel-400 uppercase">{t.call}</span>
                  <span className="text-lg font-extrabold">{phone.label}</span>
                  {hours.length > 0 && (
                    <span className="mt-1 block text-sm text-steel-400">
                      {hours.map((h) => (
                        <span key={h.days} className="block">
                          {h.days}: {h.hours}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </a>
            </li>
          )}
          <li>
            {maps ? (
              <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-bright" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-steel-400 uppercase">{dict.common.address}</span>
                  <span className="font-bold">{location}</span>
                </span>
              </a>
            ) : (
              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-bright" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-steel-400 uppercase">{dict.common.address}</span>
                  <span className="font-bold">{location}</span>
                </span>
              </span>
            )}
          </li>
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href={pagePath(locale, "booking")} className={buttonClasses()}>
            {t.bookNow}
            <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
          </Link>
          <Link href={pagePath(locale, "contact")} className={buttonClasses({ variant: "onDark" })}>
            {dict.cta.message}
          </Link>
        </div>
      </div>
    </TechSurface>
  );
}
