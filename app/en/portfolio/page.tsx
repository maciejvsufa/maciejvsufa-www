import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HtmlLang } from "@/components/html-lang";
import { Foot } from "@/components/sections/cv-sections";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

/** EN v0: one line + links. Full English version after the Polish one is approved. */
const TITLE = "Portfolio — Maciej V. Sufa, social media content creator";
const DESC = "Social media content creator, 17 years on camera. Short-form video from script to analytics. Remote, PL/EU.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/en/portfolio/",
    languages: { pl: "/portfolio/", en: "/en/portfolio/", "x-default": "/portfolio/" },
  },
  openGraph: { title: TITLE, description: DESC, url: `${site.url}/en/portfolio/`, siteName: site.name, locale: "en_US", type: "website" },
};

const links = [
  { href: "/portfolio/", label: "Full portfolio (Polish)" },
  { href: site.socials.instagram, label: "Instagram" },
  { href: site.socials.tiktok, label: "TikTok" },
  { href: site.socials.youtube, label: "YouTube" },
  { href: site.socials.linkedin, label: "LinkedIn" },
];

export default function PortfolioEn() {
  return (
    <>
      <HtmlLang lang="en" />
      <SiteHeader t={content.en} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[760px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold uppercase text-text">Portfolio</h1>
        <p className="mt-4 text-[18px] leading-[1.6] text-text2">
          Social media content creator, 17 years on camera. The English portfolio is in progress (as of
          15.11.2026). Contact:{" "}
          <a className="lnk" href={`mailto:${site.email}?subject=Portfolio`}>
            {site.email}
          </a>
          .
        </p>
        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {links.map((s) => (
            <a
              key={s.label}
              className="lnk"
              href={s.href}
              {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {s.label}
              {s.href.startsWith("http") ? " ↗" : ""}
            </a>
          ))}
        </p>
        <Foot t={content.en} />
      </main>
    </>
  );
}
