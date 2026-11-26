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
  "Content creator and author. 17 years on camera. Short-form video from script to results — 581k views on one reel in 7 days.";

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
  { href: reelLinks.recordFb, label: "Facebook · 324,722" },
  { href: reelLinks.recordYt, label: "YouTube · 165,528" },
  { href: reelLinks.recordTt, label: "TikTok · 75,864" },
  { href: reelLinks.recordIg, label: "Instagram · 14,812" },
];

const cards = [
  {
    title: "Modlitwa, którą znasz od dziecka, brzmi inaczej, niż myślisz.",
    meta: "18.11.2026 · hook and distribution",
    numbers:
      "580,926 views in 7 days. Facebook 324,722 and 4,082 likes. YouTube 165,528, 2,226 likes, 261 comments, 795 shares. TikTok 75,864, 1,287 likes, 348 comments, 329 shares. Instagram 14,812 (reach 11,591), 288 likes, 72 comments, 124 shares, 124 saves, 608 interactions.",
    shows: "One hook in the first line, the same video on four platforms, hundreds of comments.",
    href: reelLinks.recordYt,
    link: "YouTube",
  },
  {
    title: "Po tym jednym słowie widać, czy związek przetrwa",
    meta: "22.10.2026 · Instagram · an idea people save",
    numbers: "10,334 views, 120 saves, 53 shares.",
    shows: "People save this reel and come back to it.",
    href: reelLinks.ig2210,
    link: "Instagram",
  },
  {
    title: "Idziesz jutro na groby?",
    meta: "31.10.2026 · TikTok · community",
    numbers: "7,379 views, 177 comments.",
    shows: "A lot of conversation for a smaller reach. People join in, it is not only views.",
    href: reelLinks.groby,
    link: "TikTok",
  },
  {
    title: "Finowie zaczynają później…",
    meta: "19.11.2026 · Facebook / YouTube · a fact that travels",
    numbers: "Facebook 4,137 views, YouTube 2,240, Instagram 1,414 (average watch on Instagram 12.4 s, skip 32.4%).",
    shows: "A concrete fact in the first line. People stay longer than they do with a question alone.",
    href: reelLinks.finowie,
    link: "Facebook",
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
          whose first-line hook reached 580,926 views on 4 platforms in 7 days (518,258 in 5 days, as of 23.11; 402,566 in the first two days, as of 20.11).
        </p>

        <section className="pcard mt-10" aria-labelledby="h-01">
          <p className="meta mb-2">01 · Personal brand</p>
          <h2 id="h-01" className="font-display text-[24px] font-semibold text-text">
            581k views in 7 days
          </h2>
          <p className="mt-2 leading-[1.6] text-text2">
            On 18.11.2026 I recorded one reel with a hook in the first line and published it on Facebook, YouTube, TikTok
            and Instagram. In 7 days it reached 580,926 views. In 5 days, as of 23.11, it was 518,258; in two days, as of
            20.11, it was already at 402,566. I do this myself, from the idea through publishing to the conversation in
            the comments.
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
              Reel of 18.11.2026: 580,926 views in 7 days. 681 comments and 1,248 shares on Instagram, TikTok and YouTube
              (Facebook: 4,082 likes; this measure does not include Facebook comments). On then-new YouTube and TikTok
              accounts — first videos 22.10.2026 — the same reel: 241,392 views, 609 comments, 1,124 shares. In 14 days
              (12–25.11) Facebook followers grew from 4,489 to 5,169 (+680, about +15%).
            </p>
            <p className="mt-2 font-mono text-[13px] text-text3">Source: Metricool, as of 25.11.2026.</p>
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
