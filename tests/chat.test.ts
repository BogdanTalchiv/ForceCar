import { describe, expect, it } from "vitest";
import { detectService, fallbackReply, needsSafetyWarning } from "@/lib/chat/fallback";
import { buildSystemPrompt } from "@/lib/chat/knowledge";
import { findPolicyViolation, parseMarkers } from "@/lib/chat/postprocess";
import { getProviderConfig } from "@/lib/chat/providers";

describe("detectService", () => {
  it("recunoaște serviciile în toate limbile", () => {
    expect(detectService("Îmi scârțâie frânele")).toBe("brakes");
    expect(detectService("Scartaie franele")).toBe("brakes");
    expect(detectService("Скрипят тормоза")).toBe("brakes");
    expect(detectService("Quando cambiare la cinghia di distribuzione?")).toBe("timing");
    expect(detectService("My check engine light is on")).toBe("diagnostics");
    expect(detectService("Vreau schimb ulei și filtre")).toBe("mechanical");
    expect(detectService("Iese fum de la motor")).toBe("engine");
  });
  it("nu ghicește fără indicii", () => {
    expect(detectService("Bună ziua")).toBeUndefined();
  });
});

describe("fallbackReply", () => {
  it("răspunde la preț fără a inventa sume", () => {
    const r = fallbackReply("ro", "Cât costă schimbarea plăcuțelor de frână?");
    expect(r.mode).toBe("fallback");
    expect(r.serviceId).toBe("brakes");
    expect(findPolicyViolation(r.reply)).toBeNull();
    expect(r.actions.some((a) => a.type === "booking")).toBe(true);
  });
  it("nu inventează programul când nu este configurat", () => {
    for (const locale of ["ro", "ru", "it", "en"] as const) {
      const r = fallbackReply(locale, locale === "ru" ? "Какой у вас график работы?" : "program orar hours orario");
      expect(r.reply).not.toMatch(/\d{1,2}[:.]\d{2}/);
    }
  });
  it("adaugă avertisment de siguranță pentru simptome periculoase", () => {
    expect(needsSafetyWarning("pedala de frână merge până jos")).toBe(true);
    expect(needsSafetyWarning("vreau o programare")).toBe(false);
  });
  it("are un răspuns implicit util pentru mesaje necunoscute", () => {
    const r = fallbackReply("en", "qwerty");
    expect(r.reply.length).toBeGreaterThan(10);
    expect(r.actions.length).toBeGreaterThan(0);
  });
});

describe("postprocess", () => {
  it("extrage marcajele și validează serviciul", () => {
    const r = parseMarkers("Vă recomandăm o diagnoză. [[service:diagnostics]] [[booking]]");
    expect(r.text).toBe("Vă recomandăm o diagnoză.");
    expect(r.serviceId).toBe("diagnostics");
    expect(r.actions).toEqual([{ type: "booking", serviceId: "diagnostics" }]);
    expect(parseMarkers("x [[service:nu-exista]]").serviceId).toBeUndefined();
  });
  it("respinge prețuri și numere de telefon inventate", () => {
    expect(findPolicyViolation("Costă aproximativ 500 lei.")).toBe("price");
    expect(findPolicyViolation("Around €80 usually.")).toBe("price");
    expect(findPolicyViolation("Примерно 1000 лей")).toBe("price");
    expect(findPolicyViolation("Sunați la 069 123 456")).toBe("phone");
    expect(findPolicyViolation("Call +373 22 123 456")).toBe("phone");
  });
  it("nu respinge kilometraje sau ani", () => {
    expect(findPolicyViolation("Cureaua se schimbă de obicei la 60 000 – 120 000 km sau la 5–6 ani.")).toBeNull();
    expect(findPolicyViolation("Mașinile din 2015 au adesea această problemă.")).toBeNull();
  });
});

describe("knowledge", () => {
  it("promptul conține regulile și marchează datele nepublicate", () => {
    const prompt = buildSystemPrompt("ro");
    expect(prompt).toContain("NOT PUBLISHED");
    expect(prompt).toContain("[[booking]]");
    expect(prompt).not.toMatch(/\d+\s?lei/i);
  });
  it("fără variabile de mediu, AI este dezactivat", () => {
    expect(getProviderConfig()).toBeNull();
  });
});
