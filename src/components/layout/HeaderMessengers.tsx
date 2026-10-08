import type { Locale } from "@/i18n/config";
import { messengerLinks } from "@/lib/business-info";
import { ViberIcon, WhatsAppIcon } from "./MessengerBrandIcons";

export function HeaderMessengers({
  locale,
  labels,
  trackLocation = "header",
  className = "flex items-center gap-0.5",
}: {
  locale: Locale;
  labels: { whatsapp: string; viber: string; newTab: string };
  trackLocation?: string;
  className?: string;
}) {
  const links = messengerLinks(locale).filter((m) => m.id === "whatsapp" || m.id === "viber");
  if (!links.length) return null;

  return (
    <div className={className}>
      {links.map((m) => {
        const whatsapp = m.id === "whatsapp";
        return (
          <a
            key={m.id}
            href={m.href}
            {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={whatsapp ? labels.whatsapp : labels.viber}
            title={whatsapp ? labels.whatsapp : labels.viber}
            data-track-location={trackLocation}
            className={`flex size-10 items-center justify-center rounded-full transition-[background-color,transform] duration-200 hover:scale-[1.06] lg:size-8 ${
              whatsapp
                ? "text-[#25D366] hover:bg-[#25D366]/15"
                : "text-[#7360F2] hover:bg-[#7360F2]/15"
            }`}
          >
            {whatsapp ? <WhatsAppIcon /> : <ViberIcon />}
            {whatsapp ? <span className="sr-only">{labels.newTab}</span> : null}
          </a>
        );
      })}
    </div>
  );
}
