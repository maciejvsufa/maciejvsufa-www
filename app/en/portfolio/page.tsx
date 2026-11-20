import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HtmlLang } from "@/components/html-lang";
import { Foot } from "@/components/sections/cv-sections";
import { RecordEmbed } from "@/components/sections/record-embed";
import { site } from "@/lib/site";
import { content } from "@/lib/content";
import { reelLinks } from "@/lib/reels";

const TITLE = "Portfolio — Maciej V. Sufa, content creator";
const DESC =
  "Content creator and author. 17 years on camera. Short-form video from script to results — including a reel that reached 402,566 views in two days.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/en/portfolio/",
    languages: { pl: "/portfolio/", en: "/en/portfolio/", "x-default": "/portfolio/" },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${site.url}/en/portfolio/`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og-image.png"],
  },
};

const recordLinks = [
  { href: reelLinks.recordFb, label: "Facebook · 237,414" },
  { href: reelLinks.recordYt, label: "YouTube · 85,330" },
  { href: reelLinks.recordTt, label: "TikTok · 66,956" },
  { href: reelLinks.recordIg, label: "Instagram · 12,866" },
];

const cards = [
  {
    title: "Modlitwa, którą znasz od dziecka, brzmi inaczej, niż myślisz.",
    meta: "18.11.2026 · hook and distribution",
    numbers:
      "402,566 views in 2 days. Facebook 237,414 and 2,920 likes. YouTube 85,330, 1,376 likes, 157 comments, 441 shares. TikTok 66,956, 1,147 likes, 319 comments, 291 shares. Instagram 12,866, 236 likes, 54 comments, 112 shares, 104 saves.",
    shows: "One comment on something people were already thinking about. The same video on four platforms, hundreds of comments.",
    href: reelLinks.recordYt,
    link: "YouTube",
  },
  {
    title: "Po tym jednym słowie widać, czy związek przetrwa",
    meta: "22.10.2026 · Instagram · an idea people save",
    numbers: "10,198 views, 120 saves, 53 shares.",
    shows: "People save this reel and come back to it.",
    href: reelLinks.ig2210,
    link: "Instagram",
  },
  {
    title: "Idziesz jutro na groby?",
    meta: "31.10.2026 · TikTok · community",
    numbers: "7,336 views, 177 comments.",
    shows: "A lot of conversation for a smaller reach. People join in, it is not only views.",
    href: reelLinks.groby,
    link: "TikTok",
  },
  {
    title: "Zostaniesz sama? Sama to nie samotna.",
    meta: "13.11.2026 · YouTube · voice and theme",
    numbers: "1,690 views.",
    shows: "A subject I stay with. Camera craft, not only one viral spike.",
    href: reelLinks.samotna,
    link: "YouTube",
  },
];

export default function PortfolioEn() {
  return (
    <>
      <HtmlLang lang="en" />
      <SiteHeader t={content.en} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[860px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold uppercase text-text">Portfolio</h1>
        <p className="mt-4 max-w-[640px] text-[18px] leading-[1.6] text-text2">
          Content creator and author. 17 years on camera. Short-form video from script to results — including a reel
          that reached 402,566 views in two days.
        </p>

        <section className="pcard mt-10" aria-labelledby="h-01">
          <p className="meta mb-2">01 · Personal brand</p>
          <h2 id="h-01" className="font-display text-[24px] font-semibold text-text">
            402k views in 2 days
          </h2>
          <p className="mt-2 leading-[1.6] text-text2">
            On 18.11.2026 I recorded a reel about a prayer you have known since childhood: it does not say what you
            think it says. In two days it reached 402,566 views on Facebook, YouTube, TikTok and Instagram. I do this
            myself, from the idea through publishing to the conversation in the comments.
          </p>
          <RecordEmbed title="YouTube reel of 18.11.2026: Papież poprawił „Ojcze nasz”" />
          <p className="reel-links">
            {recordLinks.map((l) => (
              <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </p>
          <div className="results-strip">
            <p className="font-semibold text-text">Channel results @maciejvsufa</p>
            <p className="mt-2 leading-[1.6] text-text2">
              Facebook 5k followers · Instagram 3,629 · YouTube 217 (65 on 15.11) · TikTok 76.
            </p>
            <p className="mt-2 font-mono text-[13px] text-text3">
              Source: Metricool, as of 20.11.2026 unless noted otherwise.
            </p>
          </div>
          <ul className="mt-2 divide-y divide-line">
            {cards.map((c) => (
              <li key={c.href} className="py-4">
                <p className="font-semibold leading-[1.4] text-text">{c.title}</p>
                <p className="mt-1 font-mono text-[13px] text-text3">{c.meta}</p>
                <p className="mt-2 leading-[1.6] text-text2">{c.numbers}</p>
                <p className="mt-2 leading-[1.6] text-text2">{c.shows}</p>
                <p className="mt-2">
                  <a className="lnk" href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.link} ↗
                  </a>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-2 leading-[1.6] text-text2">
            I handle every reel end to end: idea, recording, editing in DaVinci Resolve, publishing, and the
            conversation in the comments.
          </p>
        </section>

        <p className="mt-8">
          <a className="lnk" href="/portfolio/">
            Full portfolio (Polish)
          </a>
        </p>
        <Foot t={content.en} />
      </main>
    </>
  );
}
