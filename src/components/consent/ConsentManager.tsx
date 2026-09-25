"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { analyticsConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/ro";
import { OPEN_CONSENT_EVENT, readConsent, writeConsent, type ConsentState } from "@/lib/analytics/consent";
import { clearLongUtm, promoteUtm } from "@/lib/analytics/utm";
import { buttonClasses } from "@/components/ui/button";
import { applyConsent } from "./tags";

const hasAnalytics = Boolean(analyticsConfig.gtmId || analyticsConfig.ga4Id);
const hasMarketing = Boolean(analyticsConfig.gtmId || analyticsConfig.googleAdsId || analyticsConfig.metaPixelId);

/**
 * Banner + preferințe cookie. Randat doar când există instrumente care cer consimțământ.
 * „Accept toate” și „Doar necesare” au aceeași vizibilitate; nimic nu este preselectat.
 */
export function ConsentManager({ labels, policyHref }: { labels: Dictionary["consent"]; policyHref: string }) {
  const [banner, setBanner] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      applyConsent(stored);
      queueMicrotask(() => setPrefs({ analytics: stored.analytics, marketing: stored.marketing }));
    } else {
      queueMicrotask(() => setBanner(true));
    }
    const openPrefs = () => {
      const current = readConsent();
      setPrefs({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false });
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_CONSENT_EVENT, openPrefs);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openPrefs);
  }, []);

  const save = (choice: { analytics: boolean; marketing: boolean }) => {
    const state: ConsentState = writeConsent({
      analytics: hasAnalytics && choice.analytics,
      marketing: hasMarketing && choice.marketing,
    });
    applyConsent(state);
    if (state.analytics) promoteUtm();
    else clearLongUtm();
    setPrefs({ analytics: state.analytics, marketing: state.marketing });
    setBanner(false);
    dialog.current?.close();
  };

  const toggle = (key: "analytics" | "marketing", title: string, text: string) => (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-4">
      <span>
        <span className="block font-bold">{title}</span>
        <span className="mt-1 block text-sm text-muted">{text}</span>
      </span>
      <input
        type="checkbox"
        checked={prefs[key]}
        onChange={(e) => setPrefs((p) => ({ ...p, [key]: e.target.checked }))}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="relative mt-1 h-6 w-11 shrink-0 rounded-full bg-steel-200 transition-colors peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
      />
    </label>
  );

  return (
    <>
      {banner && (
        <div
          role="region"
          aria-label={labels.title}
          className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[45] mx-auto max-w-lg animate-fade-up rounded-lg bg-white p-4 text-text shadow-float ring-1 ring-black/10 sm:p-5 lg:right-auto lg:bottom-6 lg:left-6 lg:mx-0"
        >
          <p className="font-extrabold">{labels.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {labels.text}{" "}
            <Link href={policyHref} className="font-semibold text-text underline underline-offset-2">
              {labels.policyLink}
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => save({ analytics: false, marketing: false })} className={buttonClasses({ variant: "dark", size: "sm" })}>
              {labels.rejectAll}
            </button>
            <button type="button" onClick={() => save({ analytics: true, marketing: true })} className={buttonClasses({ variant: "dark", size: "sm" })}>
              {labels.acceptAll}
            </button>
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            className="mt-3 w-full text-center text-sm font-semibold text-muted underline underline-offset-2 hover:text-text"
          >
            {labels.customize}
          </button>
        </div>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="fc-consent-title"
        className="m-auto w-[min(32rem,calc(100%-1.5rem))] rounded-xl bg-white p-0 text-text shadow-float backdrop:bg-black/50"
      >
        <div className="p-6">
          <h2 id="fc-consent-title" className="text-xl font-extrabold">
            {labels.preferencesTitle}
          </h2>
          <div className="mt-4 divide-y divide-line border-y border-line">
            <div className="flex items-start justify-between gap-4 py-4">
              <span>
                <span className="block font-bold">{labels.categories.necessary.title}</span>
                <span className="mt-1 block text-sm text-muted">{labels.categories.necessary.text}</span>
              </span>
              <span className="mt-1 shrink-0 text-xs font-bold text-success">{labels.alwaysOn}</span>
            </div>
            {hasAnalytics && toggle("analytics", labels.categories.analytics.title, labels.categories.analytics.text)}
            {hasMarketing && toggle("marketing", labels.categories.marketing.title, labels.categories.marketing.text)}
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => save({ analytics: false, marketing: false })} className={buttonClasses({ variant: "outline", size: "sm" })}>
              {labels.rejectAll}
            </button>
            <button type="button" onClick={() => save(prefs)} className={buttonClasses({ variant: "dark", size: "sm" })}>
              {labels.save}
            </button>
          </div>
          <Link href={policyHref} className="mt-4 block text-center text-sm font-semibold text-muted underline underline-offset-2">
            {labels.policyLink}
          </Link>
        </div>
      </dialog>
    </>
  );
}
