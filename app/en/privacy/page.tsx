import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HtmlLang } from "@/components/html-lang";
import { Foot } from "@/components/sections/cv-sections";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

const TITLE = "Privacy policy — Maciej V. Sufa";
const DESC = "What data maciejvsufa.pl collects, who the controller is and what your rights are.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/en/privacy/",
    languages: { pl: "/privacy/", en: "/en/privacy/", "x-default": "/privacy/" },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${site.url}/en/privacy/`,
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
  robots: { index: false, follow: true },
};

export default function PrivacyEn() {
  return (
    <>
      <HtmlLang lang="en" />
      <SiteHeader t={content.en} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[760px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-bold uppercase text-text">
          Privacy policy
        </h1>
        <div className="mt-6 space-y-4 leading-[1.65] text-text2">
          <p>
            This is a static, privacy-minded website. It <strong>does not use</strong> advertising
            pixels, and it does not sell or share your data for advertising.
          </p>
          <p>
            Visit statistics come from <strong>Metricool</strong> (Metricool Software S.L., Spain).
            When the page loads, the Metricool script counts visits and collects technical data:
            pages viewed, the referring source (for example a link from Instagram) and the browser
            window size; on Metricool&apos;s side also the IP address (and an approximate location
            derived from it) and the device and browser type. The script <strong>does not store</strong>{" "}
            cookies or any other data in your browser. I only see aggregate statistics. Details:{" "}
            <a
              className="text-accent hover:text-accent2"
              href="https://metricool.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Metricool privacy policy
            </a>
            . You can block these statistics with any content blocker.
          </p>
          <p>
            Contact works through an e-mail link (mailto). If you write to{" "}
            <a className="text-accent hover:text-accent2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            , your message reaches my Gmail inbox and is used only to reply and, possibly, to work
            together. I do not share it with third parties.
          </p>
          <p>
            The site is hosted as static files. The hosting provider may process standard server
            logs (IP address, technical information) for security and diagnostics.
          </p>
          <p>You have the right to access, correct and delete your data. Write to the address above.</p>
          <p className="font-mono text-[13px] text-text3">
            Controller: {site.name}, sole proprietorship {site.company.name}, NIP (tax ID){" "}
            {site.company.nip}, {site.company.city}, Poland. Contact: {site.email}.
          </p>
        </div>
        <Foot t={content.en} />
      </main>
    </>
  );
}
