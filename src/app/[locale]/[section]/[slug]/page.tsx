import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { enabledServices, getServiceBySlug } from "@/config/services";
import { getArticleBySlug, getArticlesForLocale } from "@/content/articles";
import { getServiceContent } from "@/content/services";
import { isLocale, locales } from "@/i18n/config";
import { resolveSection, sectionSegments } from "@/i18n/routes";
import { buildMetadata } from "@/lib/seo";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { ServicePage } from "@/components/pages/ServicePage";

type Params = { params: Promise<{ locale: string; section: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...enabledServices.map((s) => ({ locale, section: sectionSegments.services[locale], slug: s.slugs[locale] })),
    ...getArticlesForLocale(locale).map((a) => ({ locale, section: sectionSegments.blog[locale], slug: a.t.slug })),
  ]);
}

async function resolve(params: Params["params"]) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) return null;
  const key = resolveSection(locale, section);
  if (key === "services") {
    const service = getServiceBySlug(locale, slug);
    return service ? ({ kind: "service", locale, service } as const) : null;
  }
  if (key === "blog") {
    const article = getArticleBySlug(locale, slug);
    return article ? ({ kind: "article", locale, article } as const) : null;
  }
  return null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  if (r.kind === "service") {
    const c = getServiceContent(r.locale, r.service.id);
    return buildMetadata({
      locale: r.locale,
      ref: { type: "service", id: r.service.id, slugs: r.service.slugs },
      title: c.metaTitle,
      description: c.metaDescription,
      image: r.service.image,
    });
  }
  const slugs = Object.fromEntries(Object.entries(r.article.translations).map(([l, t]) => [l, t!.slug]));
  return buildMetadata({
    locale: r.locale,
    ref: { type: "article", id: r.article.id, slugs },
    title: r.article.t.title,
    description: r.article.t.description,
    image: r.article.image,
    type: "article",
    publishedTime: r.article.datePublished,
    modifiedTime: r.article.dateModified,
  });
}

export default async function DetailPage({ params }: Params) {
  const r = await resolve(params);
  if (!r) notFound();
  return r.kind === "service" ? <ServicePage locale={r.locale} service={r.service} /> : <ArticlePage locale={r.locale} article={r.article} />;
}
