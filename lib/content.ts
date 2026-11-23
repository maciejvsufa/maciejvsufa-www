/**
 * Źródło prawdy treści strony (DRY).
 * Dwujęzycznie: content.pl / content.en — strona "/" renderuje pl, "/en/" renderuje en.
 * Układ: wizytówka na 3 karty (Kim jestem / Co robię / Kto za tym stoi), styl szablonu Makro, mechanika
 * „jednej strony” z przypiętą ramką i kartami bez zmian.
 * Zasady: bez zmyślonych faktów o kliencie i bez cen. Liczby w widżetach to przykładowe
 * widoki narzędzi (podpisane jako przykładowe), nie wyniki ani obietnice. Wyjątek: Lighthouse
 * maciejvsufa.pl z 30.10.2026 (93/100/100) — prawdziwy pomiar z datą.
 */

import { reelLinks } from "@/lib/reels";
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
  | {
      type: "planner";
      title: string;
      range: string;
      days: string[];
      start: number; // dzień miesiąca pierwszego poniedziałku
      items: { day: number; img: string; label: string; state: "pub" | "plan"; meta: string; more?: number }[];
      legend: [string, string];
      source: string;
    }
  | {
      type: "rank";
      title: string;
      /** views tylko przy rolce, dla której jest pomiar. Bez liczby pasek się nie rysuje. */
      rows: { img?: string; frameLabel?: string; title: string; date: string; views?: number; viewsText?: string }[];
      source: string;
    }
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
    ["2025", "Opera Narodowa – Teatr Wielki", "„Ariadna na Naxos”, reż. Mariusz Treliński", "“Ariadne auf Naxos”, dir. Mariusz Treliński"],
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
    sample: "518 tys.: rolka z 18.11 łącznie na FB, YT, TikTok i IG (dokładnie 518 258, w 5 dni; w dwa dni, do 20.11, było 402 566). 290 351: ta sama rolka na Facebooku. 1 136: udostępnienia tej samej rolki na IG, TikToku i YouTube. Metricool, stan na 23.11.2026.",
    nav: [
      { href: "#co-robie", label: "Co robię" },
      { href: "#o-mnie", label: "O mnie" },
      { href: "#kontakt", label: "Kontakt" },
    ],
  },
  hero: {
    aria: "Wprowadzenie",
    badge: "Content creator · autor",
    title: "Krótkie wideo od scenariusza po wyniki",
    lead: "Sam piszę, występuję, montuję i sprawdzam, co działa. 17 lat przed kamerą — dziś w rolkach na Instagramie, TikToku i YouTube.",
    cta: "Zobacz rolkę",
    ctaHref: reelLinks.recordYt,
    ctaAlt: "albo napisz do mnie",
    facts: ["17 lat przed kamerą", "518 tys. wyświetleń w 5 dni, rolka z 18.11.2026", "649 komentarzy pod jedną rolką (IG, TikTok, YouTube)"],
    photoAlt: "Uśmiechnięty Maciej V. Sufa w niebieskiej koszuli",
  },
  coRobie: {
    kicker: "01",
    title: "Co robię",
    intro: "Krótkie wideo od scenariusza po liczby.",
    items: [
      {
        icon: "film",
        tag: "Content Creator",
        h: "Treści, które wychodzą regularnie",
        p: "Scenariusz, nagranie, montaż, miniatury i publikacja według kalendarza. YouTube, Reels, karuzele.",
        check: "Kalendarz publikacji bez pustych tygodni",
        viz: {
          type: "planner",
          title: "Kalendarz treści",
          range: "9–22 listopada 2026",
          days: ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"],
          start: 9,
          items: [
            { day: 9, img: "/kalendarz/2026-11-09.webp", label: "Jest mi po prostu smutno", state: "pub", meta: "" },
            { day: 11, img: "/kalendarz/2026-11-11.webp", label: "On miał zły dzień. Ona taka jest.", state: "pub", meta: "" },
            { day: 13, img: "/kalendarz/2026-11-13.webp", label: "Zostaniesz sama", state: "pub", meta: "" },
            { day: 15, img: "/kalendarz/2026-11-15.webp", label: "Kompot z ziół", state: "plan", meta: "20:15" },
            { day: 16, img: "/kalendarz/2026-11-16.webp", label: "Dla kogo się tak starasz?", state: "plan", meta: "20:15", more: 1 },
            { day: 18, img: "/kalendarz/2026-11-18.webp", label: "Przecież ty dasz radę", state: "plan", meta: "20:15" },
            { day: 20, img: "/kalendarz/2026-11-20.webp", label: "Czyje jest twoje „muszę”?", state: "plan", meta: "20:15" },
            { day: 22, img: "/kalendarz/2026-11-22.webp", label: "Nie mogę czy nie robię tego?", state: "plan", meta: "20:15" },
          ],
          legend: ["opublikowane", "zaplanowane · IG, FB, TikTok, YouTube"],
          source: "Kalendarz z listopada 2026. Bez liczb wyświetleń.",
        },
      },
      {
        icon: "bolt",
        tag: "Proces",
        h: "Od zdania do publikacji",
        p: "Sam piszę scenariusz, występuję, montuję w DaVinci Resolve i sprawdzam, co ludzie oglądają.",
        check: "Jedna osoba od pomysłu do liczb",
        viz: {
          type: "flow",
          title: "Jak powstaje rolka",
          steps: ["Zdanie na ekranie", "Scenariusz", "Nagranie", "Montaż", "Publikacja"],
          status: "Tak robię każdą rolkę",
        },
      },
      {
        icon: "chart",
        tag: "Wynik",
        h: "Rolka, którą widać w liczbach",
        p: "18.11.2026, cztery platformy: 518 258 wyświetleń w pięć dni.",
        check: "Metricool, stan na 23.11.2026",
        viz: {
          type: "rank",
          title: "Jedna rolka",
          rows: [
            {
              frameLabel: "518 tys.",
              title: "Modlitwa, którą znasz od dziecka, brzmi inaczej, niż myślisz.",
              date: "18.11.2026",
              views: 518258,
            },
            {
              img: "/portfolio/rekord-18-11.webp",
              title: "Ta sama rolka na Facebooku",
              date: "18.11.2026",
              views: 290351,
              viewsText: "290 351",
            },
            {
              frameLabel: "1 136",
              title: "1 136 udostępnień tej samej rolki",
              date: "18.11.2026",
            },
          ],
          source: "518 258 wyświetleń łącznie i 290 351 na Facebooku: rolka z 18.11. 1 136 udostępnień: IG, TikTok i YouTube. Metricool, stan na 23.11.2026.",
        },
      },
    ] as Card[],
    proces: ["Scenariusz", "Nagranie", "Montaż", "Publikacja"],
    procesNote: "Potem sprawdzam liczby.",
    viewsWord: "wyświetleń",
    reels: [
      {
        title: "Modlitwa, którą znasz od dziecka, brzmi inaczej, niż myślisz.",
        date: "18.11.2026",
        views: 518258,
        viewsText: "518 258 wyświetleń łącznie",
        href: reelLinks.recordYt,
        frameLabel: "518 tys.",
      },
      {
        img: "/portfolio/rekord-18-11.webp",
        imgPos: "center 62%",
        title: "Ta sama rolka na Facebooku",
        date: "18.11.2026",
        viewsText: "290 351 wyświetleń",
        href: reelLinks.recordFb,
      },
      {
        frameLabel: "1 136",
        frameNote: "udostępnień",
        title: "Ta sama rolka. Ludzie ją wysłali dalej.",
        date: "18.11.2026",
        viewsText: "1 136 udostępnień",
        href: reelLinks.recordYt,
      },
    ],
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
    contactKicker: "03",
    contactTitle: "Kontakt",
    contactLead: "Napisz, o co chodzi. Odpowiem i umówimy rozmowę.",
    about: [
      "Jestem właścicielem firmy LEV, Content Creatorem i aktorem.",
      "Mam też udziały w Tercet Labs, spółce, która wdraża AI w firmach razem z ich zespołami. Pracuję zdalnie z firmami z Polski i UE, po polsku i po angielsku.",
    ],
    photoAlt: "Maciej V. Sufa w czarnym płaszczu i granatowym garniturze",
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
  certyfikat: {
    button: "Certyfikat",
    name: "Wykorzystanie AI w rozwoju firmy",
    note: "Google Umiejętności Jutra AI · SGH · 19.03.2025",
    image: "/cert/umiejetnosci-jutra-ai.webp",
    imageAlt:
      "Certyfikat „Wykorzystanie AI w rozwoju firmy” wystawiony Maciejowi Sufie 19 marca 2025 w programie Google Umiejętności Jutra AI, partner edukacyjny SGH.",
    close: "Zamknij",
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
    sample: "518k: 18.11 reel across FB, YouTube, TikTok and Instagram (exactly 518,258, in 5 days; in two days, as of 20.11, it was 402,566). 290,351: that same reel on Facebook. 1,136: shares of that same reel on Instagram, TikTok and YouTube. Metricool, as of 23.11.2026.",
    nav: [
      { href: "#co-robie", label: "What I do" },
      { href: "#o-mnie", label: "About" },
      { href: "#kontakt", label: "Contact" },
    ],
  },
  hero: {
    aria: "Introduction",
    badge: "Content creator · author",
    title: "Short-form video from script to results",
    lead: "I write, perform, edit and check what works. 17 years on camera — today in reels on Instagram, TikTok and YouTube.",
    cta: "Watch the reel",
    ctaHref: reelLinks.recordYt,
    ctaAlt: "or write to me",
    facts: ["17 years on camera", "518k views in 5 days, reel of 18.11.2026", "649 comments on one reel (Instagram, TikTok, YouTube)"],
    photoAlt: "Smiling Maciej V. Sufa in a blue shirt",
  },
  coRobie: {
    kicker: "01",
    title: "What I do",
    intro: "Short-form video, from the script to the numbers.",
    items: [
      {
        icon: "film",
        tag: "Content Creator",
        h: "Content that ships on schedule",
        p: "Script, recording, editing, thumbnails and publishing on a calendar. YouTube, Reels, carousels.",
        check: "A publishing calendar without empty weeks",
        viz: {
          type: "planner",
          title: "Content calendar",
          range: "9–22 November 2026",
          days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          start: 9,
          items: [
            { day: 9, img: "/kalendarz/2026-11-09.webp", label: "Jest mi po prostu smutno", state: "pub", meta: "" },
            { day: 11, img: "/kalendarz/2026-11-11.webp", label: "On miał zły dzień. Ona taka jest.", state: "pub", meta: "" },
            { day: 13, img: "/kalendarz/2026-11-13.webp", label: "Zostaniesz sama", state: "pub", meta: "" },
            { day: 15, img: "/kalendarz/2026-11-15.webp", label: "Kompot z ziół", state: "plan", meta: "20:15" },
            { day: 16, img: "/kalendarz/2026-11-16.webp", label: "Dla kogo się tak starasz?", state: "plan", meta: "20:15", more: 1 },
            { day: 18, img: "/kalendarz/2026-11-18.webp", label: "Przecież ty dasz radę", state: "plan", meta: "20:15" },
            { day: 20, img: "/kalendarz/2026-11-20.webp", label: "Czyje jest twoje „muszę”?", state: "plan", meta: "20:15" },
            { day: 22, img: "/kalendarz/2026-11-22.webp", label: "Nie mogę czy nie robię tego?", state: "plan", meta: "20:15" },
          ],
          legend: ["published", "scheduled · IG, FB, TikTok, YouTube"],
          source: "November 2026 calendar. No view counts.",
        },
      },
      {
        icon: "bolt",
        tag: "Process",
        h: "From a line on screen to a post",
        p: "I write the script, perform, edit in DaVinci Resolve and check what people actually watch.",
        check: "One person, from the idea to the numbers",
        viz: {
          type: "flow",
          title: "How a reel gets made",
          steps: ["Line on screen", "Script", "Shoot", "Edit", "Publish"],
          status: "This is how I make every reel",
        },
      },
      {
        icon: "chart",
        tag: "Result",
        h: "A reel you can see in the numbers",
        p: "18.11.2026, four platforms: 518,258 views in five days.",
        check: "Metricool, as of 23.11.2026",
        viz: {
          type: "rank",
          title: "One reel",
          rows: [
            {
              frameLabel: "518k",
              title: "Modlitwa, którą znasz od dziecka, brzmi inaczej, niż myślisz.",
              date: "18.11.2026",
              views: 518258,
              viewsText: "518,258",
            },
            {
              img: "/portfolio/rekord-18-11.webp",
              title: "The same reel on Facebook",
              date: "18.11.2026",
              views: 290351,
              viewsText: "290,351",
            },
            {
              frameLabel: "1,136",
              title: "1,136 shares of that same reel",
              date: "18.11.2026",
            },
          ],
          source: "518,258 views in total and 290,351 on Facebook: 18.11 reel. 1,136 shares: Instagram, TikTok and YouTube. Metricool, as of 23.11.2026.",
        },
      },
    ],
    proces: ["Script", "Shoot", "Edit", "Publish"],
    procesNote: "Then I read the numbers.",
    viewsWord: "views",
    reels: [
      {
        title: "Modlitwa, którą znasz od dziecka, brzmi inaczej, niż myślisz.",
        date: "18.11.2026",
        views: 518258,
        viewsText: "518,258 views in total",
        href: reelLinks.recordYt,
        frameLabel: "518k",
      },
      {
        img: "/portfolio/rekord-18-11.webp",
        imgPos: "center 62%",
        title: "The same reel on Facebook",
        date: "18.11.2026",
        viewsText: "290,351 views",
        href: reelLinks.recordFb,
      },
      {
        frameLabel: "1,136",
        frameNote: "shares",
        title: "The same reel. People sent it on.",
        date: "18.11.2026",
        viewsText: "1,136 shares",
        href: reelLinks.recordYt,
      },
    ],
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
    contactKicker: "03",
    contactTitle: "Contact",
    contactLead: "Tell me what it is about. I will reply and we will book a call.",
    about: [
      "I own LEV and I am a content creator and an actor.",
      "I am also a shareholder in Tercet Labs, a company that brings AI into businesses together with their teams. I work remotely with companies across Poland and the EU, in Polish and English.",
    ],
    photoAlt: "Maciej V. Sufa in a black coat and a navy suit",
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
  certyfikat: {
    button: "Certificate",
    name: "Using AI in Business Development",
    note: "Google Umiejętności Jutra AI · SGH · 19 March 2025",
    image: "/cert/umiejetnosci-jutra-ai.webp",
    imageAlt:
      "Certificate “Using AI in Business Development” issued to Maciej Sufa on 19 March 2025 in the Google Umiejętności Jutra AI programme, educational partner SGH.",
    close: "Close",
  },
};

export const content = { pl, en } as const;
export type SiteContent = typeof pl;
