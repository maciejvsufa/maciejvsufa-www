import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SaltField } from "@/components/fx/salt-field";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description:
    "Usprawniam i automatyzuję procesy w firmach z AI — audyt, automatyzacje, aplikacje i rozwiązania AI. Współtwórca Asistel. Współpraca zdalna (B2B/etat), PL/EU.",
  alternates: { canonical: "/" },
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
  themeColor: "#12141a",
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
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#main" className="skip-link">
          Przejdź do treści
        </a>
        {/* żywe tło pył-sól (globalne) + miękka centralna poświata */}
        <SaltField />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 38%, rgba(201,192,173,0.07), transparent 70%)",
          }}
        />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
