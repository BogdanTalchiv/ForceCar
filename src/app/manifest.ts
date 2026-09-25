import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ForceCar — Service auto Chișinău",
    short_name: "ForceCar",
    start_url: "/ro",
    display: "browser",
    background_color: "#111315",
    theme_color: "#111315",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
