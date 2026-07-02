import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { CosmosLayerLazy } from "@/components/fx/cosmos-layer-lazy";
import { RunesDefs } from "@/components/ui/runes-defs";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description:
    "Usprawniam i automatyzuję procesy w firmach z AI — audyt, automatyzacje, aplikacje i rozwiązania AI. Współtwórca Asistel. Współpraca zdalna (B2B/etat), PL/EU.",
  alternates: {
    canonical: "/",
    languages: { pl: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    title: site.title,
    description:
      "I audit, automate and streamline company processes with AI — automations, apps and AI solutions. Co-creator of Asistel. Open to remote work (PL/EU).",
    url: site.url,
    siteName: site.name,
    locale: "pl_PL",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.title },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.jobTitle,
  email: `mailto:${site.email}`,
  sameAs: [site.socials.github, site.socials.linkedin],
  knowsAbout: ["AI automation", "frontend development", "n8n", "MCP", "AI agents", "Next.js", "Python"],
  knowsLanguage: ["pl", "en"],
  workLocation: { "@type": "Place", name: "Remote" },
  address: { "@type": "PostalAddress", addressLocality: "Łódź", addressCountry: "PL" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${dmSans.variable} ${dmMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/portrait-cutout-480.webp"
          type="image/webp"
          media="(max-width: 720px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/portrait-cutout.webp"
          type="image/webp"
          media="(min-width: 721px)"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full">
        <RunesDefs />
        <CosmosLayerLazy />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
