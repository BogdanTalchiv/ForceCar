import { socialLinks } from "@/lib/business-info";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./MessengerBrandIcons";

const brands = {
  facebook: { Icon: FacebookIcon, style: "text-[#1877F2] hover:bg-[#1877F2]/15" },
  instagram: { Icon: InstagramIcon, style: "text-[#E4405F] hover:bg-[#E4405F]/15" },
  tiktok: { Icon: TikTokIcon, style: "text-white hover:bg-white/10" },
} as const;

type BrandId = keyof typeof brands;

export function HeaderSocials({
  labels,
  trackLocation = "header",
  className = "flex items-center gap-0.5",
}: {
  labels: Record<BrandId, string> & { newTab: string };
  trackLocation?: string;
  className?: string;
}) {
  const links = socialLinks().filter((s): s is { id: BrandId; href: string } => s.id in brands);
  if (!links.length) return null;

  return (
    <div className={className}>
      {links.map((s) => {
        const { Icon, style } = brands[s.id];
        return (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels[s.id]}
            title={labels[s.id]}
            data-track-location={trackLocation}
            className={`flex size-10 items-center justify-center rounded-full transition-[background-color,transform] duration-200 hover:scale-[1.06] lg:size-8 ${style}`}
          >
            <Icon />
            <span className="sr-only">{labels.newTab}</span>
          </a>
        );
      })}
    </div>
  );
}
