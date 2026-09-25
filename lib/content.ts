/**
 * Źródło prawdy treści strony (DRY).
 * Dwujęzycznie: content.pl / content.en — strona "/" renderuje pl, "/en/" renderuje en.
 * Układ wzorowany na szablonie Syntax CV: numerowane sekcje, jedna kolumna.
 * Zasady: bez zmyślonych liczb, referencji i klientów; Tercet Labs tylko jedną linią
 * w doświadczeniu (reszta żyje na tercetlabs.pl).
 */

import { site } from "@/lib/site";

export type Lang = "pl" | "en";

type Link = { href: string; label: string };
type Site = { href: string; label: string; note: string };
type Job = { org: string; meta: string; years: string; role: string; p: string; links?: Link[] };

const pl = {
  lang: "pl" as Lang,
  ui: {
    skipLink: "Przejdź do treści",
    navAria: "Główna",
    nav: [
      { href: "#o-mnie", label: "O mnie" },
      { href: "#doswiadczenie", label: "Doświadczenie" },
      { href: "#jak-pracuje", label: "Jak pracuję" },
      { href: "#kontakt", label: "Kontakt" },
    ],
    navCta: "Porozmawiajmy",
    menuOpen: "Otwórz menu",
    menuClose: "Zamknij menu",
    copyEmail: "Kopiuj e-mail",
    emailCopied: "Skopiowano ✓",
    langSwitchAria: "Zmień język / Change language",
    heroCtaPrimary: "Napisz do mnie",
    heroCtaCv: "Pobierz CV",
    cvHref: "/cv/Maciej_Sufa_CV.pdf",
    footerPrivacy: "Polityka prywatności",
    footerTop: "Do góry",
  },
  hero: {
    aria: "Wprowadzenie",
    first: "Maciej",
    last: "V. Sufa",
    role: "Social Media Content Creator (AI-powered)",
    place: "Łódź, PL · zdalnie PL / EU",
    stats: [
      { value: "17 lat", label: "na scenie i przed kamerą" },
      { value: "od 2025", label: "content i studio AI" },
    ],
    quoteBefore: "Najcenniejszy zasób to nie pieniądze — to ",
    quoteEm: "czas życia",
    quoteAfter: ". Niech robotę robią roboty, a życie zostanie człowiekowi.",
    photoAlt: "Maciej V. Sufa",
  },
  about: {
    kicker: "01",
    title: "o mnie",
    lead: "Tworzę content na social media od pomysłu po publikację — i robię to z pomocą AI.",
    body: [
      "Piszę scenariusze i teksty, montuję wideo (CapCut Pro, DaVinci Resolve), robię grafiki i miniatury (Canva, GPT-Image) i układam kalendarz treści pod trendy i analitykę. Własne kanały prowadzę z pomocą zautomatyzowanej linii produkcyjnej i agentów AI, a podobne systemy buduję dla firm.",
      "Wcześniej przez 17 lat byłem zawodowym aktorem. Z planu i sceny wyniosłem swobodę przed kamerą i mikrofonem, warsztat głosu i opowiadanie historii — to dziś napędza mój content.",
    ],
  },
  coRobie: {
    kicker: "02",
    title: "co robię",
    items: [
      {
        h: "Content i social media",
        p: "Prowadzę kanały od początku do końca: scenariusz, nagranie, montaż, miniatury, publikacja według kalendarza. YouTube, Reels, karuzele.",
      },
      {
        h: "Automatyzacja social media",
        p: "Automatyzuję tworzenie i publikację treści: kalendarz postów, generowanie wideo, kolejka publikacji. Mniej ręcznej roboty, więcej regularności.",
      },
      {
        h: "Systemy z agentami AI",
        p: "Łączę agentów AI i kilka modeli w jeden proces — od asystentów głosowych po linie produkcyjne wideo — i wpinam je w narzędzia, których firma już używa.",
      },
      {
        h: "Aplikacje i strony",
        p: "Tworzę strony i aplikacje w React i Next.js. Ta strona to przykład: statyczny eksport, wynik Lighthouse powyżej 95.",
      },
    ],
  },
  experience: {
    kicker: "03",
    title: "doświadczenie",
    items: [
      {
        org: "Tercet Labs",
        meta: "sp. z o.o.",
        years: "2026 – obecnie",
        role: "Współzałożyciel",
        p: "Spółka, która wdraża AI w firmach razem z ich zespołami. Jeden z naszych produktów to Asistel — asystent głosowy dla aptek.",
        links: [
          { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
          { href: site.socials.asistel, label: "asistel.pl" },
        ],
      },
      {
        org: "LEV",
        meta: "zdalnie",
        years: "2025 – obecnie",
        role: "Założyciel",
        p: "Moja praktyka: content i social media dla firm.",
      },
      {
        org: "Studio AI — Metoda Sufy",
        meta: "YouTube · Instagram · Facebook",
        years: "2025 – obecnie",
        role: "Twórca contentu i założyciel",
        p: "Marka osobista prowadzona jak studio treści. Scenariusz, głos, montaż, miniatury i publikacja idą przez własną linię produkcyjną z agentami AI.",
        links: [{ href: site.socials.metoda, label: "metodasufy.pl" }],
      },
      {
        org: "Aktorstwo",
        meta: "film · telewizja · teatr · opera",
        years: "17 lat",
        role: "Zawodowy aktor",
        p: "Główna rola w serialu „Gliniarze” (Polsat), „Kobiety mafii”, Opera Narodowa („Moc Przeznaczenia”, reż. Treliński), Teatr Kamienica i dziesiątki ról serialowych.",
      },
    ] as Job[],
  },
  jakPracuje: {
    kicker: "04",
    title: "jak pracuję",
    intro:
      "Pracuję w duchu organizacji myślącej: zespół podejmuje trafne decyzje, sprawnie się komunikuje i osiąga dużo małym nakładem czasu.",
    points: [
      { h: "Trafne decyzje", p: "Najpierw rozumiem problem z kilku stron, potem decyduję. Audyt przed kodem." },
      { h: "Sprawna komunikacja", p: "Jasny podział zadań, wspólne zatwierdzanie, przegląd kodu i jeden wspólny stan projektu." },
      { h: "Dużo małym nakładem", p: "Agenci AI pracują w rytmie: plan → budowa → przegląd krzyżowy → wydanie. Robotę robią roboty, myśli człowiek." },
    ],
  },
  skills: {
    kicker: "05",
    title: "umiejętności",
    groups: [
      { h: "Content", items: ["CapCut Pro", "DaVinci Resolve", "Canva", "GPT-Image", "Meta Business Suite", "scenariusze", "redakcja PL"] },
      { h: "AI i automatyzacja", items: ["agenci AI", "prompt engineering", "n8n", "MCP", "ExoVault", "integracje API", "Fish-Speech", "ffmpeg"] },
      { h: "Kod", items: ["React", "Next.js", "TypeScript", "Python", "Tailwind", "Docker", "Git"] },
    ],
  },
  education: {
    kicker: "06",
    title: "edukacja",
    items: [
      { org: "Warszawska Szkoła Filmowa", years: "2008 – 2010", p: "Aktorstwo." },
      { org: "Google & SGH", years: "2025", p: "Certyfikat „Umiejętności Jutra: AI” — AI w produktywności, marketingu i sprzedaży." },
    ],
  },
  languages: {
    kicker: "07",
    title: "języki",
    items: [
      { name: "Polski", level: "ojczysty" },
      { name: "Angielski", level: "B1/B2 — komunikatywnie, z pomocą narzędzi AI" },
    ],
  },
  kontakt: {
    kicker: "08",
    title: "kontakt",
    headline: "Szukasz kogoś, kto poprowadzi Twoje social media z AI?",
    headlineEm: "Porozmawiajmy.",
    lead: "Współpraca zdalna, B2B lub etat, w Polsce i za granicą.",
    socialsTitle: "Social media",
    sitesTitle: "Moje strony",
    sites: [
      { href: site.socials.tercetlabs, label: "tercetlabs.pl", note: "Tercet Labs" },
      { href: site.socials.asistel, label: "asistel.pl", note: "Asistel" },
      { href: site.socials.metoda, label: "metodasufy.pl", note: "Metoda Sufy" },
    ] as Site[],
  },
};

const en: typeof pl = {
  lang: "en",
  ui: {
    skipLink: "Skip to content",
    navAria: "Main",
    nav: [
      { href: "#o-mnie", label: "About" },
      { href: "#doswiadczenie", label: "Experience" },
      { href: "#jak-pracuje", label: "How I work" },
      { href: "#kontakt", label: "Contact" },
    ],
    navCta: "Let's talk",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    copyEmail: "Copy e-mail",
    emailCopied: "Copied ✓",
    langSwitchAria: "Change language / Zmień język",
    heroCtaPrimary: "Get in touch",
    heroCtaCv: "Download CV",
    cvHref: "/cv/Maciej_Sufa_CV_EN.pdf",
    footerPrivacy: "Privacy policy",
    footerTop: "Back to top",
  },
  hero: {
    aria: "Introduction",
    first: "Maciej",
    last: "V. Sufa",
    role: "Social Media Content Creator (AI-powered)",
    place: "Łódź, Poland · remote PL / EU",
    stats: [
      { value: "17 yrs", label: "on stage and on camera" },
      { value: "since 2025", label: "content & AI studio" },
    ],
    quoteBefore: "The most valuable resource isn't money — it's ",
    quoteEm: "lifetime",
    quoteAfter: ". Let robots do the labor, so life stays with people.",
    photoAlt: "Maciej V. Sufa",
  },
  about: {
    kicker: "01",
    title: "about",
    lead: "I create social media content from idea to publication — with the help of AI.",
    body: [
      "I write scripts and copy, edit video (CapCut Pro, DaVinci Resolve), make graphics and thumbnails (Canva, GPT-Image) and plan a content calendar around trends and analytics. I run my own channels on an automated production line with AI agents, and I build similar systems for companies.",
      "Before that I spent 17 years as a professional actor. The set and the stage gave me ease on camera and on the mic, voice craft and storytelling — and that is what powers my content today.",
    ],
  },
  coRobie: {
    kicker: "02",
    title: "what I do",
    items: [
      {
        h: "Content & social media",
        p: "I run channels end to end: script, recording, editing, thumbnails and publishing on a calendar. YouTube, Reels, carousels.",
      },
      {
        h: "Social media automation",
        p: "I automate content creation and publishing: post calendars, video generation, a publishing queue. Less manual work, more consistency.",
      },
      {
        h: "AI-agent systems",
        p: "I connect AI agents and several models into one process — from voice assistants to video production lines — and plug them into the tools a company already uses.",
      },
      {
        h: "Apps & websites",
        p: "I build websites and apps with React and Next.js. This site is an example: static export, Lighthouse score above 95.",
      },
    ],
  },
  experience: {
    kicker: "03",
    title: "experience",
    items: [
      {
        org: "Tercet Labs",
        meta: "sp. z o.o.",
        years: "2026 – present",
        role: "Co-founder",
        p: "A company that brings AI into businesses together with their teams. Our products include Asistel, a voice assistant for pharmacies.",
        links: [
          { href: `${site.socials.tercetlabs}/en/`, label: "tercetlabs.pl" },
          { href: site.socials.asistel, label: "asistel.pl" },
        ],
      },
      {
        org: "LEV",
        meta: "remote",
        years: "2025 – present",
        role: "Founder",
        p: "My practice: content and social media for companies.",
      },
      {
        org: "Studio AI — Metoda Sufy",
        meta: "YouTube · Instagram · Facebook",
        years: "2025 – present",
        role: "Content creator & founder",
        p: "A personal brand run like a content studio. Script, voice, editing, thumbnails and publishing go through my own production line with AI agents.",
        links: [{ href: site.socials.metoda, label: "metodasufy.pl" }],
      },
      {
        org: "Acting",
        meta: "film · TV · theatre · opera",
        years: "17 years",
        role: "Professional actor",
        p: "Lead role in the crime series “Gliniarze” (Polsat), “Women of Mafia”, Polish National Opera (“La forza del destino”, dir. M. Treliński), Teatr Kamienica and dozens of TV roles.",
      },
    ] as Job[],
  },
  jakPracuje: {
    kicker: "04",
    title: "how I work",
    intro:
      "I work in the spirit of a thinking organization: a team that makes sound decisions, communicates well and achieves a lot with little overhead.",
    points: [
      { h: "Sound decisions", p: "First I understand the problem from several angles, then I decide. Audit before code." },
      { h: "Clear communication", p: "Clear ownership, shared approval, code review and one shared project state." },
      { h: "Results with little overhead", p: "AI agents work in a loop: plan → build → cross-review → ship. Robots do the labor, people do the thinking." },
    ],
  },
  skills: {
    kicker: "05",
    title: "skills",
    groups: [
      { h: "Content", items: ["CapCut Pro", "DaVinci Resolve", "Canva", "GPT-Image", "Meta Business Suite", "scripts", "Polish copy editing"] },
      { h: "AI & automation", items: ["AI agents", "prompt engineering", "n8n", "MCP", "ExoVault", "API integrations", "Fish-Speech", "ffmpeg"] },
      { h: "Code", items: ["React", "Next.js", "TypeScript", "Python", "Tailwind", "Docker", "Git"] },
    ],
  },
  education: {
    kicker: "06",
    title: "education",
    items: [
      { org: "Warsaw Film School", years: "2008 – 2010", p: "Acting." },
      { org: "Google & SGH", years: "2025", p: "“AI Skills for Tomorrow” certificate — AI in productivity, marketing and sales." },
    ],
  },
  languages: {
    kicker: "07",
    title: "languages",
    items: [
      { name: "Polish", level: "native" },
      { name: "English", level: "B1/B2 — conversational, AI-assisted" },
    ],
  },
  kontakt: {
    kicker: "08",
    title: "contact",
    headline: "Looking for someone to run your social media with AI?",
    headlineEm: "Let's talk.",
    lead: "Remote collaboration, B2B or employment, in Poland and abroad.",
    socialsTitle: "Social media",
    sitesTitle: "My sites",
    sites: [
      { href: `${site.socials.tercetlabs}/en/`, label: "tercetlabs.pl", note: "Tercet Labs" },
      { href: site.socials.asistel, label: "asistel.pl", note: "Asistel" },
      { href: site.socials.metoda, label: "metodasufy.pl", note: "Metoda Sufy" },
    ] as Site[],
  },
};

export const content = { pl, en } as const;
export type SiteContent = typeof pl;
