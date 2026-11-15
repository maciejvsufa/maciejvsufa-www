import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HtmlLang } from "@/components/html-lang";
import { Foot } from "@/components/sections/cv-sections";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

const TITLE = "CV — Maciej V. Sufa, content creator";
const DESC = "Downloadable CV: content creator, author, 17 years on camera. PDF and DOCX.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/en/cv/", languages: { pl: "/cv/", en: "/en/cv/", "x-default": "/cv/" } },
  openGraph: { title: TITLE, description: DESC, url: `${site.url}/en/cv/`, siteName: site.name, locale: "en_US", type: "website" },
};

export default function CvEn() {
  return (
    <>
      <HtmlLang lang="en" />
      <SiteHeader t={content.en} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[760px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold uppercase text-text">CV</h1>
        <p className="mt-4 text-[18px] leading-[1.6] text-text2">
          Content creator and author. 17 years on camera; today short-form video from script to data-driven takeaways.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          <a className="lnk" href="/cv/Maciej_Sufa_CV_EN.pdf">CV in English (PDF)</a>
          <a className="lnk" href="/cv/Maciej_Sufa_CV_EN.docx">CV in English (DOCX)</a>
          <a className="lnk" href="/en/portfolio/">Portfolio</a>
        </p>
        <Foot t={content.en} />
      </main>
    </>
  );
}
