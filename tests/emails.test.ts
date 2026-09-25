import { describe, expect, it } from "vitest";
import { buildCustomerEmail, buildInternalEmail, type BookingMeta } from "@/lib/booking/emails";
import type { BookingData } from "@/lib/booking/validation";

const data: BookingData = {
  name: `Ion <script>alert("x")</script>`,
  phone: "+37369123456",
  email: "ion@example.md",
  contactMethod: "whatsapp",
  carBrand: "BMW",
  carModel: "X5\r\nBcc: spam@evil.test",
  carYear: 2016,
  mileage: 180000,
  plate: "ABC 123",
  service: "brakes",
  description: "Vibrează volanul <b>la frânare</b>",
  preferredDate: "2026-09-28",
  preferredTime: "morning",
};

const meta: BookingMeta = {
  id: "FC-260925-AB12",
  locale: "ru",
  page: "/ru/zapis",
  utm: { utm_source: "google", utm_campaign: "frane-toamna", gclid: "abc123" },
  submittedAt: new Date("2026-09-25T09:00:00Z"),
  photoCount: 2,
};

describe("emailul intern", () => {
  const mail = buildInternalEmail(data, meta);

  it("are subiectul cerut, pe un singur rând", () => {
    expect(mail.subject.startsWith("Programare nouă ForceCar — Ion")).toBe(true);
    expect(mail.subject).toContain("BMW X5");
    expect(mail.subject).not.toMatch(/[\r\n]/);
  });
  it("escapează datele clientului", () => {
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.html).not.toContain("<b>la frânare</b>");
  });
  it("conține acțiunile rapide și sursa cererii", () => {
    expect(mail.html).toContain('href="tel:+37369123456"');
    expect(mail.html).toContain("https://wa.me/37369123456");
    expect(mail.html).toContain("frane-toamna");
    expect(mail.text).toContain("FC-260925-AB12");
  });
});

describe("emailul către client", () => {
  const mail = buildCustomerEmail(data, meta);

  it("este în limba clientului și nu confirmă programarea", () => {
    expect(mail.html).toContain('lang="ru"');
    expect(mail.text).toContain("FC-260925-AB12");
  });
  it("nu conține date interne (UTM, pagină, telefonul clientului)", () => {
    for (const secret of ["google", "frane-toamna", "abc123", "/ru/zapis", "wa.me", "utm_"]) {
      expect(mail.html).not.toContain(secret);
      expect(mail.text).not.toContain(secret);
    }
  });
  it("escapează datele clientului", () => {
    expect(mail.html).not.toContain("<script>");
  });
});
