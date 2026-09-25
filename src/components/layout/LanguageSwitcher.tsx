"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef } from "react";
import { LOCALE_COOKIE, localeMeta, locales, type Locale } from "@/i18n/config";
import { track } from "@/lib/analytics/track";

export function rememberLocale(locale: Locale, from: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`;
  track("language_change", { from, to: locale });
}

/** Selector de limbă: trimite la pagina echivalentă din limba aleasă (fără redirecționări automate). */
export function LanguageSwitcher({
  locale,
  alternates,
  label,
}: {
  locale: Locale;
  alternates: Partial<Record<Locale, string>>;
  label: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const close = (e: Event) => {
      if (!el.open) return;
      if (e instanceof KeyboardEvent) {
        if (e.key === "Escape") {
          el.open = false;
          el.querySelector("summary")?.focus();
        }
        return;
      }
      if (!el.contains(e.target as Node)) el.open = false;
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <details ref={ref} className="group relative">
      <summary
        aria-label={`${label}: ${localeMeta[locale].nativeName}`}
        className="flex h-10 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm font-bold text-white/85 transition-colors hover:bg-white/8 hover:text-white"
      >
        <Globe className="size-4" aria-hidden="true" />
        {localeMeta[locale].short}
        <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <ul className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg bg-white py-1.5 text-text shadow-float ring-1 ring-black/5">
        {locales.map((l) => {
          const href = alternates[l];
          if (!href) return null;
          const active = l === locale;
          return (
            <li key={l}>
              <a
                href={href}
                hrefLang={localeMeta[l].hreflang}
                lang={l}
                aria-current={active ? "true" : undefined}
                onClick={() => !active && rememberLocale(l, locale)}
                className={`flex items-center justify-between px-4 py-2.5 text-[0.9375rem] hover:bg-mist ${active ? "font-bold" : ""}`}
              >
                <span>
                  <span className="mr-2 inline-block w-6 text-xs font-bold text-muted">{localeMeta[l].short}</span>
                  {localeMeta[l].nativeName}
                </span>
                {active && <Check className="size-4 text-brand" aria-hidden="true" />}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
