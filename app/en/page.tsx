import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { HtmlLang } from "@/components/html-lang";
import { content } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Maciej Sufa — AI process & automation specialist",
  description:
    "I audit, automate and streamline company processes with AI — automations, apps and AI solutions. Co-creator of Asistel. Open to remote work (PL/EU).",
  alternates: {
    canonical: "/en/",
    languages: { pl: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    title: "Maciej Sufa — AI process & automation specialist",
    description:
      "I audit, automate and streamline company processes with AI — automations, apps and AI solutions. Co-creator of Asistel. Open to remote work (PL/EU).",
    url: `${site.url}/en/`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Maciej Sufa — AI process & automation specialist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maciej Sufa — AI process & automation specialist",
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
