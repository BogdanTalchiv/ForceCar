import Link from "next/link";
import { CalendarCheck, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/config/business";
import { forceCarImages, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { mapsEmbedUrl, mapsUrl, messengerLinks, openingHoursRows, phoneLink, streetAddressLine } from "@/lib/business-info";
import { buttonClasses } from "@/components/ui/button";
import { MapFacade } from "@/components/contact/MapFacade";
import { FcImage } from "@/components/ui/FcImage";
import { TechSurface } from "@/components/ui/TechSurface";

export function ContactBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.contactBand;
  const phone = phoneLink();
  const whatsapp = messengerLinks().find((m) => m.id === "whatsapp");
  const address = streetAddressLine();
  const hours = openingHoursRows(dict);
  const embed = mapsEmbedUrl();
  const maps = mapsUrl();
  const image = getImage(forceCarImages.about, locale);

  const row = "flex items-start gap-4 py-4";
  const label = "block text-[0.6875rem] font-bold tracking-[0.14em] text-steel-400 uppercase";

  return (
    <TechSurface variant="nav" labelledBy="contact-band-title" tone="dark">
      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 id="contact-band-title" className="text-h2 font-extrabold text-balance">
            {t.title}
          </h2>
          <p className="mt-3 max-w-[38rem] text-lead text-steel-300">{t.lead}</p>

          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {phone && (
              <li>
                <a href={phone.href} className={`${row} transition-colors hover:text-white`} data-track-location="home_contact">
                  <Phone className="mt-0.5 size-5 shrink-0 text-brand-bright" strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    <span className={label}>{dict.common.phone}</span>
                    <span className="text-lg font-extrabold">{phone.label}</span>
                  </span>
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${row} transition-colors hover:text-white`}
                  data-track-location="home_contact"
                >
                  <MessageCircle className="mt-0.5 size-5 shrink-0 text-brand-bright" strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    <span className={label}>{t.whatsapp}</span>
                    <span className="text-lg font-extrabold">{t.whatsapp}</span>
                  </span>
                </a>
              </li>
            )}
            <li className={row}>
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-bright" strokeWidth={1.75} aria-hidden="true" />
              <span>
                <span className={label}>{dict.common.address}</span>
                <span className="font-bold">{address ?? dict.common.locationLong}</span>
              </span>
            </li>
            {hours.length > 0 && (
              <li className={row}>
                <Clock className="mt-0.5 size-5 shrink-0 text-brand-bright" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <span className={label}>{dict.common.hours}</span>
                  {hours.map((h) => (
                    <span key={h.days} className="block font-semibold">
                      {h.days}: {h.hours}
                    </span>
                  ))}
                </span>
              </li>
            )}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={pagePath(locale, "booking")} className={buttonClasses({ size: "lg" })}>
              <CalendarCheck className="size-5" aria-hidden="true" />
              {t.bookNow}
            </Link>
            {phone && (
              <a href={phone.href} className={buttonClasses({ variant: "onDark", size: "lg" })} data-track-location="home_contact">
                <Phone className="size-5" aria-hidden="true" />
                {t.call}
              </a>
            )}
            {whatsapp && (
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "onDark", size: "lg" })}
                data-track-location="home_contact"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {t.whatsapp}
              </a>
            )}
          </div>
        </div>

        {embed ? (
          <MapFacade
            embedUrl={embed}
            mapsUrl={maps}
            cover={image}
            coords={business.geo}
            labels={{ title: dict.contact.mapTitle, load: dict.contact.mapLoad, notice: dict.contact.mapNotice, open: dict.contact.openMaps }}
          />
        ) : (
          image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-800 ring-1 ring-white/10 sm:aspect-[16/10]">
              <FcImage image={image} fill quality={60} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          )
        )}
      </div>
    </TechSurface>
  );
}
