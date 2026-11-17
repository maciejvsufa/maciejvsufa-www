import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Foot } from "@/components/sections/cv-sections";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

/** Pełna filmografia pod własnym adresem (do linku w CV). Dane: content.pl.aktorstwo — to samo źródło co okno na stronie głównej. */
const TITLE = "Aktorstwo — Maciej V. Sufa: film, telewizja, teatr";
const DESC =
  "Pełna lista ról: 24 pozycje w filmie i telewizji (2010–2021), m.in. główna rola w „Gliniarzach” (Polsat), Opera Narodowa (2023 i 2025), Teatr Kamienica.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/aktorstwo/" },
  openGraph: { title: TITLE, description: DESC, url: `${site.url}/aktorstwo/`, siteName: site.name, locale: "pl_PL", type: "website" },
};

export default function Aktorstwo() {
  const a = content.pl.aktorstwo;
  return (
    <>
      <SiteHeader t={content.pl} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[760px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold uppercase text-text">Aktorstwo</h1>
        <p className="mt-4 text-[18px] leading-[1.6] text-text2">{a.lead}</p>
        <p className="mt-6">
          <a className="lnk" href="/cv/Maciej_Sufa_CV_aktorskie.pdf">CV aktorskie (PDF)</a>
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
          <span className="meta">Niezależne potwierdzenie:</span>
          {a.links.map((l) => (
            <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </p>
        <Foot t={content.pl} />
      </main>
    </>
  );
}
