import type { NextConfig } from "next";
import { getMissingBusinessFields } from "./src/config/business";

const isProd = process.env.NODE_ENV === "production";
const nonDefaultLocales = ["ru", "it", "en"];

const missing = getMissingBusinessFields();
if (missing.length > 0) {
  console.warn(
    `\n[ForceCar] ⚠ Date de business lipsă în src/config/business.ts: ${missing.join(", ")}.\n` +
      `           Elementele aferente sunt ascunse automat până la completare.\n`,
  );
}
if (isProd && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn("[ForceCar] ⚠ NEXT_PUBLIC_SITE_URL nu este setat — canonical/hreflang/sitemap vor folosi localhost.\n");
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      ...(isProd ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 160, 256, 320, 384],
    qualities: [60, 72, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // Rădăcina respectă doar alegerea explicită a vizitatorului (cookie), nu limba browserului.
      ...nonDefaultLocales.map((locale) => ({
        source: "/",
        has: [{ type: "cookie" as const, key: "fc_locale", value: locale }],
        destination: `/${locale}`,
        permanent: false,
      })),
      { source: "/", destination: "/ro", permanent: false },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },
};

export default nextConfig;
