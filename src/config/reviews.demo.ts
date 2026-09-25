/**
 * DATE DEMONSTRATIVE — NU SUNT RECENZII REALE.
 * Folosite exclusiv pe pagina internă /<limba>/dev (disponibilă doar în development)
 * pentru a testa designul componentelor. Nu sunt importate în nicio pagină publică.
 */
import type { Review, VideoReview } from "./reviews";

export const demoReviews: Review[] = [
  {
    id: "demo-1",
    customer: "[DEMO] Client test",
    vehicle: "[DEMO] Automobil test",
    language: "ro",
    text: "[DEMO] Text de probă pentru verificarea designului cardului de recenzie. Nu este o recenzie reală.",
    rating: 5,
    date: "2026-01-01",
    source: "site",
  },
  {
    id: "demo-2",
    customer: "[DEMO] Тестовый клиент",
    language: "ru",
    text: "[DEMO] Тестовый текст для проверки карточки отзыва. Это не настоящий отзыв.",
    date: "2026-01-02",
    source: "site",
  },
];

export const demoVideoReviews: VideoReview[] = [
  {
    id: "demo-video-1",
    customer: "[DEMO] Client video",
    vehicle: "[DEMO]",
    language: "ro",
    quote: "[DEMO] Citat de probă pentru componenta video.",
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    date: "2026-01-03",
    source: "video",
  },
];
