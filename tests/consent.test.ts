import { describe, expect, it } from "vitest";
import { CONSENT_VERSION, googleConsent, parseConsent } from "@/lib/analytics/consent";

const encode = (value: unknown) => encodeURIComponent(JSON.stringify(value));

describe("parseConsent", () => {
  it("citește alegerea curentă, inclusiv categoria funcțională", () => {
    const state = parseConsent(encode({ v: CONSENT_VERSION, analytics: false, marketing: true, functional: true, ts: 5 }));
    expect(state).toEqual({ v: CONSENT_VERSION, analytics: false, marketing: true, functional: true, ts: 5 });
  });

  it("ignoră versiunile vechi, ca bannerul să ceară din nou acordul", () => {
    expect(parseConsent(encode({ v: 1, analytics: true, marketing: true, ts: 1 }))).toBeNull();
  });

  it("tratează orice valoare care nu e exact true drept refuz", () => {
    const state = parseConsent(encode({ v: CONSENT_VERSION, analytics: "yes", marketing: 1, functional: null }));
    expect(state).toMatchObject({ analytics: false, marketing: false, functional: false });
  });

  it("respinge valori corupte", () => {
    expect(parseConsent("%7Bnot-json")).toBeNull();
    expect(parseConsent("")).toBeNull();
    expect(parseConsent(undefined)).toBeNull();
  });
});

describe("googleConsent", () => {
  it("mapează categoriile pe semnalele Consent Mode v2", () => {
    expect(googleConsent({ analytics: true, marketing: false, functional: true })).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
      functionality_storage: "granted",
      security_storage: "granted",
    });
  });
});
