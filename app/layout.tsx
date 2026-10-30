import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";

// Inter Tight (Google Fonts, darmowy) to najbliższy odpowiednik Inter Display z szablonu Makro.
// next/font pobiera plik przy budowaniu i serwuje go z naszej domeny (bez połączeń z Google).
const inter = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: {
    canonical: "/",
    languages: { pl: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: { card: "summary_large_image", title: site.title, images: ["/og-image.png"] },
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

// Osoba i spółka to dwa osobne byty: w sameAs tylko profile osobiste,
// LEV (właściciel) i Tercet Labs (współudziałowiec) jako Organization powiązane z osobą przez affiliation.
const personId = `${site.url}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: site.url,
      image: `${site.url}/photos/hero-maciej.webp`,
      jobTitle: site.jobTitle,
      email: `mailto:${site.email}`,
      sameAs: [site.socials.instagram, site.socials.linkedin, site.socials.github],
      knowsAbout: [
        "social media content",
        "video editing",
        "content strategy",
        "social media automation",
        "AI agents",
        "generative AI",
      ],
      knowsLanguage: ["pl", "en"],
      affiliation: [{ "@id": `${site.url}/#lev` }, { "@id": `${site.url}/#tercetlabs` }],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Warszawska Szkoła Filmowa" },
      address: { "@type": "PostalAddress", addressCountry: "PL" },
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#lev`,
      name: "LEV",
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#tercetlabs`,
      name: "Tercet Labs sp. z o.o.",
      url: site.socials.tercetlabs,
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* tryb „jednej strony” włączony przed pierwszym rysowaniem — bez przeskoku układu (CLS);
            bez JS klasa się nie pojawia i treść stoi zwyczajnie, jedna pod drugą */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('story-on');if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('story-still')",
          }}
        />
        <link rel="preload" as="image" href="/photos/hero-maciej-900.webp" type="image/webp" media="(max-width: 809px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/photos/hero-maciej.webp" type="image/webp" media="(min-width: 810px)" fetchPriority="high" />
        {/* bez JavaScriptu treść ma być widoczna od razu */}
        <noscript>
          <style>{`.split .sp,.fade-in{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* statystyki odwiedzin Metricool — opisane w polityce prywatności (/privacy) */}
        <Script id="metricool" strategy="afterInteractive">{`function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"1bd4571b11a250b1f95a885d89b31222"})});`}</Script>
      </body>
    </html>
  );
}

