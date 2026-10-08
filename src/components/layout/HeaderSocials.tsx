import { socialLinks } from "@/lib/business-info";
import { InstagramIcon, TikTokIcon } from "./MessengerBrandIcons";

const style = {
  instagram: "text-[#E4405F] hover:bg-[#E4405F]/15",
  tiktok: "text-white hover:bg-white/10",
} as const;

export function HeaderSocials({
  labels,
  trackLocation = "header",
  className = "flex items-center gap-0.5",
}: {
  labels: { instagram: string; tiktok: string; newTab: string };
  trackLocation?: string;
  className?: string;
}) {
  const links = socialLinks().filter((s) => s.id === "instagram" || s.id === "tiktok");
  if (!links.length) return null;

  return (
    <div className={className}>
      {links.map((s) => {
        const instagram = s.id === "instagram";
        return (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={instagram ? labels.instagram : labels.tiktok}
            title={instagram ? labels.instagram : labels.tiktok}
            data-track-location={trackLocation}
            className={`flex size-10 items-center justify-center rounded-full transition-[background-color,transform] duration-200 hover:scale-[1.06] lg:size-8 ${
              instagram ? style.instagram : style.tiktok
            }`}
          >
            {instagram ? <InstagramIcon /> : <TikTokIcon />}
            <span className="sr-only">{labels.newTab}</span>
          </a>
        );
      })}
    </div>
  );
}
