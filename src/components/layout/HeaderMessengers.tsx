import type { Locale } from "@/i18n/config";
import { messengerLinks } from "@/lib/business-info";
import { ViberIcon, WhatsAppIcon } from "./MessengerBrandIcons";

export function HeaderMessengers({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { whatsapp: string; viber: string; newTab: string };
}) {
  const links = messengerLinks(locale).filter((m) => m.id === "whatsapp" || m.id === "viber");
  if (!links.length) return null;

  return (
    <div className="flex items-center gap-0.5">
      {links.map((m) => {
        const whatsapp = m.id === "whatsapp";
        return (
          <a
            key={m.id}
            href={m.href}
            {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={whatsapp ? labels.whatsapp : labels.viber}
            title={whatsapp ? labels.whatsapp : labels.viber}
            data-track-location="header"
            className={`flex size-8 items-center justify-center rounded-full transition-[background-color,transform] duration-200 hover:scale-[1.06] ${
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
