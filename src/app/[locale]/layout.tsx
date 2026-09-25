import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { enabledServices } from "@/config/services";
import { consentRequired, siteConfig } from "@/config/site";
import { getServiceContent } from "@/content/services";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { phoneLink } from "@/lib/business-info";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { ConsentManager } from "@/components/consent/ConsentManager";
import { TrackingBootstrap } from "@/components/consent/TrackingBootstrap";
import { manrope } from "../fonts";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#111315",
  colorScheme: "light",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "ro");
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: "ForceCar",
    title: { default: dict.meta.home.title, template: "%s | ForceCar" },
    description: dict.meta.home.description,
    formatDetection: { telephone: false, email: false, address: false },
    ...(siteConfig.googleSiteVerification ? { verification: { google: siteConfig.googleSiteVerification } } : {}),
    ...(siteConfig.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Consent Mode v2: totul refuzat implicit, până la alegerea vizitatorului. */
const consentDefaults = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});gtag('set','ads_data_redaction',true);`;

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={manrope.variable}>
      <head>{consentRequired && <script id="fc-consent-default" dangerouslySetInnerHTML={{ __html: consentDefaults }} />}</head>
      <body>
        <a href="#main" className="skip-link">
          {dict.a11y.skip}
        </a>
        {children}
        <ChatLauncher
          locale={locale}
          labels={dict.chat}
          bookingHref={pagePath(locale, "booking")}
          contactHref={pagePath(locale, "contact")}
          phone={phoneLink()}
          serviceNames={Object.fromEntries(enabledServices.map((s) => [s.id, getServiceContent(locale, s.id).name]))}
        />
        <TrackingBootstrap />
        {consentRequired && <ConsentManager labels={dict.consent} policyHref={pagePath(locale, "cookies")} />}
      </body>
    </html>
  );
}
