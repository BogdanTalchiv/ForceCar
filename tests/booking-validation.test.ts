import { describe, expect, it } from "vitest";
import {
  createBookingId,
  detectImageType,
  normalizePhone,
  todayInChisinau,
  validateBooking,
  validatePhotos,
  type RawBooking,
} from "@/lib/booking/validation";

const ctx = { serviceIds: ["diagnostics", "brakes"], today: "2026-09-25" };

const valid: RawBooking = {
  name: "Ion Popescu",
  phone: "069 123 456",
  email: "ion.popescu@example.md",
  contactMethod: "phone",
  carBrand: "Volkswagen",
  carModel: "Passat",
  carYear: "2014",
  mileage: "215 000",
  plate: "abc 123",
  service: "brakes",
  description: "Scârțâie la frânare.",
  preferredDate: "2026-09-28",
  preferredTime: "morning",
  consent: "on",
};

describe("normalizePhone", () => {
  it("normalizează numerele moldovenești", () => {
    expect(normalizePhone("069 123 456")).toBe("+37369123456");
    expect(normalizePhone("(022) 12-34-56")).toBe("+37322123456");
    expect(normalizePhone("0037369123456")).toBe("+37369123456");
    expect(normalizePhone("373 69 123 456")).toBe("+37369123456");
  });
  it("acceptă numere internaționale", () => {
    expect(normalizePhone("+39 333 123 4567")).toBe("+393331234567");
  });
  it("respinge valori invalide", () => {
    expect(normalizePhone("123")).toBeNull();
    expect(normalizePhone("abc-def-ghi")).toBeNull();
    expect(normalizePhone("+1234567890123456")).toBeNull();
  });
});

describe("validateBooking", () => {
  it("acceptă o cerere validă și normalizează datele", () => {
    const r = validateBooking(valid, ctx);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.phone).toBe("+37369123456");
    expect(r.data.mileage).toBe(215000);
    expect(r.data.plate).toBe("ABC 123");
    expect(r.data.email).toBe("ion.popescu@example.md");
    expect(r.data.carYear).toBe(2014);
  });

  it("raportează câmpurile obligatorii lipsă", () => {
    const r = validateBooking({}, ctx);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors).toMatchObject({
      name: "required",
      phone: "required",
      email: "emailRequired",
      carBrand: "required",
      carModel: "required",
      carYear: "year",
      service: "service",
      consent: "consent",
    });
  });

  it("cere email la fiecare cerere", () => {
    const r = validateBooking({ ...valid, email: "" }, ctx);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.email).toBe("emailRequired");
  });

  it("respinge emailuri cu caractere de antet", () => {
    const r = validateBooking({ ...valid, email: "a@b.md\r\nBcc: x@y.z" }, ctx);
    expect(r.ok).toBe(false);
  });

  it("elimină CR/LF din câmpurile de un rând", () => {
    const r = validateBooking({ ...valid, name: "Ion\r\nBcc: spam@x.com" }, ctx);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.name).not.toMatch(/[\r\n]/);
  });

  it("respinge servicii necunoscute, acceptă „nu știu” și „altceva”", () => {
    expect(validateBooking({ ...valid, service: "hack" }, ctx).ok).toBe(false);
    expect(validateBooking({ ...valid, service: "unknown" }, ctx).ok).toBe(true);
    expect(validateBooking({ ...valid, service: "other" }, ctx).ok).toBe(true);
  });

  it("validează intervalul datei preferate", () => {
    expect(validateBooking({ ...valid, preferredDate: "2026-09-24" }, ctx).ok).toBe(true);
    expect(validateBooking({ ...valid, preferredDate: "2026-09-20" }, ctx).ok).toBe(false);
    expect(validateBooking({ ...valid, preferredDate: "2028-01-01" }, ctx).ok).toBe(false);
    expect(validateBooking({ ...valid, preferredDate: "not-a-date" }, ctx).ok).toBe(false);
    expect(validateBooking({ ...valid, preferredDate: "" }, ctx).ok).toBe(true);
  });

  it("validează anul și kilometrajul", () => {
    expect(validateBooking({ ...valid, carYear: "1950" }, ctx).ok).toBe(false);
    expect(validateBooking({ ...valid, carYear: "2027" }, ctx).ok).toBe(true);
    expect(validateBooking({ ...valid, carYear: "2028" }, ctx).ok).toBe(false);
    expect(validateBooking({ ...valid, mileage: "12a" }, ctx).ok).toBe(false);
  });

  it("revine la valori implicite sigure pentru opțiuni necunoscute", () => {
    const r = validateBooking({ ...valid, contactMethod: "fax", preferredTime: "midnight" }, ctx);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.contactMethod).toBe("phone");
      expect(r.data.preferredTime).toBe("any");
    }
  });
});

describe("fotografii", () => {
  const photo = (name: string, type: string, size = 100_000) => ({ name, type, size });

  it("acceptă JPEG/PNG/WEBP", () => {
    expect(validatePhotos([photo("a.jpg", "image/jpeg"), photo("b.png", "image/png"), photo("c.webp", "image/webp")])).toBeNull();
  });
  it("respinge alte tipuri și extensii", () => {
    expect(validatePhotos([photo("a.svg", "image/svg+xml")])).toBe("photoType");
    expect(validatePhotos([photo("a.exe", "image/jpeg")])).toBe("photoType");
    expect(validatePhotos([photo("a.jpg.html", "image/jpeg")])).toBe("photoType");
  });
  it("limitează numărul și dimensiunea", () => {
    expect(validatePhotos(Array.from({ length: 5 }, (_, i) => photo(`${i}.jpg`, "image/jpeg")))).toBe("photoCount");
    expect(validatePhotos([photo("a.jpg", "image/jpeg", 6 * 1024 * 1024)])).toBe("photoSize");
    expect(validatePhotos([photo("a.jpg", "image/jpeg", 0)])).toBe("photoSize");
  });

  it("detectează tipul real după semnătură", () => {
    expect(detectImageType(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe("image/jpeg");
    expect(detectImageType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe("image/png");
    expect(detectImageType(new TextEncoder().encode("RIFF\0\0\0\0WEBPVP8 "))).toBe("image/webp");
    expect(detectImageType(new TextEncoder().encode("<svg onload=alert(1)>"))).toBeNull();
    expect(detectImageType(new TextEncoder().encode("MZ\x90\0"))).toBeNull();
  });
});

describe("ID și dată", () => {
  it("generează un ID lizibil", () => {
    const id = createBookingId(new Date("2026-09-25T10:00:00Z"), (n) => new Uint8Array(n));
    expect(id).toBe("FC-260925-AAAA");
    expect(createBookingId()).toMatch(/^FC-\d{6}-[A-Z2-9]{4}$/);
  });
  it("folosește fusul orar Europe/Chisinau", () => {
    expect(todayInChisinau(new Date("2026-09-24T22:30:00Z"))).toBe("2026-09-25");
  });
});
