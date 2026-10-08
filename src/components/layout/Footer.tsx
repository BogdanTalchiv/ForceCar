import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/config/business";
import { consentRequired } from "@/config/site";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { additionalPhoneLinks, emailLink, mapsUrl, messengerLinks, openingHoursRows, phoneLink, socialLinks, streetAddressLine } from "@/lib/business-info";
import { fmt } from "@/lib/format";
import { hasReviews, serviceLinks } from "@/lib/navigation";
import { buttonClasses } from "@/components/ui/button";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { Logo } from "./Logo";
import { ViberIcon, WhatsAppIcon } from "./MessengerBrandIcons";

const socialNames = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube" } as const;

export function Footer({ locale, alternates }: { locale: Locale; alternates: Partial<Record<Locale, string>> }) {
  const dict = getDictionary(locale);
  const phone = phoneLink();
  const extraPhones = additionalPhoneLinks();
  const email = emailLink();
  const address = streetAddressLine();
  const maps = mapsUrl();
  const hours = openingHoursRows(dict);
  const messengers = messengerLinks(locale);
  const socials = socialLinks();
  const year = new Date().getFullYear();

  const pages = [
    { href: pagePath(locale, "services"), label: dict.nav.services },
    { href: pagePath(locale, "works"), label: dict.nav.works },
    { href: pagePath(locale, "about"), label: dict.nav.about },
    ...(hasReviews ? [{ href: pagePath(locale, "reviews"), label: dict.nav.reviews }] : []),
    { href: pagePath(locale, "faq"), label: dict.nav.faq },
    { href: pagePath(locale, "blog"), label: dict.nav.blog },
    { href: pagePath(locale, "contact"), label: dict.nav.contact },
    { href: pagePath(locale, "booking"), label: dict.footer.bookingOnline },
  ];

  const heading = "mb-4 text-xs font-bold tracking-[0.14em] text-steel-400 uppercase";
  const link = "text-[0.9375rem] text-white/75 transition-colors hover:text-white";

  return (
    <footer className="bg-ink-950 text-white">
      <div className="container-fc grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-12 lg:py-14">
        <div>
          <Logo size="lg" />
          <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-white/70">
            {fmt(dict.entity.statement, { years: business.experienceYears })}
          </p>
          <p className="mt-4 text-sm font-semibold text-white/85">{dict.common.locationLong}</p>
        </div>

        <nav aria-label={dict.footer.servicesTitle}>
          <p className={heading}>{dict.footer.servicesTitle}</p>
          <ul className="space-y-2.5">
            {serviceLinks(locale).map((s) => (
              <li key={s.id}>
                <Link href={s.href} className={link}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.a11y.footerNav}>
          <p className={heading}>{dict.footer.navTitle}</p>
          <ul className="space-y-2.5">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={link}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={heading}>{dict.footer.contactTitle}</p>
          <ul className="space-y-3 text-[0.9375rem]">
            {phone && (
              <li>
                <a href={phone.href} className="flex items-center gap-3 font-bold text-white hover:text-white/80" data-track-location="footer">
                  <Phone className="size-4 text-brand" aria-hidden="true" />
                  {phone.label}
                </a>
              </li>
            )}
            {extraPhones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="flex items-center gap-3 font-bold text-white hover:text-white/80" data-track-location="footer">
                  <Phone className="size-4 text-brand" aria-hidden="true" />
                  {p.label}
                </a>
              </li>
            ))}
            {email && (
              <li>
                <a href={email.href} className={`flex items-center gap-3 ${link}`}>
                  <Mail className="size-4 text-brand" aria-hidden="true" />
                  {email.label}
                </a>
              </li>
            )}
            <li className="flex items-start gap-3 text-white/75">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              {maps && address ? (
                <a href={maps} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {address}
                </a>
              ) : (
                <span>{address ?? dict.common.locationLong}</span>
              )}
            </li>
            {messengers.map((m) => {
              const whatsapp = m.id === "whatsapp";
              return (
                <li key={m.id}>
                  <a
                    href={m.href}
                    {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`flex items-center gap-3 ${link}`}
                    data-track-location="footer"
                  >
                    <span className={whatsapp ? "text-[#25D366]" : "text-[#7360F2]"}>
                      {whatsapp ? <WhatsAppIcon className="size-4" /> : <ViberIcon className="size-4" />}
                    </span>
                    {dict.common.messengerNames[m.id]}
                  </a>
                </li>
              );
            })}
            {hours.length > 0 && (
              <li className="flex items-start gap-3 text-white/75">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  {hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.hours}
                    </span>
                  ))}
                </span>
              </li>
            )}
          </ul>
          <Link href={pagePath(locale, "booking")} className={buttonClasses({ className: "fc-book-glow mt-6" })}>
            {dict.cta.requestBooking}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/8">
        {/* lg:pr-60 — spațiu pentru butonul flotant al asistentului, care altfel acoperă linkurile de limbă. */}
        <div className="container-fc flex flex-col gap-4 py-6 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between lg:pr-60">
          <p>{fmt(dict.footer.rights, { year })}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href={pagePath(locale, "privacy")} className="hover:text-white">
                {dict.meta.privacy.title}
              </Link>
            </li>
            <li>
              <Link href={pagePath(locale, "cookies")} className="hover:text-white">
                {dict.meta.cookies.title}
              </Link>
            </li>
            {consentRequired && (
              <li>
                <CookieSettingsButton label={dict.consent.settingsLink} />
              </li>
            )}
            {socials.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {socialNames[s.id]}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-1" aria-label={dict.footer.languagesTitle}>
            {locales.map((l) =>
              alternates[l] ? (
                <li key={l}>
                  <a
                    href={alternates[l]}
                    hrefLang={localeMeta[l].hreflang}
                    lang={l}
                    aria-current={l === locale ? "true" : undefined}
                    title={localeMeta[l].nativeName}
                    className="inline-flex h-8 items-center rounded px-2 text-xs font-bold hover:text-white aria-[current=true]:text-white aria-[current=true]:ring-1 aria-[current=true]:ring-white/25"
                  >
                    {localeMeta[l].short}
                  </a>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
