/**
 * Źródło prawdy treści strony (DRY) — port z COPY-maciejvsufa.md.
 * Ton firmowy (hire-me) wszędzie poza sekcją "O mnie" (ton ludzki, motto).
 */

export const hero = {
  badge: "Usprawniam i automatyzuję procesy w firmach z AI",
  // twarde spacje ( ) po jednoliterowych „i/w/z" — żeby nie zostawały sierotami na końcu linii
  h1: "Usprawniam i automatyzuję procesy w firmach z AI",
  enTitle: "AI Process & Automation Specialist",
  subhead:
    "Audytuję i automatyzuję procesy w firmach — aplikacje, integracje i rozwiązania AI, które zdejmują z ludzi powtarzalną robotę, żeby został im czas i energia na to, czego AI nie potrafi: kreatywność, wyobraźnię i trafne decyzje.",
  en: "Współpraca zdalna · PL / EU · English: communicative, AI-assisted.",
};

export const coRobie = {
  title: "Co robię",
  kicker: "01",
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
};

export const projekty = {
  title: "Wybrane projekty",
  kicker: "02",
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
      name: "AI Video Studio",
      tag: "PIPELINE PRODUKCYJNY",
      p: "End-to-end pipeline do treści wideo: synteza głosu (lokalnie, Fish-Speech), montaż (ffmpeg), awatar mówiący, ilustracje, miniatury — z bramkami kontroli jakości. YouTube long / Reels / Shorts.",
      stack: ["Python", "Fish-Speech", "ffmpeg", "Docker"],
    },
    {
      name: "Metoda Sufy",
      tag: "AUTORSKI SYSTEM DECYZYJNY",
      p: "Autorski system wspierania decyzji, zbudowany z AI — projekt, w którym łączę myślenie produktowe, projektowanie procesu i pracę z modelami.",
      link: "https://metodasufy.pl",
      linkLabel: "metodasufy.pl (wkrótce)",
    },
  ],
};

export const jakPracuje = {
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
};

export const stack = {
  title: "Stack",
  kicker: "04",
  groups: [
    "React · Next.js · TypeScript · Python · Tailwind · three.js",
    "n8n · MCP · integracje API · agenci AI · automatyzacja",
    "Claude Code · Cursor · Docker · Git/GitHub · ffmpeg · Fish-Speech",
    "No-code + AI · prompt engineering · multi-agent",
  ],
};

export const oMnie = {
  title: "O mnie",
  kicker: "05",
  motto:
    "Najcenniejszy zasób to nie pieniądze — to czas życia. Buduję rozwiązania, dzięki którym to, co nazywamy robotą, robią roboty, a to, co nazywamy życiem, zostaje człowiekowi. Największa mądrość to nie wiedzieć wszystko — a użyć tego, co już się wie, tu, gdzie się jest, dla swojego dobra. To mnie napędza: dawać ludziom i firmom narzędzia na dobre, satysfakcjonujące życie i pracę.",
  background:
    "Wcześniej 17 lat na scenie i przed kamerą — stąd umiejętność tłumaczenia technologii na ludzki język i przeprowadzania ludzi przez zmianę. Dziś buduję z AI.",
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
};

export const kontakt = {
  title: "Porozmawiajmy",
  kicker: "06",
  headline: "Masz proces, który pochłania czas? Porozmawiajmy.",
  lead: "Pomagam firmom usprawniać i automatyzować procesy z AI — audyt, automatyzacje, aplikacje i rozwiązania AI. Współpraca zdalna (B2B lub etat), PL i zagranica.",
};
