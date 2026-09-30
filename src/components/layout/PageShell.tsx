import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPaths, pagePath, type PageKey, type PageRef } from "@/i18n/routes";
import { mapsUrl, messengerLinks, phoneLink } from "@/lib/business-info";
import { businessNode, graph, websiteNode } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { DevNotice } from "./DevNotice";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileActionBar } from "./MobileActionBar";

/**
 * Structura comună a paginilor: header (cu selectorul de limbă către pagina echivalentă),
 * conținut, footer, bara mobilă și JSON-LD (firma + site + nodurile specifice paginii).
 */
export function PageShell({
  locale,
  pageRef,
  current,
  schema = [],
  children,
}: {
  locale: Locale;
  pageRef: PageRef;
  current?: PageKey;
  schema?: (Record<string, unknown> | null)[];
  children: ReactNode;
}) {
  const dict = getDictionary(locale);
  const alternates = localizedPaths(pageRef);
  const messengers = messengerLinks();
  const whatsapp = messengers.find((m) => m.id === "whatsapp") ?? null;

  return (
    <>
      <Header locale={locale} alternates={alternates} current={current} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} alternates={alternates} />
      <MobileActionBar
        phone={phoneLink()}
        messengers={messengers.map((m) => ({ ...m, name: dict.common.messengerNames[m.id] }))}
        whatsapp={whatsapp}
        mapsHref={mapsUrl()}
        bookingHref={pagePath(locale, "booking")}
        labels={{
          call: dict.mobileBar.call,
          message: dict.mobileBar.message,
          book: dict.mobileBar.book,
          messageTitle: dict.mobileBar.messageTitle,
          assistant: dict.mobileBar.assistant,
          close: dict.a11y.closeMenu,
          region: dict.a11y.quickActions,
          map: dict.mobileBar.map,
          whatsapp: dict.mobileBar.whatsapp,
        }}
      />
      <JsonLd data={graph([businessNode(locale), websiteNode(locale), ...schema])} />
      <DevNotice />
    </>
  );
}
