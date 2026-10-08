import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath, type PageKey } from "@/i18n/routes";
import { phoneLink } from "@/lib/business-info";
import { mainNav, serviceLinks } from "@/lib/navigation";
import { buttonClasses } from "@/components/ui/button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { HeaderFrame } from "./HeaderFrame";
import { HeaderMessengers } from "./HeaderMessengers";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header({
  locale,
  alternates,
  current,
}: {
  locale: Locale;
  alternates: Partial<Record<Locale, string>>;
  current?: PageKey;
}) {
  const dict = getDictionary(locale);
  const nav = mainNav(locale);
  const services = serviceLinks(locale);
  const phone = phoneLink();
  const bookingHref = pagePath(locale, "booking");

  return (
    <HeaderFrame>
      <div className="header-bar container-fc flex items-center justify-between gap-4">
        <Link href={pagePath(locale, "home")} aria-label={dict.a11y.home} className="shrink-0 rounded-sm">
          <Logo tagline={`${dict.meta.tagline} · Chișinău`} />
        </Link>

        <nav aria-label={dict.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              item.key === "services" ? (
                <li key={item.key} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={current === item.key ? "page" : undefined}
                    className="relative flex h-10 items-center gap-1 rounded-md px-3 text-[0.9375rem] font-semibold text-white/85 transition-colors hover:text-white aria-[current=page]:text-white after:absolute after:inset-x-3 after:-bottom-[0.7rem] after:h-px after:bg-transparent after:transition-colors hover:after:bg-white/35 aria-[current=page]:after:bg-brand"
                  >
                    {item.label}
                    <ChevronDown className="size-4 opacity-70 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
                  </Link>
                  <div className="invisible absolute top-full left-1/2 z-50 w-[36rem] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="grid grid-cols-2 gap-1 rounded-lg bg-white p-3 text-text shadow-float ring-1 ring-black/5">
                      {services.map((s) => (
                        <li key={s.id}>
                          <Link href={s.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] font-semibold hover:bg-mist">
                            <span className="flex size-9 items-center justify-center rounded-md bg-mist text-brand">
                              <ServiceIcon name={s.icon} className="size-[1.125rem]" />
                            </span>
                            {s.label}
                          </Link>
                        </li>
                      ))}
                      <li className="col-span-2 mt-1 border-t border-line pt-2">
                        <Link href={item.href} className="block rounded-md px-3 py-2 text-sm font-bold text-brand hover:bg-mist">
                          {dict.nav.allServices} →
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={current === item.key ? "page" : undefined}
                    className="relative flex h-10 items-center rounded-md px-3 text-[0.9375rem] font-semibold text-white/85 transition-colors hover:text-white aria-[current=page]:text-white after:absolute after:inset-x-3 after:-bottom-[0.7rem] after:h-px after:bg-transparent after:transition-colors hover:after:bg-white/35 aria-[current=page]:after:bg-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-0.5">
            {phone && (
              <a
                href={phone.href}
                className="hidden h-10 items-center gap-2 rounded-md px-3 text-[0.9375rem] font-bold text-white hover:bg-white/8 xl:flex"
                data-track-location="header"
              >
                <Phone className="fc-phone-ring size-4 text-brand" aria-hidden="true" />
                {phone.label}
              </a>
            )}
            <HeaderMessengers
              locale={locale}
              className="hidden items-center gap-0.5 lg:flex"
              labels={{ whatsapp: dict.a11y.whatsapp, viber: dict.a11y.viber, newTab: dict.a11y.newTab }}
            />
          </div>
          <LanguageSwitcher locale={locale} alternates={alternates} label={dict.a11y.language} />
          <Link href={bookingHref} className={buttonClasses({ size: "sm", className: "fc-book-glow max-sm:hidden" })}>
            {dict.cta.book}
          </Link>
          <MobileMenu
            locale={locale}
            nav={nav}
            services={services}
            alternates={alternates}
            bookingHref={bookingHref}
            blogHref={pagePath(locale, "blog")}
            phone={phone}
            labels={{
              open: dict.a11y.openMenu,
              close: dict.a11y.closeMenu,
              book: dict.cta.book,
              call: dict.cta.call,
              blog: dict.nav.blog,
              language: dict.footer.languagesTitle,
              nav: dict.a11y.mainNav,
              allServices: dict.nav.allServices,
              whatsapp: dict.a11y.whatsapp,
              viber: dict.a11y.viber,
              instagram: dict.a11y.instagram,
              tiktok: dict.a11y.tiktok,
              newTab: dict.a11y.newTab,
            }}
          />
        </div>
      </div>
    </HeaderFrame>
  );
}
