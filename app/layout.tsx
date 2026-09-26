import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

// Switzer (Fontshare, darmowa licencja) — pełne pliki z polskimi znakami.
const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  src: [
    { path: "./fonts/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Switzer-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Switzer-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Switzer-300i.woff2", weight: "300", style: "italic" },
  ],
});

// Playfair Display — szeryf do tytułów sekcji i stanowisk („ludzki”, magazynowy).
// next/font pobiera plik przy budowaniu i serwuje go z naszej domeny (bez połączeń z Google).
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
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
// Tercet Labs jako Organization z founder → osoba (bez worksFor).
const personId = `${site.url}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: site.url,
      image: `${site.url}/hero-fig.webp`,
      jobTitle: site.jobTitle,
      email: `mailto:${site.email}`,
      sameAs: [site.socials.instagram, site.socials.facebook, site.socials.linkedin, site.socials.github],
      knowsAbout: [
        "social media content",
        "video editing",
        "content strategy",
        "social media automation",
        "AI agents",
        "generative AI",
      ],
      knowsLanguage: ["pl", "en"],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Warszawska Szkoła Filmowa" },
      address: { "@type": "PostalAddress", addressLocality: "Łódź", addressCountry: "PL" },
    },
    {
      "@type": "Organization",
      name: "Tercet Labs sp. z o.o.",
      url: site.socials.tercetlabs,
      founder: { "@id": personId },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" suppressHydrationWarning className={`${switzer.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        {/* tryb „jednej strony” włączony przed pierwszym rysowaniem — bez przeskoku układu (CLS);
            bez JS klasa się nie pojawia i treść stoi zwyczajnie, jedna pod drugą */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('story-on');if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('story-still')",
          }}
        />
        <link rel="preload" as="image" href="/hero-fig-480.webp" type="image/webp" media="(max-width: 809px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/hero-fig.webp" type="image/webp" media="(min-width: 810px)" fetchPriority="high" />
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
      </body>
    </html>
  );
}
