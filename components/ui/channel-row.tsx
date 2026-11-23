import { site } from "@/lib/site";

/** Rząd kanałów pod „Zobacz rolkę” i pod pobieraniem CV. LinkedIn zostaje w stopce i w CV. */
const channels = [
  { href: site.socials.tiktok, label: "TikTok" },
  { href: site.socials.instagram, label: "Instagram" },
  { href: site.socials.youtube, label: "YouTube" },
  { href: site.socials.facebook, label: "Facebook" },
] as const;

export function ChannelRow() {
  return (
    <p className="channel-row">
      {channels.map((c) => (
        <a key={c.label} className="lnk" href={c.href} target="_blank" rel="noopener noreferrer">
          {c.label}
        </a>
      ))}
    </p>
  );
}
