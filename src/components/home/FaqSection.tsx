import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import type { FaqItem } from "@/lib/faq";
import { buttonClasses } from "@/components/ui/button";
import { FaqList } from "@/components/faq/FaqList";
import { TechSurface } from "@/components/ui/TechSurface";

export function FaqSection({ locale, items }: { locale: Locale; items: FaqItem[] }) {
  const dict = getDictionary(locale);
  const t = dict.home.faq;
  return (
    <TechSurface variant="diagnostic" labelledBy="faq-title" tone="white">
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="fc-copy">
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 id="faq-title" className="text-h2 font-extrabold text-balance">
            {t.title}
          </h2>
          <p className="mt-4 max-w-[28rem] text-lead text-muted">{dict.faqPage.lead}</p>
          <Link href={pagePath(locale, "faq")} className={buttonClasses({ variant: "outline", className: "mt-8" })}>
            {dict.cta.allFaq}
            <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="fc-stage">
          <FaqList items={items} variant="cards" />
        </div>
      </div>
    </TechSurface>
  );
}
