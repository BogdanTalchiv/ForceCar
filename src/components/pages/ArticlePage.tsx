import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { getImage } from "@/config/forcecar-images";
import { getService } from "@/config/services";
import { getArticlesForLocale, type Article, type ArticleTranslation } from "@/content/articles";
import { getServiceContent } from "@/content/services";
import { localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articlePath, pagePath, servicePath } from "@/i18n/routes";
import { crumbsFor } from "@/lib/page-meta";
import { articleNode } from "@/lib/schema";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";
import { Section } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function ArticlePage({ locale, article }: { locale: Locale; article: Article & { t: ArticleTranslation } }) {
  const dict = getDictionary(locale);
  const { t } = article;
  const href = articlePath(locale, t.slug);
  const crumbs = crumbsFor(locale, "blog", { name: t.title, href });
  const image = getImage(article.image, locale);
  const service = getService(article.serviceId);
  const serviceContent = service ? getServiceContent(locale, service.id) : null;
  const others = getArticlesForLocale(locale).filter((a) => a.id !== article.id);
  const published = new Intl.DateTimeFormat(localeMeta[locale].dateLocale, { dateStyle: "long" }).format(
    new Date(`${article.datePublished}T12:00:00Z`),
  );
  const slugs = Object.fromEntries(Object.entries(article.translations).map(([l, tr]) => [l, tr!.slug]));

  return (
    <PageShell
      locale={locale}
      pageRef={{ type: "article", id: article.id, slugs }}
      current="blog"
      schema={[crumbs.schema, articleNode(locale, article, t)]}
    >
      <article>
        <header className="bg-ink-900 text-white">
          <div className="container-fc pt-8 pb-12 lg:pt-10 lg:pb-16">
            <Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />
            <div className="mx-auto mt-10 max-w-3xl">
              <p className="eyebrow">{dict.blog.eyebrow}</p>
              <h1 className="mt-4 text-h2 font-extrabold text-balance sm:text-display">{t.title}</h1>
              <p className="mt-5 text-lead text-steel-300">{t.description}</p>
              <p className="mt-6 text-sm text-steel-400">
                {dict.blog.author} · {dict.common.published} <time dateTime={article.datePublished}>{published}</time>
              </p>
            </div>
          </div>
        </header>

        <div className="container-fc">
          <div className="relative mx-auto -mt-2 aspect-[16/9] max-w-4xl overflow-hidden rounded-b-lg bg-ink-800 sm:rounded-lg lg:mt-10">
            <FcImage image={image} fill preload quality={72} sizes="(min-width: 1024px) 896px, 100vw" />
          </div>

          <div className="prose-fc mx-auto max-w-3xl py-12 lg:py-16">
            {t.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          {service && serviceContent && (
            <aside className="mx-auto mb-16 max-w-3xl rounded-lg bg-mist p-6 ring-1 ring-line sm:p-8">
              <p className="eyebrow">{dict.blog.relatedService}</p>
              <div className="mt-4 flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-ink-900 text-white">
                  <ServiceIcon name={service.icon} className="size-6" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold">{serviceContent.name}</h2>
                  <p className="mt-1.5 leading-relaxed text-muted">{serviceContent.short}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={`${pagePath(locale, "booking")}?service=${service.id}`} className={buttonClasses({ className: "fc-book-glow" })}>
                  <CalendarCheck className="size-5" aria-hidden="true" />
                  {dict.cta.bookCheck}
                </Link>
                <Link href={servicePath(locale, service.slugs)} className={buttonClasses({ variant: "outline" })}>
                  {dict.cta.details}
                  <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          )}
        </div>
      </article>

      {others.length > 0 && (
        <Section tone="mist" labelledBy="more-articles">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="more-articles" className="text-2xl font-extrabold">
              {dict.blog.title}
            </h2>
            <Link href={pagePath(locale, "blog")} className="text-sm font-bold text-brand hover:underline">
              {dict.blog.back} →
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((a) => (
              <li key={a.id}>
                <ArticleCard locale={locale} article={a} readLabel={dict.cta.readArticle} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </PageShell>
  );
}
