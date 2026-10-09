/**
 * Źródło prawdy treści strony (DRY).
 * Dwujęzycznie: content.pl / content.en — strona "/" renderuje pl, "/en/" renderuje en.
 * Układ: wizytówka na 3 karty (Kim jestem / Co robię / Kto za tym stoi), styl szablonu Makro, mechanika
 * „jednej strony” z przypiętą ramką i kartami bez zmian.
 * Zasady: bez zmyślonych faktów o kliencie i bez cen. Liczby w widżetach to przykładowe
 * widoki narzędzi (podpisane „Przykładowy widok”), nie wyniki ani obietnice.
 */

import { site } from "@/lib/site";

export type Lang = "pl" | "en";

export type IconName =
  | "calendar"
  | "bolt"
  | "spark"
  | "search"
  | "link"
  | "phone"
  | "film"
  | "user"
  | "chart"
  | "check"
  | "clock"
  | "list";

export type Viz =
  | { type: "calendar"; title: string; days: string[]; items: [number, string][] }
  | { type: "flow"; title: string; steps: string[]; status: string }
  | { type: "orbit"; title: string; center: string; sub: string; nodes: string[] }
  | { type: "line"; title: string; value: string; badge: string; points: number[]; axis: string[]; foot: [string, string][] }
  | { type: "bars"; title: string; value: string; badge: string; bars: number[]; axis: string[] }
  | { type: "list"; title: string; rows: { t: string; s: string; pill: string; tone: "ok" | "warn" | "idle" }[] }
  | { type: "alert"; title: string; text: string; meta: string; action: string }
  | { type: "call"; title: string; lines: { who: "in" | "out"; t: string }[]; ticket: string }
  | { type: "progress"; title: string; rows: { t: string; p: number }[]; gate: string }
  | { type: "photo"; src: string; alt: string; contain?: boolean };

type Link = { href: string; label: string };
export type Card = { icon: IconName; tag: string; h: string; p: string; check?: string; links?: Link[]; viz: Viz };

/**
 * Doświadczenie aktorskie: pełna lista do okna „Doświadczenie aktorskie”.
 * Źródło: C:\Users\andro\Cursor Projects\doswiadczenie-aktorskie.md (stare CV filmowe) — przepisane 1:1.
 * [rok, tytuł, rola PL, rola EN, główna rola?]
 */
const acting = {
  film: [
    ["2021", "Remiza zawsze w akcji", "stała obsada · Eryk Jabłoński", "regular cast · Eryk Jabłoński"],
    ["2020", "Barwy szczęścia", "odc. 2209 · barman", "ep. 2209 · bartender"],
    ["2019", "Barwy szczęścia", "odc. 2173–2174 · barman", "ep. 2173–2174 · bartender"],
    ["2019", "Ojciec Mateusz", "odc. 280 · były mąż Gosi", "ep. 280 · Gosia's ex-husband"],
    ["2018", "Ojciec Mateusz", "odc. 243 · mąż Gosi", "ep. 243 · Gosia's husband"],
    ["2018", "Kobiety mafii", "film fabularny, reż. Patryk Vega · barman", "feature film, dir. Patryk Vega · bartender"],
    ["2016–2017", "Gliniarze", "Polsat · detektyw Robert Barcz", "Polsat · detective Robert Barcz", true],
    ["2016", "Ukryta prawda", "odc. 630 „Zły mąż” · Patryk Szymanek", "ep. 630 “Zły mąż” · Patryk Szymanek"],
    ["2015", "Wesołowska i mediatorzy", "odc. 21 · Wiktor Golis", "ep. 21 · Wiktor Golis"],
    ["2015", "Pielęgniarki", "odc. 178 · Jarek Otręba", "ep. 178 · Jarek Otręba"],
    ["2015", "Słoiki", "odc. 29 · trener siatkówki Jarosław Gruszka", "ep. 29 · volleyball coach Jarosław Gruszka"],
    ["2015", "Małolaty", "odc. 1 · konkubent Wojtek", "ep. 1 · Wojtek, the partner"],
    ["2015", "Prokurator", "odc. 9 · policjant", "ep. 9 · police officer"],
    ["2014", "Dobranoc ATM", "sutener", "pimp"],
    ["2013", "Kocham.enter", "odc. 20 · barman", "ep. 20 · bartender"],
    ["2012", "Ukryta prawda", "„Trener” · Krzysztof Kowalczyk", "“Trener” · Krzysztof Kowalczyk"],
    ["2012", "Ukryta prawda", "„Z miłości” · obsada", "“Z miłości” · cast"],
    ["2012", "Malanowski i partnerzy", "„Zakochana do szaleństwa” · Norbert Pawluszkiewicz", "“Zakochana do szaleństwa” · Norbert Pawluszkiewicz"],
    ["2012", "Sony Xperia", "reklama", "commercial"],
    ["2011", "Anna Maria Wesołowska", "„Lot w przepaść” · Rafał Przybyłowicz", "“Lot w przepaść” · Rafał Przybyłowicz"],
    ["2011", "Usta usta", "kelner", "waiter"],
    ["2011", "Prosto w serce", "odc. 51 · sprzedawca DVD", "ep. 51 · DVD seller"],
    ["2011", "Dotknięci", "film fabularny, reż. Magda Łazarkiewicz · Czeczen", "feature film, dir. Magda Łazarkiewicz · Chechen man"],
    ["2010", "Malanowski i partnerzy", "„Na końcu umrzesz” · Cezary Leśniewski", "“Na końcu umrzesz” · Cezary Leśniewski"],
    ["2010", "Szekspir w fortach", "reż. Andrzej Domalik · Petruchio", "dir. Andrzej Domalik · Petruchio"],
  ] as [string, string, string, string, boolean?][],
  stage: [
    ["2023", "Opera Narodowa – Teatr Wielki", "„Moc przeznaczenia”, reż. Mariusz Treliński", "“La forza del destino”, dir. Mariusz Treliński"],
    ["2013–2015", "Kabaret „Filip z Konopi” Filipa Borowskiego", "występy aktorskie i wokalne", "acting and singing"],
    ["2011", "Autorski stand-up", "scena „Sauny Marszałka”, Warszawa", "“Sauna Marszałka” stage, Warsaw"],
    ["2009–2011", "Teatr Kamienica", "„Pamiętnik z Powstania Warszawskiego”, reż. Jerzy Bielunas · Powstaniec", "“Pamiętnik z Powstania Warszawskiego”, dir. Jerzy Bielunas · Warsaw Uprising insurgent"],
    ["2010", "Warsztaty z Luisem Gallim", "Actors Studio, Nowy Jork", "Actors Studio, New York"],
  ] as [string, string, string, string][],
  links: [
    { href: "https://filmpolski.pl/fp/index.php?osoba=11112647", label: "FilmPolski" },
    { href: "https://www.filmweb.pl/person/Maciej+Sufa-2368674", label: "Filmweb" },
    { href: "https://www.imdb.com/name/nm7911398/", label: "IMDb" },
  ] as Link[],
};

const pl = {
  lang: "pl" as Lang,
  ui: {
    skipLink: "Przejdź do treści",
    status: "Otwarty na współpracę",
    cta: "Umów rozmowę",
    ctaHref: `mailto:${site.email}?subject=${encodeURIComponent("Umów rozmowę")}`,
    menu: "Menu",
    menuClose: "Zamknij",
    scroll: "Przewiń",
    backToTop: "Do góry",
    copyEmail: "Kopiuj e-mail",
    emailCopied: "Skopiowano ✓",
    langSwitchAria: "Zmień język / Change language",
    footerPrivacy: "Polityka prywatności",
    sample: "Przykładowy widok",
    nav: [
      { href: "#co-robie", label: "Co robię" },
      { href: "#kontakt", label: "O mnie i kontakt" },
    ],
  },
  hero: {
    aria: "Wprowadzenie",
    badge: "Content Creator · strony www · AI dla firm",
    title: "Tworzę treści i wdrażam AI, które oszczędza firmom czas",
    lead: "Prowadzę kanały od pomysłu do publikacji, buduję strony www i wdrażam automatyzacje oraz agentów AI, którzy zdejmują z zespołu powtarzalną robotę.",
    facts: ["17 lat przed kamerą", "Certyfikat Google & SGH", "Współtwórca Asistel"],
    photoAlt: "Uśmiechnięty Maciej V. Sufa w niebieskiej koszuli",
  },
  coRobie: {
    kicker: "01",
    title: "Co robię",
    intro: "Trzy rzeczy, które robię dla firm.",
    items: [
      {
        icon: "film",
        tag: "Content Creator",
        h: "Treści, które wychodzą regularnie",
        p: "Scenariusz, nagranie, montaż, miniatury i publikacja według kalendarza. YouTube, Reels, karuzele.",
        check: "Bez dziur w kalendarzu publikacji",
        viz: {
          type: "calendar",
          title: "Kalendarz treści",
          days: ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"],
          items: [
            [0, "Reels"],
            [1, "Karuzela"],
            [2, "YouTube"],
            [3, "Reels"],
            [4, "Post"],
            [5, "Stories"],
          ],
        },
      },
      {
        icon: "spark",
        tag: "AI w firmie",
        h: "Firma, która działa sprawniej z AI",
        p: "Sprawdzam, gdzie ucieka czas, i wdrażam automatyzacje oraz agentów AI w narzędziach, których już używacie.",
        check: "Bez przesiadki na nowy system",
        viz: {
          type: "flow",
          title: "Przepływ: zgłoszenie klienta",
          steps: ["Telefon albo e-mail", "Agent AI rozpoznaje sprawę", "Zgłoszenie w systemie", "Zespół dostaje gotowe"],
          status: "Działa · ostatnio 2 min temu",
        },
      },
      {
        icon: "link",
        tag: "Strony www",
        h: "Strony, które pracują na firmę",
        p: "Projektuję i buduję szybkie strony firmowe i wizytówki: czytelne na telefonie, z wersją angielską i kontaktem pod ręką.",
        check: "Szybka i czytelna na telefonie",
        viz: {
          type: "progress",
          title: "Nowa strona firmy",
          rows: [
            { t: "Szybkość", p: 96 },
            { t: "Dostępność", p: 100 },
            { t: "SEO", p: 100 },
          ],
          gate: "Gotowa do publikacji",
        },
      },
    ] as Card[],
    proces: ["Audyt", "Prototyp", "Wdrożenie"],
    procesNote: "Wycena po rozmowie.",
    dowodLabel: "Współtwórca",
    dowod: [
      { href: site.socials.asistel, label: "Asistel" },
      { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
    ] as Link[],
  },
  kontakt: {
    kicker: "02",
    title: "Kto za tym stoi",
    intro: "Pracujesz z człowiekiem, nie z formularzem.",
    contactLead: "Napisz, o co chodzi. Odpowiem i umówimy rozmowę.",
    about: [
      "Jestem właścicielem firmy LEV, Content Creatorem i aktorem.",
      "Mam też udziały w Tercet Labs, spółce, która wdraża AI w firmach razem z ich zespołami. Pracuję zdalnie z firmami z Polski i UE, po polsku i po angielsku.",
    ],
    photoAlt: "Maciej V. Sufa w granatowej marynarce i białej koszuli",
    emailLabel: "E-mail",
    sitesLabel: "Strony",
    socialsLabel: "Social media",
    sites: [
      { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
      { href: site.socials.asistel, label: "asistel.pl" },
    ] as Link[],
  },
  aktorstwo: {
    line: "17 lat przed kamerą i na scenie",
    titles: ["Gliniarze", "Kobiety mafii", "Teatr Wielki"],
    button: "Doświadczenie aktorskie",
    lead: "Jestem aktorem z 17-letnim doświadczeniem: film, telewizja, teatr i opera. Stąd swoboda przed kamerą, warsztat głosu i opowiadanie historii.",
    filmLabel: "Film i telewizja",
    stageLabel: "Teatr i scena",
    mainRole: "główna rola",
    linksLabel: "Profile",
    close: "Zamknij",
    film: acting.film.map(([y, t, rPl, , main]) => ({ y, t, r: rPl, main: Boolean(main) })),
    stage: acting.stage.map(([y, t, rPl]) => ({ y, t, r: rPl })),
    links: acting.links,
  },
};

const en: typeof pl = {
  lang: "en",
  ui: {
    skipLink: "Skip to content",
    status: "Open to work",
    cta: "Book a call",
    ctaHref: `mailto:${site.email}?subject=${encodeURIComponent("Book a call")}`,
    menu: "Menu",
    menuClose: "Close",
    scroll: "Scroll",
    backToTop: "Back to top",
    copyEmail: "Copy e-mail",
    emailCopied: "Copied ✓",
    langSwitchAria: "Zmień język / Change language",
    footerPrivacy: "Privacy policy",
    sample: "Example view",
    nav: [
      { href: "#co-robie", label: "What I do" },
      { href: "#kontakt", label: "About and contact" },
    ],
  },
  hero: {
    aria: "Introduction",
    badge: "Content Creator · websites · AI for business",
    title: "I create content and deploy AI that saves companies time",
    lead: "I run channels from idea to publication, build websites and deploy automations and AI agents that take repetitive work off your team.",
    facts: ["17 years on camera", "Google & SGH certificate", "Co-creator of Asistel"],
    photoAlt: "Smiling Maciej V. Sufa in a blue shirt",
  },
  coRobie: {
    kicker: "01",
    title: "What I do",
    intro: "Three things I do for companies.",
    items: [
      {
        icon: "film",
        tag: "Content Creator",
        h: "Content that ships on schedule",
        p: "Script, recording, editing, thumbnails and publishing on a calendar. YouTube, Reels, carousels.",
        check: "No gaps in the publishing calendar",
        viz: {
          type: "calendar",
          title: "Content calendar",
          days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          items: [
            [0, "Reels"],
            [1, "Carousel"],
            [2, "YouTube"],
            [3, "Reels"],
            [4, "Post"],
            [5, "Stories"],
          ],
        },
      },
      {
        icon: "spark",
        tag: "AI in business",
        h: "A company that runs smoother with AI",
        p: "I find where time leaks and deploy automations and AI agents in the tools you already use.",
        check: "No switching to a new system",
        viz: {
          type: "flow",
          title: "Flow: customer request",
          steps: ["Phone call or e-mail", "AI agent identifies the case", "Ticket in the system", "Team gets it ready"],
          status: "Running · last run 2 min ago",
        },
      },
      {
        icon: "link",
        tag: "Websites",
        h: "Websites that work for the business",
        p: "I design and build fast company websites and one-page sites: easy to read on a phone, with an English version and contact at hand.",
        check: "Fast and readable on a phone",
        viz: {
          type: "progress",
          title: "New company website",
          rows: [
            { t: "Speed", p: 96 },
            { t: "Accessibility", p: 100 },
            { t: "SEO", p: 100 },
          ],
          gate: "Ready to publish",
        },
      },
    ],
    proces: ["Audit", "Prototype", "Deployment"],
    procesNote: "Quote after a call.",
    dowodLabel: "Co-creator of",
    dowod: [
      { href: site.socials.asistel, label: "Asistel" },
      { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
    ],
  },
  kontakt: {
    kicker: "02",
    title: "Who's behind it",
    intro: "You work with a person, not a form.",
    contactLead: "Tell me what it is about. I will reply and we will book a call.",
    about: [
      "I own LEV and I am a content creator and an actor.",
      "I am also a shareholder in Tercet Labs, a company that brings AI into businesses together with their teams. I work remotely with companies across Poland and the EU, in Polish and English.",
    ],
    photoAlt: "Maciej V. Sufa in a navy blazer and white shirt",
    emailLabel: "E-mail",
    sitesLabel: "Sites",
    socialsLabel: "Social media",
    sites: [
      { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
      { href: site.socials.asistel, label: "asistel.pl" },
    ],
  },
  aktorstwo: {
    line: "17 years on camera and on stage",
    titles: ["Gliniarze", "Kobiety mafii", "Teatr Wielki"],
    button: "Acting experience",
    lead: "I am an actor with 17 years of experience: film, television, theatre and opera. That is where my ease on camera, voice work and storytelling come from.",
    filmLabel: "Film and television",
    stageLabel: "Theatre and stage",
    mainRole: "lead role",
    linksLabel: "Profiles",
    close: "Close",
    film: acting.film.map(([y, t, , rEn, main]) => ({ y, t, r: rEn, main: Boolean(main) })),
    stage: acting.stage.map(([y, t, , rEn]) => ({ y, t, r: rEn })),
    links: acting.links,
  },
};

export const content = { pl, en } as const;
export type SiteContent = typeof pl;
