import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMissingBusinessFields } from "@/config/business";
import { getImage } from "@/config/forcecar-images";
import { demoReviews, demoVideoReviews } from "@/config/reviews.demo";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getProviderConfig } from "@/lib/chat/providers";
import { getMailerMode } from "@/lib/booking/mailer";
import { BeforeAfterSlider } from "@/components/before-after/BeforeAfterSlider";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { VideoReview } from "@/components/reviews/VideoReview";

export const metadata: Metadata = { title: "DEV — ForceCar", robots: { index: false, follow: false } };

/**
 * Pagină internă DOAR pentru development: previzualizarea componentelor cu date demonstrative
 * și starea configurației. În producție răspunde cu 404.
 */
export default async function DevPage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const a = getImage("mecanica", locale);
  const b = getImage("caroserie", locale);
  const ai = getProviderConfig();

  return (
    <main className="container-fc space-y-12 py-12">
      <div className="rounded-lg bg-amber-100 p-5 text-amber-950 ring-1 ring-amber-300">
        <h1 className="text-2xl font-extrabold">DEV · ForceCar — date demonstrative, nu apar pe site</h1>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          <li>Date lipsă în business.ts: {getMissingBusinessFields().join(", ") || "niciuna"}</li>
          <li>Email: mod „{getMailerMode()}” (formsubmit = fără parolă; smtp = Gmail; outbox = .outbox/)</li>
          <li>Asistent: {ai ? `AI activ (${ai.provider}, ${ai.model})` : "mod fără AI (răspunsuri din config)"}</li>
        </ul>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-extrabold">Înainte / După — DEMO (două fotografii diferite, NU o pereche reală)</h2>
        {a && b && (
          <div className="max-w-2xl">
            <BeforeAfterSlider id="demo" before={a} after={b} title="[DEMO] Componentă de test" labels={dict.beforeAfter} />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-extrabold">Recenzii — DEMO</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {demoReviews.map((r) => (
            <li key={r.id}>
              <ReviewCard
                review={r}
                locale={locale}
                labels={{ ratingLabel: dict.reviews.ratingLabel, sources: dict.reviews.sources, viewSource: dict.reviews.viewSource, newTab: dict.a11y.newTab }}
              />
            </li>
          ))}
          {demoVideoReviews.map((v) => (
            <li key={v.id}>
              <VideoReview review={v} labels={dict.video} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
