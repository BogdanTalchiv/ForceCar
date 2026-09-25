import { getArticlesForLocale } from "@/content/articles";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articlePath, pagePath } from "@/i18n/routes";
import { crumbsFor } from "@/lib/page-meta";
import { BUSINESS_ID } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, Section } from "@/components/ui/Section";

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.blog;
  const crumbs = crumbsFor(locale, "blog");
  const articles = getArticlesForLocale(locale);

  const blogNode = {
    "@type": "Blog",
    name: dict.meta.blog.title,
    url: absoluteUrl(pagePath(locale, "blog")),
    publisher: { "@id": BUSINESS_ID },
    blogPost: articles.map((a) => ({ "@id": `${absoluteUrl(articlePath(locale, a.t.slug))}#article` })),
  };

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "blog" }} current="blog" schema={[crumbs.schema, blogNode]}>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />} />
      <Section tone="mist">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.id}>
              <ArticleCard locale={locale} article={a} readLabel={dict.cta.readArticle} />
            </li>
          ))}
        </ul>
      </Section>
      <FinalCta locale={locale} />
    </PageShell>
  );
}
