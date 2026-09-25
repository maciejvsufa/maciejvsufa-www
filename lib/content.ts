/**
 * Źródło prawdy treści strony (DRY).
 * Dwujęzycznie: content.pl / content.en — strona "/" renderuje pl, "/en/" renderuje en.
 * Układ wiernie wg szablonu Syntax CV: hero ze zdjęciem na cały ekran, sekcje „01. …” w dwóch kolumnach.
 * Zasady: bez zmyślonych liczb, referencji i klientów; Tercet Labs tylko jedną linią
 * w doświadczeniu (reszta żyje na tercetlabs.pl).
 */

import { site } from "@/lib/site";

export type Lang = "pl" | "en";

type Link = { href: string; label: string };
type Job = { org: string; meta: string; years: string; role: string; p: string; links?: Link[] };
type Site = { href: string; label: string; note: string };

const pl = {
  lang: "pl" as Lang,
  ui: {
    skipLink: "Przejdź do treści",
    status: "Otwarty na współpracę",
    timezone: "(UTC+1)",
    downloadCv: "Pobierz CV",
    contactMe: "Napisz do mnie",
    cvHref: "/cv/Maciej_Sufa_CV.pdf",
    menu: "Menu",
    menuClose: "Zamknij",
    scroll: "Przewiń",
    backToTop: "Do góry",
    copyEmail: "Kopiuj e-mail",
    emailCopied: "Skopiowano ✓",
    langSwitchAria: "Zmień język / Change language",
    footerPrivacy: "Polityka prywatności",
  },
  hero: {
    aria: "Wprowadzenie",
    nameLines: ["Maciej", "V. Sufa"],
    stats: ["17 lat przed kamerą", "od 2025 content z AI"],
    roleLine: "Social Media Content Creator (AI-powered), Łódź",
    quote:
      "Najcenniejszy zasób to nie pieniądze — to czas życia. Niech robotę robią roboty, a życie zostanie człowiekowi.",
    photoAlt: "Maciej V. Sufa",
  },
  about: {
    kicker: "01",
    title: "O mnie",
    body: [
      "Tworzę content na social media od pomysłu po publikację i robię to z pomocą AI. Piszę scenariusze i teksty, montuję wideo (CapCut Pro, DaVinci Resolve), robię grafiki i miniatury (Canva, GPT-Image) i układam kalendarz treści pod trendy i analitykę.",
      "Własne kanały prowadzę z pomocą zautomatyzowanej linii produkcyjnej i agentów AI, a podobne systemy buduję dla firm. Wcześniej przez 17 lat byłem zawodowym aktorem — stąd swoboda przed kamerą, warsztat głosu i opowiadanie historii.",
    ],
  },
  experience: {
    kicker: "02",
    title: "Doświadczenie",
    items: [
      {
        org: "Tercet Labs",
        meta: "sp. z o.o.",
        years: "2026–obecnie",
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
        years: "2025–obecnie",
        role: "Założyciel",
        p: "Moja praktyka: content i social media dla firm.",
      },
      {
        org: "Studio AI — Metoda Sufy",
        meta: "YouTube, Instagram, Facebook",
        years: "2025–obecnie",
        role: "Twórca contentu i założyciel",
        p: "Marka osobista prowadzona jak studio treści. Scenariusz, głos, montaż, miniatury i publikacja idą przez własną linię produkcyjną z agentami AI.",
        links: [{ href: site.socials.metoda, label: "metodasufy.pl" }],
      },
      {
        org: "Film, telewizja, teatr, opera",
        meta: "17 lat",
        years: "",
        role: "Zawodowy aktor",
        p: "Główna rola w serialu „Gliniarze” (Polsat), „Kobiety mafii”, Opera Narodowa („Moc Przeznaczenia”, reż. Treliński), Teatr Kamienica i dziesiątki ról serialowych.",
      },
    ] as Job[],
  },
  coRobie: {
    kicker: "03",
    title: "Co robię",
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
  jakPracuje: {
    kicker: "04",
    title: "Jak pracuję",
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
    title: "Umiejętności",
    items: [
      "CapCut Pro", "DaVinci Resolve", "Canva", "GPT-Image", "Meta Business Suite", "Scenariusze", "Redakcja PL",
      "Agenci AI", "Prompt engineering", "n8n", "MCP", "ExoVault", "Integracje API", "Fish-Speech", "ffmpeg",
      "React", "Next.js", "TypeScript", "Python", "Tailwind", "Docker", "Git", "Praca przed kamerą",
    ],
  },
  education: {
    kicker: "06",
    title: "Edukacja",
    items: [
      { org: "Warszawska Szkoła Filmowa", years: "2008–2010", h: "Aktorstwo", p: "Studia aktorskie; potem 17 lat pracy w filmie, telewizji, teatrze i operze." },
      { org: "Google & SGH", years: "2025", h: "Certyfikat „Umiejętności Jutra: AI”", p: "Program praktyczny: AI w produktywności, marketingu, sprzedaży i analityce." },
    ],
  },
  languages: {
    kicker: "07",
    title: "Języki",
    items: [
      { name: "Polski", level: "Ojczysty" },
      { name: "Angielski", level: "B1/B2, z pomocą AI" },
    ],
  },
  kontakt: {
    kicker: "08",
    title: "Kontakt",
    emailLabel: "E-mail",
    sitesLabel: "Strony",
    socialsLabel: "Social media",
    sites: [
      { href: site.socials.tercetlabs, label: "tercetlabs.pl", note: "Tercet Labs" },
      { href: site.socials.asistel, label: "asistel.pl", note: "Asistel" },
      { href: site.socials.metoda, label: "metodasufy.pl", note: "Metoda Sufy" },
    ] as Site[],
  },
  thanks: {
    lines: ["Dziękuję,", "że tu", "jesteś"],
    cta: ["Zróbmy razem", "coś dobrego"],
  },
};

const en: typeof pl = {
  lang: "en",
  ui: {
    skipLink: "Skip to content",
    status: "Open to work",
    timezone: "(UTC+1)",
    downloadCv: "Download CV",
    contactMe: "Contact Me",
    cvHref: "/cv/Maciej_Sufa_CV_EN.pdf",
    menu: "Menu",
    menuClose: "Close",
    scroll: "Scroll",
    backToTop: "Back to Top",
    copyEmail: "Copy e-mail",
    emailCopied: "Copied ✓",
    langSwitchAria: "Change language / Zmień język",
    footerPrivacy: "Privacy policy",
  },
  hero: {
    aria: "Introduction",
    nameLines: ["Maciej", "V. Sufa"],
    stats: ["17 yrs on camera", "since 2025 AI content"],
    roleLine: "Social Media Content Creator (AI-powered), based in Łódź",
    quote:
      "The most valuable resource isn't money — it's lifetime. Let robots do the labor, so life stays with people.",
    photoAlt: "Maciej V. Sufa",
  },
  about: {
    kicker: "01",
    title: "About",
    body: [
      "I create social media content from idea to publication, with the help of AI. I write scripts and copy, edit video (CapCut Pro, DaVinci Resolve), make graphics and thumbnails (Canva, GPT-Image) and plan a content calendar around trends and analytics.",
      "I run my own channels on an automated production line with AI agents, and I build similar systems for companies. Before that I spent 17 years as a professional actor — that's where my ease on camera, voice craft and storytelling come from.",
    ],
  },
  experience: {
    kicker: "02",
    title: "Experience",
    items: [
      {
        org: "Tercet Labs",
        meta: "sp. z o.o.",
        years: "2026–Present",
        role: "Co-founder",
        p: "A company that brings AI into businesses together with their teams. Our products include Asistel, a voice assistant for pharmacies.",
        links: [
          { href: `${site.socials.tercetlabs}/en/`, label: "tercetlabs.pl" },
          { href: site.socials.asistel, label: "asistel.pl" },
        ],
      },
      {
        org: "LEV",
        meta: "Remote",
        years: "2025–Present",
        role: "Founder",
        p: "My practice: content and social media for companies.",
      },
      {
        org: "Studio AI — Metoda Sufy",
        meta: "YouTube, Instagram, Facebook",
        years: "2025–Present",
        role: "Content Creator & Founder",
        p: "A personal brand run like a content studio. Script, voice, editing, thumbnails and publishing go through my own production line with AI agents.",
        links: [{ href: site.socials.metoda, label: "metodasufy.pl" }],
      },
      {
        org: "Film, TV, theatre, opera",
        meta: "17 years",
        years: "",
        role: "Professional Actor",
        p: "Lead role in the crime series “Gliniarze” (Polsat), “Women of Mafia”, Polish National Opera (“La forza del destino”, dir. M. Treliński), Teatr Kamienica and dozens of TV roles.",
      },
    ] as Job[],
  },
  coRobie: {
    kicker: "03",
    title: "What I do",
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
  jakPracuje: {
    kicker: "04",
    title: "How I work",
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
    title: "Skills",
    items: [
      "CapCut Pro", "DaVinci Resolve", "Canva", "GPT-Image", "Meta Business Suite", "Scriptwriting", "Polish copy editing",
      "AI agents", "Prompt engineering", "n8n", "MCP", "ExoVault", "API integrations", "Fish-Speech", "ffmpeg",
      "React", "Next.js", "TypeScript", "Python", "Tailwind", "Docker", "Git", "On-camera presence",
    ],
  },
  education: {
    kicker: "06",
    title: "Education",
    items: [
      { org: "Warsaw Film School", years: "2008–2010", h: "Acting", p: "Acting studies, followed by 17 years of work in film, TV, theatre and opera." },
      { org: "Google & SGH", years: "2025", h: "“AI Skills for Tomorrow” certificate", p: "Hands-on program: AI in productivity, marketing, sales and analytics." },
    ],
  },
  languages: {
    kicker: "07",
    title: "Languages",
    items: [
      { name: "Polish", level: "Native speaker" },
      { name: "English", level: "B1/B2, AI-assisted" },
    ],
  },
  kontakt: {
    kicker: "08",
    title: "Contact",
    emailLabel: "Email",
    sitesLabel: "Sites",
    socialsLabel: "Socials",
    sites: [
      { href: `${site.socials.tercetlabs}/en/`, label: "tercetlabs.pl", note: "Tercet Labs" },
      { href: site.socials.asistel, label: "asistel.pl", note: "Asistel" },
      { href: site.socials.metoda, label: "metodasufy.pl", note: "Metoda Sufy" },
    ] as Site[],
  },
  thanks: {
    lines: ["Thanks", "for being", "here"],
    cta: ["Let's make", "something great"],
  },
};

export const content = { pl, en } as const;
export type SiteContent = typeof pl;
