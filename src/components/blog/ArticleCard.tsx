import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImage } from "@/config/forcecar-images";
import type { Article, ArticleTranslation } from "@/content/articles";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { articlePath } from "@/i18n/routes";
import { formatDate } from "@/lib/format";
import { FcImage } from "@/components/ui/FcImage";

export function ArticleCard({ locale, article, readLabel }: { locale: Locale; article: Article & { t: ArticleTranslation }; readLabel: string }) {
  const image = getImage(article.image, locale);
  const category = getServiceContent(locale, article.serviceId).name;
  const date = formatDate(article.datePublished, locale);

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-ink-800 shadow-[0_1px_2px_rgb(17_19_21/0.04)] ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 group-hover:shadow-[0_10px_28px_-18px_rgb(17_19_21/0.35)] group-hover:ring-brand/25">
        <FcImage
          image={image}
          fill
          decorative
          quality={60}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
          {category}
          <span className="mx-2 text-line" aria-hidden="true">
            ·
          </span>
          <time dateTime={article.datePublished}>{date}</time>
        </p>
        <h3 className="mt-2 text-lg leading-snug font-bold">
          <Link href={articlePath(locale, article.t.slug)} className="after:absolute after:inset-0 after:content-['']">
            {article.t.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{article.t.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold group-hover:text-brand">
          {readLabel}
          <ArrowRight className="btn-arrow size-4 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
