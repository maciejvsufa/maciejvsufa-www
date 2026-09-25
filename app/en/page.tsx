import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { HtmlLang } from "@/components/html-lang";
import { content } from "@/lib/content";
import { site } from "@/lib/site";

const EN_TITLE = "Maciej V. Sufa — Social Media Content Creator (AI-powered)";

export const metadata: Metadata = {
  title: EN_TITLE,
  description: site.descriptionEn,
  alternates: {
    canonical: "/en/",
    languages: { pl: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    title: EN_TITLE,
    description: site.descriptionEn,
    url: `${site.url}/en/`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: EN_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: EN_TITLE,
    images: ["/og-image.png"],
  },
};

export default function HomeEn() {
  return (
    <>
      <HtmlLang lang="en" />
      <HomePage t={content.en} />
    </>
  );
}
