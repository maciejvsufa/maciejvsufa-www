/**
 * Źródło prawdy treści strony (DRY) — port z COPY-maciejvsufa.md.
 * Dwujęzycznie: content.pl / content.en — strona "/" renderuje pl, "/en/" renderuje en.
 * Ton firmowy (hire-me) wszędzie poza sekcją "O mnie" (ton ludzki, motto).
 */

export type Lang = "pl" | "en";

const pl = {
  lang: "pl" as Lang,
  ui: {
    skipLink: "Przejdź do treści",
    navAria: "Główna",
    nav: [
      { href: "#co-robie", label: "Usługi" },
      { href: "#projekty", label: "Projekty" },
      { href: "#jak-pracuje", label: "Jak pracuję" },
      { href: "#o-mnie", label: "O mnie" },
    ],
    navCta: "Porozmawiajmy",
    langSwitchAria: "Zmień język / Change language",
    heroCtaPrimary: "Zobacz, co robię",
    heroCtaCv: "Pobierz CV",
    cvHref: "/cv/Maciej_Sufa_CV.pdf",
    footerPrivacy: "Polityka prywatności",
  },
  hero: {
    aria: "Wprowadzenie",
    badge: "Usprawniam i automatyzuję procesy w firmach z AI",
    // twarde spacje ( ) po jednoliterowych „i/w/z" — żeby nie zostawały sierotami na końcu linii
    h1: "Usprawniam i automatyzuję procesy w firmach z AI",
    enTitle: "AI Process & Automation Specialist",
    subhead:
      "Audytuję i automatyzuję procesy w firmach — aplikacje, integracje i rozwiązania AI, które zdejmują z ludzi powtarzalną robotę, żeby został im czas i energia na to, czego AI nie potrafi: kreatywność, wyobraźnię i trafne decyzje.",
    en: "Współpraca zdalna · PL / EU · English: communicative, AI-assisted.",
  },
  coRobie: {
    title: "Co robię",
    kicker: "01",
    h2a: "Mniej powtarzalnej roboty.",
    h2b: "Więcej miejsca na człowieka.",
    lead: "Aplikacje, automatyzacje, systemy z agentami AI — od pierwszego ekranu po wdrożenie.",
    items: [
      {
        h: "Aplikacje i strony",
        p: "Tworzę aplikacje webowe i strony w React / Next.js i w podejściu no-code + AI. Od pierwszego ekranu po wdrożenie — szybko, czysto, z dbałością o wydajność i UX.",
        note: "Ta strona = przykład: Next.js, statyczny eksport, 99+ Lighthouse.",
      },
      {
        h: "Automatyzacje",
        p: "Projektuję i wdrażam automatyzacje procesów: n8n, integracje API, Python, agenci AI, MCP. Przejmują żmudną, powtarzalną robotę — obsługę zgłoszeń, raporty, przepływy danych.",
      },
      {
        h: "Systemy z agentami AI",
        p: "Buduję rozwiązania oparte na agentach AI i orkiestracji wielu modeli — od asystentów głosowych po pipeline'y produkcyjne. Łączę je z istniejącymi narzędziami firmy.",
      },
      {
        h: "Automatyzacja social media",
        p: "Automatyzuję tworzenie i publikację treści: kalendarz postów, generowanie wideo, pipeline end-to-end. Mniej ręcznej roboty, więcej regularności.",
      },
    ],
  },
  projekty: {
    title: "Wybrane projekty",
    kicker: "02",
    h2: "Rzeczy, które zbudowałem.",
    items: [
      {
        name: "Asistel",
        tag: "AI VOICE AGENT · współtwórca",
        p: "Głosowy asystent AI dla aptek i firm wielooddziałowych: odbiera telefony, zbiera zgłoszenia i odciąża zespół od powtarzalnej obsługi. Odpowiadam za stronę produktową, warstwę AI (projekt rozmowy, zbieranie informacji do ticketów) i komunikację z klientem. Praca w zespole z code-review i wspólnym zatwierdzaniem.",
        stack: ["Next.js", "agenci AI", "integracje telefonia/AI"],
        link: "https://asistel.pl",
        linkLabel: "asistel.pl",
      },
      {
        name: "LEV",
        tag: "WŁASNA PRAKTYKA AI · założyciel",
        p: "Prowadzę własną praktykę, w której tworzę rozwiązania AI dla firm: automatyzacje, aplikacje, strony i integracje. Zaczynam od audytu potrzeb, buduję działający prototyp, wdrażam i przekazuję wiedzę zespołowi.",
        stack: ["automatyzacja", "no-code + AI", "integracje API"],
      },
      {
        name: "Studio AI",
        tag: "PIPELINE PRODUKCYJNY",
        p: "End-to-end pipeline do treści wideo: synteza głosu (lokalnie, Fish-Speech), montaż (ffmpeg), awatar mówiący, ilustracje, miniatury — z bramkami kontroli jakości. YouTube long / Reels / Shorts.",
        stack: ["Python", "Fish-Speech", "ffmpeg", "Docker"],
      },
      {
        name: "Organizacja Myśląca",
        tag: "SYSTEM WSPIERANIA DECYZJI",
        p: "System wspierania podejmowania decyzji oparty o myślenie systemowe (Senge): drabina wnioskowania, dialog i dyskusja, archetypy systemowe. Prototypuję narzędzie z agentami AI — od metodyki po działający produkt.",
        stack: ["myślenie systemowe", "agenci AI", "prototypowanie"],
      },
    ],
  },
  jakPracuje: {
    title: "Jak pracuję",
    kicker: "03",
    lead: "Nie tylko kod — sprawna organizacja pracy",
    intro:
      "Pracuję w duchu organizacji myślącej: zespół, który podejmuje trafne decyzje, sprawnie się komunikuje i osiąga dużo małym nakładem czasu. To nie teoria — to sposób, w jaki prowadzę projekty z AI.",
    points: [
      {
        h: "Trafne decyzje",
        p: "Najpierw zrozumieć problem z wielu stron, potem zdecydować. Audyt zanim kod.",
      },
      {
        h: "Sprawna komunikacja",
        p: "Jasny podział, wspólne zatwierdzanie, code-review, jeden wspólny stan projektu.",
      },
      {
        h: "Efektywność małym nakładem",
        p: "Orkiestracja agentów AI: plan → build → cross-review → ship. Robotę robotom, myślenie człowiekowi.",
      },
    ],
  },
  stack: {
    title: "Stack",
    kicker: "04",
    h2: "Narzędzia, w których pracuję.",
    groups: [
      "No-code + AI · prompt engineering · multi-agent",
      "Claude Code · Cursor · Docker · Git/GitHub · ffmpeg · Fish-Speech",
      "n8n · ExoVault · MCP · integracje API · agenci AI · automatyzacja",
      "React · Next.js · TypeScript · Python · Tailwind · three.js",
    ],
  },
  oMnie: {
    title: "O mnie",
    kicker: "05",
    motto:
      "Najcenniejszy zasób to nie pieniądze — to czas życia. Buduję rozwiązania, dzięki którym to, co nazywamy robotą, robią roboty, a to, co nazywamy życiem, zostaje człowiekowi. Największa mądrość to nie wiedzieć wszystko — a użyć tego, co już się wie, tu, gdzie się jest, dla swojego dobra. To mnie napędza: dawać ludziom i firmom narzędzia na dobre, satysfakcjonujące życie i pracę.",
    mottoParts: {
      before: "Najcenniejszy zasób to nie pieniądze — to ",
      em: "czas życia",
      after:
        ". Buduję rozwiązania, dzięki którym robotę robią roboty, a życie zostaje człowiekowi.",
    },
    background:
      "Wcześniej 17 lat na scenie i przed kamerą — stąd umiejętność tłumaczenia technologii na ludzki język i przeprowadzania ludzi przez zmianę. Dziś buduję z AI. Po godzinach rozwijam markę osobistą Metoda Sufy.",
    teamIntro:
      "Nie sam — współpracuję z niewielkim zespołem o uzupełniających się rolach. Dobre rzeczy powstają we współpracy, zwłaszcza tam, gdzie technologia spotyka realne procesy:",
    teamRoles: [
      {
        role: "Infrastruktura i operacje IT",
        note: "Koordynacja techniczna i wdrożenia w organizacjach wielooddziałowych — m.in. doświadczenie w sieciach aptecznych, telefonia i utrzymanie systemów na co dzień.",
      },
      {
        role: "Architektura platform i automatyzacja",
        note: "Projektowanie systemów wiedzy, narzędzi dla developerów i pipeline’ów pod agentów AI — od koncepcji po utrzymanie.",
      },
      {
        role: "Produkt, AI i wdrożenia",
        note: "Aplikacje, agenci AI, warstwa biznesowa, komunikacja z klientem i dowiezienie do produkcji — mój zakres w zespole.",
      },
    ],
    cert: 'Certyfikat „Umiejętności Jutra: AI" (Google & SGH).',
    english:
      "Angielski: komunikatywny, async-first, wspierany narzędziami AI — spotkania online i pisemna komunikacja bez przeszkód.",
  },
  kontakt: {
    title: "Porozmawiajmy",
    kicker: "06",
    headline: "Masz proces, który pochłania czas? Porozmawiajmy.",
    lead: "Pomagam firmom usprawniać i automatyzować procesy z AI — audyt, automatyzacje, aplikacje i rozwiązania AI. Współpraca zdalna (B2B lub etat), PL i zagranica.",
  },
};

const en: typeof pl = {
  lang: "en",
  ui: {
    skipLink: "Skip to content",
    navAria: "Main",
    nav: [
      { href: "#co-robie", label: "Services" },
      { href: "#projekty", label: "Projects" },
      { href: "#jak-pracuje", label: "How I work" },
      { href: "#o-mnie", label: "About" },
    ],
    navCta: "Let's talk",
    langSwitchAria: "Change language / Zmień język",
    heroCtaPrimary: "See what I do",
    heroCtaCv: "Download CV",
    cvHref: "/cv/Maciej_Sufa_CV_EN.pdf",
    footerPrivacy: "Privacy policy",
  },
  hero: {
    aria: "Introduction",
    badge: "I streamline and automate company processes with AI",
    h1: "I streamline and automate company processes with AI",
    enTitle: "AI Process & Automation Specialist",
    subhead:
      "I audit and automate business processes — apps, integrations and AI solutions that take repetitive work off people's plates, so they keep time and energy for what AI can't do: creativity, imagination and sound decisions.",
    en: "Remote collaboration · PL / EU · Based in Poland, working across time zones.",
  },
  coRobie: {
    title: "What I do",
    kicker: "01",
    h2a: "Less repetitive work.",
    h2b: "More room for people.",
    lead: "Apps, automations, AI-agent systems — from the first screen to deployment.",
    items: [
      {
        h: "Apps & websites",
        p: "I build web apps and websites with React / Next.js and a no-code + AI approach. From the first screen to deployment — fast, clean, with care for performance and UX.",
        note: "This site is an example: Next.js, static export, 99+ Lighthouse.",
      },
      {
        h: "Automations",
        p: "I design and deploy process automations: n8n, API integrations, Python, AI agents, MCP. They take over tedious, repetitive work — ticket handling, reports, data flows.",
      },
      {
        h: "AI-agent systems",
        p: "I build solutions based on AI agents and multi-model orchestration — from voice assistants to production pipelines. I connect them with the company's existing tools.",
      },
      {
        h: "Social media automation",
        p: "I automate content creation and publishing: post calendars, video generation, end-to-end pipelines. Less manual work, more consistency.",
      },
    ],
  },
  projekty: {
    title: "Selected projects",
    kicker: "02",
    h2: "Things I've built.",
    items: [
      {
        name: "Asistel",
        tag: "AI VOICE AGENT · co-founder",
        p: "AI voice assistant for pharmacies and multi-branch companies: it answers calls, collects requests and relieves the team of repetitive support. I own the product site, the AI layer (conversation design, ticket data capture) and client communication. Teamwork with code review and shared approval.",
        stack: ["Next.js", "AI agents", "telephony/AI integrations"],
        link: "https://asistel.pl",
        linkLabel: "asistel.pl",
      },
      {
        name: "LEV",
        tag: "INDEPENDENT AI PRACTICE · founder",
        p: "My own practice building AI solutions for business: automations, apps, websites and integrations. I start with a needs audit, build a working prototype, deploy it and hand the knowledge over to the team.",
        stack: ["automation", "no-code + AI", "API integrations"],
      },
      {
        name: "Studio AI",
        tag: "PRODUCTION PIPELINE",
        p: "End-to-end video content pipeline: voice synthesis (local, Fish-Speech), editing (ffmpeg), talking avatar, illustrations, thumbnails — with quality gates. YouTube long / Reels / Shorts.",
        stack: ["Python", "Fish-Speech", "ffmpeg", "Docker"],
      },
      {
        name: "Organizacja Myśląca",
        tag: "DECISION-SUPPORT SYSTEM",
        p: "A decision-support system based on systems thinking (Senge): ladder of inference, dialogue vs. discussion, system archetypes. I prototype the tool with AI agents — from methodology to a working product.",
        stack: ["systems thinking", "AI agents", "prototyping"],
      },
    ],
  },
  jakPracuje: {
    title: "How I work",
    kicker: "03",
    lead: "Not just code — well-organized work",
    intro:
      "I work in the spirit of a thinking organization: a team that makes sound decisions, communicates efficiently and achieves a lot with little overhead. It's not theory — it's how I run AI projects.",
    points: [
      {
        h: "Sound decisions",
        p: "First understand the problem from many angles, then decide. Audit before code.",
      },
      {
        h: "Efficient communication",
        p: "Clear ownership, shared approval, code review, one shared project state.",
      },
      {
        h: "Results with little overhead",
        p: "AI-agent orchestration: plan → build → cross-review → ship. Robots do the labor, humans do the thinking.",
      },
    ],
  },
  stack: {
    title: "Stack",
    kicker: "04",
    h2: "Tools I work with.",
    groups: [
      "No-code + AI · prompt engineering · multi-agent",
      "Claude Code · Cursor · Docker · Git/GitHub · ffmpeg · Fish-Speech",
      "n8n · ExoVault · MCP · API integrations · AI agents · automation",
      "React · Next.js · TypeScript · Python · Tailwind · three.js",
    ],
  },
  oMnie: {
    title: "About",
    kicker: "05",
    motto:
      "The most valuable resource isn't money — it's lifetime. I build solutions where what we call labor is done by robots, and what we call life stays with people. The greatest wisdom isn't knowing everything — it's using what you already know, where you are, for your own good. That's what drives me: giving people and companies tools for a good, satisfying life and work.",
    mottoParts: {
      before: "The most valuable resource isn't money — it's ",
      em: "lifetime",
      after: ". I build solutions where labor is done by robots, and life stays with people.",
    },
    background:
      "Before this: 17 years on stage and in front of the camera — that's where I learned to translate technology into human language and guide people through change. Today I build with AI. After hours I develop my personal brand, Metoda Sufy.",
    teamIntro:
      "Not alone — I collaborate with a small team of complementary roles. Good things are built together, especially where technology meets real processes:",
    teamRoles: [
      {
        role: "Infrastructure & IT operations",
        note: "Technical coordination and rollouts in multi-branch organizations — incl. pharmacy networks, telephony and day-to-day systems maintenance.",
      },
      {
        role: "Platform architecture & automation",
        note: "Designing knowledge systems, developer tooling and pipelines for AI agents — from concept to maintenance.",
      },
      {
        role: "Product, AI & delivery",
        note: "Apps, AI agents, the business layer, client communication and shipping to production — my scope in the team.",
      },
    ],
    cert: '"AI Skills for Tomorrow" certificate (Google & SGH).',
    english:
      "English: conversational, async-first, AI-assisted — online meetings and written communication without friction.",
  },
  kontakt: {
    title: "Let's talk",
    kicker: "06",
    headline: "Got a process that eats your time? Let's talk.",
    lead: "I help companies streamline and automate processes with AI — audits, automations, apps and AI solutions. Remote collaboration (B2B or employment), Poland and abroad.",
  },
};

export const content = { pl, en } as const;
export type SiteContent = typeof pl;

// Zgodność wstecz — istniejące importy PL (sekcje przechodzą na propsy `t`).
export const hero = pl.hero;
export const coRobie = pl.coRobie;
export const projekty = pl.projekty;
export const jakPracuje = pl.jakPracuje;
export const stack = pl.stack;
export const oMnie = pl.oMnie;
export const kontakt = pl.kontakt;
