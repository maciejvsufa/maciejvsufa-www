import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HtmlLang } from "@/components/html-lang";
import { Foot } from "@/components/sections/cv-sections";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

const TITLE = "Acting — Maciej V. Sufa: film, television, theatre";
const DESC =
  "Full credit list: 24 film and television roles (2010–2021), including the lead in “Gliniarze” (Polsat), Polish National Opera (2023 and 2025), Teatr Kamienica.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/en/aktorstwo/",
    languages: { pl: "/aktorstwo/", en: "/en/aktorstwo/", "x-default": "/aktorstwo/" },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${site.url}/en/aktorstwo/`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.png"] },
};

export default function AktorstwoEn() {
  const a = content.en.aktorstwo;
  return (
    <>
      <HtmlLang lang="en" />
      <SiteHeader t={content.en} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[760px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold uppercase text-text">Acting</h1>
        <p className="mt-4 text-[18px] leading-[1.6] text-text2">{a.lead}</p>
        <p className="mt-6">
          <a className="lnk" href="/cv/Maciej_Sufa_CV_aktorskie.pdf">
            Acting CV (PDF)
          </a>
        </p>

        <h2 className="mt-10 font-display text-[22px] font-semibold text-text">{a.filmLabel}</h2>
        <ul className="mt-3 divide-y divide-line">
          {a.film.map((r) => (
            <li key={`${r.y}-${r.t}-${r.r}`} className="flex gap-4 py-2.5 leading-[1.5]">
              <span className="w-[86px] shrink-0 font-mono text-[13px] text-text3">{r.y}</span>
              <span className="text-text2">
                <b className="font-semibold text-text">{r.t}</b>
                {r.main ? <span className="ml-2 font-mono text-[12px] text-accent2">{a.mainRole}</span> : null}
                <br />
                <small className="text-[14px]">{r.r}</small>
              </span>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-[22px] font-semibold text-text">{a.stageLabel}</h2>
        <ul className="mt-3 divide-y divide-line">
          {a.stage.map((r) => (
            <li key={`${r.y}-${r.t}`} className="flex gap-4 py-2.5 leading-[1.5]">
              <span className="w-[86px] shrink-0 font-mono text-[13px] text-text3">{r.y}</span>
              <span className="text-text2">
                <b className="font-semibold text-text">{r.t}</b>
                <br />
                <small className="text-[14px]">{r.r}</small>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="meta">{a.linksLabel}:</span>
          {a.links.map((l) => (
            <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </p>
        <Foot t={content.en} />
      </main>
    </>
  );
}
