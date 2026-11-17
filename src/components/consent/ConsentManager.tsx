"use client";

import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/ro";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentCategory,
  type ConsentChoice,
} from "@/lib/analytics/consent";
import { clearLongUtm, promoteUtm } from "@/lib/analytics/utm";
import { applyConsent } from "./tags";

const none: ConsentChoice = { analytics: false, marketing: false, functional: false };

/** Butoane care pot trece pe două rânduri: etichetele traduse nu încap pe 320 px într-un singur rând. */
const wrapBtn =
  "inline-flex min-h-11 items-center justify-center rounded-md px-3 py-2 text-center text-sm leading-tight font-bold transition-colors duration-200";
const darkBtn = `${wrapBtn} bg-ink-900 text-white hover:bg-ink-700`;
const outlineBtn = `${wrapBtn} text-text ring-1 ring-inset ring-line hover:bg-mist hover:ring-ink-900/40`;
const optional: ConsentCategory[] = ["functional", "analytics", "marketing"];

/**
 * Banner + preferințe cookie. Sunt afișate doar categoriile care există efectiv (`available`).
 * „Accept toate” și „Refuz opționalele” au aceeași vizibilitate; nimic nu este preselectat.
 */
export function ConsentManager({
  labels,
  policyHref,
  available,
}: {
  labels: Dictionary["consent"];
  policyHref: string;
  available: ConsentChoice;
}) {
  const [banner, setBanner] = useState<"hidden" | "shown" | "leaving">("hidden");
  const [prefs, setPrefs] = useState<ConsentChoice>(none);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const stored = readConsent();
    if (stored) applyConsent(stored);
    queueMicrotask(() => (stored ? setPrefs(stored) : setBanner("shown")));
    const openPrefs = () => {
      setPrefs(readConsent() ?? none);
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_CONSENT_EVENT, openPrefs);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openPrefs);
  }, []);

  const save = (choice: ConsentChoice) => {
    const state = writeConsent({
      analytics: available.analytics && choice.analytics,
      marketing: available.marketing && choice.marketing,
      functional: available.functional && choice.functional,
    });
    applyConsent(state);
    if (state.analytics) promoteUtm();
    else clearLongUtm();
    setPrefs(state);
    setBanner((b) => (b === "shown" ? "leaving" : b));
    dialog.current?.close();
  };

  const acceptAll = () => save({ analytics: true, marketing: true, functional: true });
  const rejectOptional = () => save(none);

  return (
    <>
      {banner !== "hidden" && (
        <section
          aria-labelledby="fc-consent-banner-title"
          onAnimationEnd={() => setBanner((b) => (b === "leaving" ? "hidden" : b))}
          className={`fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[45] mx-auto max-w-[29rem] rounded-xl bg-white p-4 text-text shadow-float ring-1 ring-black/8 sm:p-5 lg:right-auto lg:bottom-6 lg:left-6 lg:mx-0 ${
            banner === "leaving" ? "fc-consent-out" : "fc-consent-in"
          }`}
        >
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-0.5 hidden size-9 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand sm:flex">
              <Cookie className="size-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <h2 id="fc-consent-banner-title" className="text-[0.9375rem] font-extrabold sm:text-base">
                {labels.title}
              </h2>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted sm:mt-1.5 sm:text-sm">
                {labels.text}{" "}
                <Link href={policyHref} className="font-semibold text-text underline underline-offset-2 hover:text-brand">
                  {labels.policyLink}
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
            <button type="button" onClick={rejectOptional} className={darkBtn}>
              {labels.rejectAll}
            </button>
            <button type="button" onClick={acceptAll} className={darkBtn}>
              {labels.acceptAll}
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setPrefs(readConsent() ?? none);
              dialog.current?.showModal();
            }}
            className="mt-1 flex min-h-11 w-full items-center justify-center rounded-md text-sm font-semibold text-muted underline underline-offset-2 hover:text-text sm:mt-2"
          >
            {labels.customize}
          </button>
        </section>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="fc-consent-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="fc-consent-dialog m-auto max-h-[calc(100dvh-1.5rem)] w-[min(34rem,calc(100%-1.5rem))] overflow-y-auto rounded-xl bg-white p-0 text-text shadow-float backdrop:bg-ink-950/60"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="fc-consent-title" className="text-xl font-extrabold">
              {labels.preferencesTitle}
            </h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label={labels.close}
              className="-mt-1 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-md text-muted hover:bg-mist hover:text-text"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{labels.preferencesText}</p>
          <div className="mt-4 divide-y divide-line border-y border-line">
            <div className="flex items-start justify-between gap-4 py-4">
              <span>
                <span className="block font-bold">{labels.categories.necessary.title}</span>
                <span className="mt-1 block text-sm text-muted">{labels.categories.necessary.text}</span>
              </span>
              <span className="mt-1 shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">{labels.alwaysOn}</span>
            </div>
            {optional
              .filter((key) => available[key])
              .map((key) => (
                <label key={key} className="flex cursor-pointer items-start justify-between gap-4 py-4">
                  <span>
                    <span className="block font-bold">{labels.categories[key].title}</span>
                    <span className="mt-1 block text-sm text-muted">{labels.categories[key].text}</span>
                  </span>
                  <input
                    type="checkbox"
                    role="switch"
                    checked={prefs[key]}
                    onChange={(e) => setPrefs((p) => ({ ...p, [key]: e.target.checked }))}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className="relative mt-1 h-6 w-11 shrink-0 rounded-full bg-steel-200 transition-colors peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
                  />
                </label>
              ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button type="button" onClick={rejectOptional} className={outlineBtn}>
              {labels.rejectAll}
            </button>
            <button type="button" onClick={acceptAll} className={outlineBtn}>
              {labels.acceptAll}
            </button>
            <button type="button" onClick={() => save(prefs)} className={`${darkBtn} col-span-2`}>
              {labels.save}
            </button>
          </div>
          <Link href={policyHref} className="mt-4 block text-center text-sm font-semibold text-muted underline underline-offset-2 hover:text-text">
            {labels.policyLink}
          </Link>
        </div>
      </dialog>
    </>
  );
}
