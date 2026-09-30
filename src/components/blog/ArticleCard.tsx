import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getImage } from "@/config/forcecar-images";
import type { Article, ArticleTranslation } from "@/content/articles";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { articlePath } from "@/i18n/routes";
import { formatDate } from "@/lib/format";
import { FcImage } from "@/components/ui/FcImage";

export function ArticleCard({
  locale,
  article,
  readLabel,
  excerpt = true,
}: {
  locale: Locale;
  article: Article & { t: ArticleTranslation };
  readLabel: string;
  excerpt?: boolean;
}) {
  const image = getImage(article.image, locale);
  const category = getServiceContent(locale, article.serviceId).name;
  const date = formatDate(article.datePublished, locale);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_28px_-18px_rgb(17_19_21/0.22)] ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-[3px] hover:shadow-[0_16px_36px_-18px_rgb(17_19_21/0.32)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
        <FcImage
          image={image}
          fill
          decorative
          quality={60}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 pb-5">
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
        {excerpt && <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{article.t.description}</p>}
        <span className="mt-auto ml-auto inline-flex size-9 items-center justify-center rounded-full border border-line text-ink-900 transition-[border-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:border-brand group-hover:text-brand">
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">{readLabel}</span>
        </span>
      </div>
    </article>
  );
}
