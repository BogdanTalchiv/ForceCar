import type { Metadata } from "next";
import "./globals.css";
import { localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { manrope } from "./fonts";

export const metadata: Metadata = {
  title: "404 — ForceCar",
  robots: { index: false, follow: true },
};

/** 404 pentru adrese care nu corespund niciunei rute (limba nu este cunoscută). */
export default function GlobalNotFound() {
  const ro = getDictionary("ro");
  return (
    <html lang="ro" className={manrope.variable}>
      <body className="pb-0!">
        <main className="flex min-h-dvh flex-col justify-center bg-ink-900 text-white">
          <div className="container-fc py-16">
            <p className="text-2xl font-extrabold tracking-[0.04em]">
              FORCE<span className="text-brand">CAR</span>
            </p>
            <p className="mt-10 text-7xl font-extrabold text-brand">404</p>
            <h1 className="mt-4 text-h2 font-extrabold">{ro.notFound.title}</h1>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
              {locales.map((l) => {
                const d = getDictionary(l);
                return (
                  <li key={l}>
                    <a
                      href={`/${l}`}
                      hrefLang={localeMeta[l].hreflang}
                      lang={l}
                      className="flex h-full flex-col rounded-lg p-5 ring-1 ring-white/15 hover:bg-white/5"
                    >
                      <span className="text-xs font-bold tracking-[0.14em] text-steel-400 uppercase">{localeMeta[l].nativeName}</span>
                      <span className="mt-1 font-bold">{d.notFound.title}</span>
                      <span className="mt-2 text-sm text-brand-bright">{d.cta.backHome} →</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
