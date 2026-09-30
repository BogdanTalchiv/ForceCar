import Link from "next/link";
import { CalendarCheck, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { forceCarImages, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { mapsEmbedUrl, mapsUrl, messengerLinks, openingHoursRows, phoneLink, streetAddressLine } from "@/lib/business-info";
import { buttonClasses } from "@/components/ui/button";
import { MapFacade } from "@/components/contact/MapFacade";
import { FcImage } from "@/components/ui/FcImage";
import { SectionHeader } from "@/components/ui/Section";

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

  return (
    <section aria-labelledby="contact-band-title" className="bg-ink-900 py-16 text-white sm:py-20 lg:py-24">
      <div className="container-fc">
        <SectionHeader id="contact-band-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} dark />
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-4">
            <ul className="grid gap-3">
              {phone && (
                <li>
                  <a
                    href={phone.href}
                    className="flex items-center gap-4 rounded-lg bg-white/5 px-4 py-4 ring-1 ring-white/10 transition-colors hover:bg-white/8"
                    data-track-location="home_contact"
                  >
                    <span className="flex size-11 items-center justify-center rounded-md bg-brand">
                      <Phone className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold tracking-wide text-steel-400 uppercase">{dict.common.phone}</span>
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
                    className="flex items-center gap-4 rounded-lg bg-white/5 px-4 py-4 ring-1 ring-white/10 transition-colors hover:bg-white/8"
                    data-track-location="home_contact"
                  >
                    <span className="flex size-11 items-center justify-center rounded-md bg-brand">
                      <MessageCircle className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold tracking-wide text-steel-400 uppercase">{t.whatsapp}</span>
                      <span className="text-lg font-extrabold">{t.whatsapp}</span>
                    </span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-4 rounded-lg bg-white/5 px-4 py-4 ring-1 ring-white/10">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white/8">
                  <MapPin className="size-5 text-brand" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-wide text-steel-400 uppercase">{dict.common.address}</span>
                  <span className="font-bold">{address ?? dict.common.locationLong}</span>
                </span>
              </li>
              {hours.length > 0 && (
                <li className="flex items-start gap-4 rounded-lg bg-white/5 px-4 py-4 ring-1 ring-white/10">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white/8">
                    <Clock className="size-5 text-brand" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-wide text-steel-400 uppercase">{dict.common.hours}</span>
                    {hours.map((row) => (
                      <span key={row.days} className="block font-semibold">
                        {row.days}: {row.hours}
                      </span>
                    ))}
                  </span>
                </li>
              )}
            </ul>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
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
              <Link href={pagePath(locale, "booking")} className={buttonClasses({ size: "lg" })}>
                <CalendarCheck className="size-5" aria-hidden="true" />
                {t.bookNow}
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {embed && (
              <MapFacade
                embedUrl={embed}
                mapsUrl={maps}
                labels={{ title: dict.contact.mapTitle, load: dict.contact.mapLoad, notice: dict.contact.mapNotice, open: dict.contact.openMaps }}
              />
            )}
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-ink-800 ring-1 ring-white/10">
              <FcImage image={image} fill quality={60} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
