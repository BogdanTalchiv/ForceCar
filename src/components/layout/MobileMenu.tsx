"use client";

import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useRef } from "react";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import type { NavItem, ServiceLink } from "@/lib/navigation";
import { buttonClasses } from "@/components/ui/button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { rememberLocale } from "./LanguageSwitcher";
import { Logo } from "./Logo";

interface Labels {
  open: string;
  close: string;
  book: string;
  call: string;
  blog: string;
  language: string;
  nav: string;
  allServices: string;
}

export function MobileMenu({
  locale,
  nav,
  services,
  alternates,
  bookingHref,
  blogHref,
  phone,
  labels,
}: {
  locale: Locale;
  nav: NavItem[];
  services: ServiceLink[];
  alternates: Partial<Record<Locale, string>>;
  bookingHref: string;
  blogHref: string;
  phone: { href: string; label: string } | null;
  labels: Labels;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={labels.open}
        aria-haspopup="dialog"
        className="flex size-10 items-center justify-center rounded-md text-white hover:bg-white/8 lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      <dialog
        ref={dialog}
        aria-label={labels.nav}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink-900 p-0 text-white backdrop:bg-black/60 open:flex open:flex-col lg:hidden"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className="container-fc flex h-16 shrink-0 items-center justify-between border-b border-white/8">
          <Logo />
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="flex size-10 items-center justify-center rounded-md hover:bg-white/8"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={labels.nav} className="container-fc flex-1 overflow-y-auto py-4">
          <ul className="divide-y divide-white/8">
            {nav.map((item) =>
              item.key === "services" ? (
                <li key={item.key}>
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-bold">
                      {item.label}
                      <ChevronDown className="size-5 text-white/60 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="grid gap-1 pb-4">
                      {services.map((s) => (
                        <li key={s.id}>
                          <Link href={s.href} className="flex items-center gap-3 rounded-md px-2 py-2.5 text-[0.9375rem] text-white/85 hover:bg-white/5">
                            <ServiceIcon name={s.icon} className="size-[1.125rem] text-brand" />
                            {s.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href={item.href} className="block px-2 py-2.5 text-sm font-bold text-brand-bright">
                          {labels.allServices} →
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.key}>
                  <Link href={item.href} className="block py-4 text-lg font-bold">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <Link href={blogHref} className="block py-4 text-lg font-bold">
                {labels.blog}
              </Link>
            </li>
          </ul>

          <p className="mt-6 text-xs font-bold tracking-[0.14em] text-steel-400 uppercase">{labels.language}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {locales.map((l) => {
              const href = alternates[l];
              if (!href) return null;
              return (
                <li key={l}>
                  <a
                    href={href}
                    hrefLang={localeMeta[l].hreflang}
                    lang={l}
                    aria-current={l === locale ? "true" : undefined}
                    onClick={() => l !== locale && rememberLocale(l, locale)}
                    className="flex h-10 items-center rounded-md px-3.5 text-sm font-bold ring-1 ring-white/15 aria-[current=true]:bg-white aria-[current=true]:text-ink-900"
                  >
                    {localeMeta[l].nativeName}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="container-fc grid shrink-0 gap-2 border-t border-white/8 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link href={bookingHref} className={buttonClasses({ size: "lg", full: true })}>
            {labels.book}
          </Link>
          {phone && (
            <a href={phone.href} className={buttonClasses({ variant: "onDark", size: "lg", full: true })} data-track-location="mobile_menu">
              <Phone className="size-5" aria-hidden="true" />
              {labels.call} · {phone.label}
            </a>
          )}
        </div>
      </dialog>
    </>
  );
}
