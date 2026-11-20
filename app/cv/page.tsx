import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Foot } from "@/components/sections/cv-sections";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

const TITLE = "CV — Maciej V. Sufa, content creator";
const DESC = "CV do pobrania: content creator, autor, 17 lat przed kamerą. PDF i DOCX.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/cv/", languages: { pl: "/cv/", en: "/en/cv/", "x-default": "/cv/" } },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${site.url}/cv/`,
    siteName: site.name,
    locale: "pl_PL",
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

export default function Cv() {
  return (
    <>
      <SiteHeader t={content.pl} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[760px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold uppercase text-text">CV</h1>
        <p className="mt-4 text-[18px] leading-[1.6] text-text2">
          Content creator i autor. 17 lat przed kamerą, dziś krótkie wideo od scenariusza po wnioski z liczb.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          <a className="lnk" href="/cv/Maciej_Sufa_CV.pdf">CV po polsku (PDF)</a>
          <a className="lnk" href="/cv/Maciej_Sufa_CV.docx">CV po polsku (DOCX)</a>
          <a className="lnk" href="/cv/Maciej_Sufa_CV_aktorskie.pdf">CV aktorskie (PDF)</a>
          <a className="lnk" href="/portfolio/">Portfolio</a>
        </p>
        <Foot t={content.pl} />
      </main>
    </>
  );
}
