import Link from "next/link";
import { CalendarCheck, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { emailLink, mapsEmbedUrl, mapsUrl, messengerLinks, openingHoursRows, phoneLink, streetAddressLine } from "@/lib/business-info";
import { fmt } from "@/lib/format";
import { crumbsFor } from "@/lib/page-meta";
import { BUSINESS_ID } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { MapFacade } from "@/components/contact/MapFacade";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { buttonClasses } from "@/components/ui/button";
import { PageHero, Section } from "@/components/ui/Section";

export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.contact;
  const crumbs = crumbsFor(locale, "contact");
  const phone = phoneLink();
  const email = emailLink();
  const messengers = messengerLinks();
  const address = streetAddressLine();
  const hours = openingHoursRows(dict);
  const embed = mapsEmbedUrl();
  const maps = mapsUrl();

  const card = "rounded-lg bg-white p-6 ring-1 ring-line";
  const iconBox = "flex size-11 shrink-0 items-center justify-center rounded-md bg-mist text-brand";

  const contactNode = {
    "@type": "ContactPage",
    url: absoluteUrl(pagePath(locale, "contact")),
    name: dict.meta.contact.title,
    about: { "@id": BUSINESS_ID },
  };

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "contact" }} current="contact" schema={[crumbs.schema, contactNode]}>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />} />

      <Section tone="mist">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <div className="grid content-start gap-4">
            <div className="rounded-lg bg-ink-900 p-6 text-white sm:p-7">
              <CalendarCheck className="size-7 text-brand" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-extrabold">{t.bookingCard.title}</h2>
              <p className="mt-2 leading-relaxed text-steel-300">{t.bookingCard.text}</p>
              <Link href={pagePath(locale, "booking")} className={buttonClasses({ className: "fc-book-glow mt-5" })}>
                {dict.cta.requestBooking}
              </Link>
            </div>

            {phone && (
              <a href={phone.href} className={`${card} flex items-center gap-4 hover:ring-ink-900`} data-track-location="contact_page">
                <span className={iconBox}>
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-muted">{dict.common.phone}</span>
                  <span className="text-xl font-extrabold">{phone.label}</span>
                </span>
              </a>
            )}

            {email && (
              <a href={email.href} className={`${card} flex items-center gap-4 hover:ring-ink-900`} data-track-location="contact_page">
                <span className={iconBox}>
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-muted">{dict.common.email}</span>
                  <span className="block truncate text-lg font-bold">{email.label}</span>
                </span>
              </a>
            )}

            {messengers.length > 0 && (
              <div className={card}>
                <p className="flex items-center gap-3 text-sm font-bold text-muted">
                  <MessageCircle className="size-5 text-brand" aria-hidden="true" />
                  {dict.common.messengers}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {messengers.map((m) => (
                    <li key={m.id}>
                      <a
                        href={m.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClasses({ variant: "outline", size: "sm" })}
                        data-track-location="contact_page"
                      >
                        {fmt(t.writeUs, { name: dict.common.messengerNames[m.id] })}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {maps && address ? (
              <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className={`${card} flex items-center gap-4 hover:ring-ink-900`}
              >
                <span className={iconBox}>
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-muted">{dict.common.address}</span>
                  <span className="mt-0.5 block text-lg font-bold">{address}</span>
                  <span className="block text-muted">{dict.common.locationLong}</span>
                </span>
              </a>
            ) : (
              <div className={`${card} flex gap-4`}>
                <span className={iconBox}>
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-muted">{address ? dict.common.address : t.location}</p>
                  <p className="mt-0.5 text-lg font-bold">{address ?? dict.common.locationLong}</p>
                  {address && <p className="text-muted">{dict.common.locationLong}</p>}
                </div>
              </div>
            )}

            {hours.length > 0 && (
              <div className={`${card} flex gap-4`}>
                <span className={iconBox}>
                  <Clock className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-muted">{dict.common.hours}</p>
                  <dl className="mt-1 space-y-0.5">
                    {hours.map((h) => (
                      <div key={h.days} className="flex gap-3">
                        <dt className="font-semibold">{h.days}</dt>
                        <dd className="tabular-nums">{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-xl font-extrabold">{t.mapTitle}</h2>
            {embed ? (
              <MapFacade embedUrl={embed} mapsUrl={maps} labels={{ title: t.mapTitle, load: t.mapLoad, notice: t.mapNotice, open: t.openMaps }} />
            ) : (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-lg bg-ink-900 p-8 text-center text-white sm:aspect-[16/10]">
                <MapPin className="size-10 text-brand" aria-hidden="true" />
                <p className="text-2xl font-extrabold">{dict.common.locationLong}</p>
                <Link href={pagePath(locale, "booking")} className={buttonClasses({ variant: "onDark", size: "sm", className: "mt-2" })}>
                  {dict.cta.requestBooking}
                </Link>
              </div>
            )}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
