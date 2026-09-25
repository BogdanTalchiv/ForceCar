import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImage } from "@/config/forcecar-images";
import type { Article, ArticleTranslation } from "@/content/articles";
import type { Locale } from "@/i18n/config";
import { articlePath } from "@/i18n/routes";
import { FcImage } from "@/components/ui/FcImage";

export function ArticleCard({ locale, article, readLabel }: { locale: Locale; article: Article & { t: ArticleTranslation }; readLabel: string }) {
  const image = getImage(article.image, locale);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-white ring-1 ring-line transition-shadow hover:shadow-card">
      <div className="relative aspect-[16/9] overflow-hidden bg-ink-800">
        <FcImage image={image} fill decorative quality={60} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-bold">
          <Link href={articlePath(locale, article.t.slug)} className="after:absolute after:inset-0 after:content-['']">
            {article.t.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">{article.t.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold group-hover:text-brand">
          {readLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
