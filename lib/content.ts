/**
 * Źródło prawdy treści strony (DRY).
 * Dwujęzycznie: content.pl / content.en — strona "/" renderuje pl, "/en/" renderuje en.
 * Układ: styl szablonu Makro (kafle z infografikami, bento, cennik), mechanika
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
  | { type: "photo"; src: string; alt: string };

type Link = { href: string; label: string };
export type Card = { icon: IconName; tag: string; h: string; p: string; check?: string; links?: Link[]; viz: Viz };
type Plan = { h: string; p: string; price: string; features: string[]; featured?: boolean };
type Faq = { q: string; a: string };

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
      { href: "#uslugi", label: "Usługi" },
      { href: "#realizacje", label: "Realizacje" },
      { href: "#faq", label: "FAQ" },
      { href: "#kontakt", label: "Kontakt" },
    ],
  },
  hero: {
    aria: "Wprowadzenie",
    badge: "Treści i AI dla firm",
    title: "Tworzę treści i wdrażam AI, które oszczędza firmom czas",
    lead: "Prowadzę kanały od pomysłu do publikacji i buduję automatyzacje oraz agentów AI, którzy zdejmują z zespołu powtarzalną robotę.",
    facts: ["17 lat przed kamerą", "Certyfikat Google & SGH", "Współtwórca Asistel"],
    photoAlt: "Maciej V. Sufa w granatowej koszuli",
  },
  coRobie: {
    kicker: "01",
    title: "Co robię",
    intro: "Trzy rzeczy, które robię na co dzień.",
    items: [
      {
        icon: "calendar",
        tag: "Treści",
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
        icon: "bolt",
        tag: "Automatyzacje",
        h: "Automatyzacje, które robią nudną część",
        p: "Kalendarz postów, generowanie wideo, kolejka publikacji i integracje API. Mniej ręcznej roboty, więcej regularności.",
        check: "Bez ręcznego przeklejania między narzędziami",
        viz: {
          type: "flow",
          title: "Przepływ: nowy film",
          steps: ["Nowy plik na dysku", "Transkrypcja", "Opis i miniatura", "Kolejka publikacji"],
          status: "Działa · ostatnio 2 min temu",
        },
      },
      {
        icon: "spark",
        tag: "Agenci AI",
        h: "Agenci AI wpięci w wasze narzędzia",
        p: "Łączę agentów i kilka modeli w jeden proces, od asystentów głosowych po linie produkcyjne wideo.",
        check: "Bez przesiadki na nowy system",
        viz: {
          type: "orbit",
          title: "Linia produkcyjna",
          center: "5",
          sub: "agentów w jednym procesie",
          nodes: ["Scenariusz", "Głos", "Montaż", "Miniatura", "Kontrola"],
        },
      },
    ] as Card[],
  },
  korzysci: {
    kicker: "02",
    title: "Co zyskujesz",
    intro: "Efekt widać w kalendarzu zespołu, nie w prezentacji.",
    items: [
      {
        icon: "clock",
        tag: "Czas",
        h: "Odzyskane godziny",
        p: "Powtarzalne etapy robi system.",
        viz: { type: "line", title: "Ręczna praca", value: "−12 h", badge: "tydzień", points: [9, 9, 8.5, 7, 5.5, 4.5, 4, 3.6, 3.4, 3.2], axis: [], foot: [] },
      },
      {
        icon: "chart",
        tag: "Regularność",
        h: "Stały rytm publikacji",
        p: "Treści wychodzą według planu.",
        viz: { type: "bars", title: "Publikacje", value: "5 / tydz.", badge: "stale", bars: [2, 3, 5, 5, 5, 5], axis: ["I", "II", "III", "IV", "V", "VI"] },
      },
      {
        icon: "list",
        tag: "Mniej ręcznej roboty",
        h: "Automaty zamiast kopiuj-wklej",
        p: "Nudne zadania znikają z listy.",
        viz: {
          type: "list",
          title: "Zadania",
          rows: [
            { t: "Opis do filmu", s: "", pill: "Auto", tone: "ok" },
            { t: "Miniatura", s: "", pill: "Auto", tone: "ok" },
            { t: "Raport tygodnia", s: "", pill: "Auto", tone: "ok" },
          ],
        },
      },
      {
        icon: "search",
        tag: "Decyzje",
        h: "Wiesz, co działa",
        p: "Analityka podpowiada kolejny ruch.",
        viz: { type: "alert", title: "Wskazówka", text: "Reels w czwartek wieczorem mają najwyższy zasięg", meta: "ostatnie 30 dni", action: "Zaplanuj" },
      },
    ] as Card[],
  },
  uslugi: {
    kicker: "03",
    title: "Usługi",
    intro: "Cztery sposoby, w jakie mogę pomóc.",
    items: [
      {
        icon: "search",
        tag: "Audyt AI",
        h: "Audyt: co warto zautomatyzować",
        p: "Przeglądam procesy w firmie i wskazuję, od czego zacząć. Audyt przed kodem.",
        check: "Wiesz, od czego zacząć",
        viz: {
          type: "progress",
          title: "Potencjał automatyzacji",
          rows: [
            { t: "Publikacja treści", p: 90 },
            { t: "Obsługa zgłoszeń", p: 80 },
            { t: "Raporty", p: 65 },
            { t: "Faktury", p: 40 },
          ],
          gate: "Priorytet: publikacja treści",
        },
      },
      {
        icon: "link",
        tag: "n8n i API",
        h: "Narzędzia, które rozmawiają ze sobą",
        p: "Projektuję i wdrażam przepływy łączące narzędzia, których już używacie: zgłoszenia, raporty, publikacje.",
        check: "Dane przepływają same",
        viz: {
          type: "list",
          title: "Integracje",
          rows: [
            { t: "Formularz → CRM", s: "co 5 min", pill: "Działa", tone: "ok" },
            { t: "CRM → arkusz", s: "co godzinę", pill: "Działa", tone: "ok" },
            { t: "Raport → e-mail", s: "pon. 8:00", pill: "Wysłano", tone: "ok" },
            { t: "Faktura → księgowość", s: "ręcznie", pill: "Do wdrożenia", tone: "warn" },
          ],
        },
      },
      {
        icon: "phone",
        tag: "Agenci głosowi",
        h: "Asystent, który odbiera telefony",
        p: "Współtworzę Asistel, asystenta głosowego dla aptek. Podobne rozwiązania buduję dla firm z dużą liczbą telefonów.",
        check: "Żaden telefon nie przepada",
        links: [{ href: site.socials.asistel, label: "asistel.pl" }],
        viz: {
          type: "list",
          title: "Połączenia dziś",
          rows: [
            { t: "Rezerwacja leku", s: "9:12", pill: "Zgłoszenie", tone: "ok" },
            { t: "Godziny otwarcia", s: "9:40", pill: "Odpowiedziano", tone: "ok" },
            { t: "Pytanie do farmaceuty", s: "10:05", pill: "Przekazano", tone: "warn" },
          ],
        },
      },
      {
        icon: "film",
        tag: "Wideo i social",
        h: "Linia produkcyjna treści",
        p: "Scenariusz, głos, montaż, miniatury i publikacja w jednym procesie z bramkami kontroli jakości.",
        check: "Każdy materiał przechodzi kontrolę",
        viz: {
          type: "flow",
          title: "Odcinek w produkcji",
          steps: ["Scenariusz", "Głos", "Montaż", "Miniatura", "Publikacja"],
          status: "Bramka jakości: zaliczona",
        },
      },
    ] as Card[],
  },
  jakPracuje: {
    kicker: "04",
    title: "Jak pracuję",
    intro: "Najpierw rozumiem problem, potem buduję. Bez długich wdrożeń na ślepo.",
    items: [
      {
        icon: "search",
        tag: "Krok 1",
        h: "Zrozumieć",
        p: "Rozmowa i audyt. Sprawdzam, gdzie ucieka czas i co naprawdę warto zautomatyzować.",
        check: "Audyt przed kodem",
        viz: {
          type: "list",
          title: "Gdzie ucieka czas",
          rows: [
            { t: "Przepisywanie zamówień", s: "co dzień", pill: "Automat", tone: "warn" },
            { t: "Odpowiedzi na maile", s: "co dzień", pill: "Automat", tone: "warn" },
            { t: "Rozmowy z klientem", s: "", pill: "Zostaje", tone: "idle" },
          ],
        },
      },
      {
        icon: "bolt",
        tag: "Krok 2",
        h: "Zbudować prototyp",
        p: "Działający prototyp na waszych danych, który można obejrzeć i poprawić, zanim ruszy wdrożenie.",
        check: "Widzisz efekt przed wdrożeniem",
        viz: {
          type: "flow",
          title: "Prototyp",
          steps: ["Wasze dane", "Prototyp", "Test z zespołem", "Poprawki"],
          status: "Wersja 0.3 · gotowa do testu",
        },
      },
      {
        icon: "check",
        tag: "Krok 3",
        h: "Wdrożyć i przekazać",
        p: "Wdrażam, dokumentuję i uczę zespół, jak z tego korzystać. Rozwiązanie zostaje u was.",
        check: "Rozwiązanie zostaje u was",
        viz: {
          type: "list",
          title: "Przekazanie",
          rows: [
            { t: "Dokumentacja", s: "", pill: "Gotowe", tone: "ok" },
            { t: "Szkolenie zespołu", s: "", pill: "Gotowe", tone: "ok" },
            { t: "Dostępy i hasła", s: "", pill: "Gotowe", tone: "ok" },
            { t: "Opieka po wdrożeniu", s: "", pill: "Opcja", tone: "idle" },
          ],
        },
      },
    ] as Card[],
  },
  wspolpraca: {
    kicker: "05",
    title: "Formy współpracy",
    intro: "Wycena po rozmowie, bo zależy od zakresu.",
    plans: [
      {
        h: "Audyt",
        p: "Jednorazowy przegląd procesów i plan wdrożenia.",
        price: "Wycena po rozmowie",
        features: ["Rozmowa i przegląd procesów", "Mapa: co zautomatyzować", "Plan z priorytetami"],
      },
      {
        h: "Wdrożenie",
        p: "Wybrany proces od prototypu do działania.",
        price: "Wycena po rozmowie",
        features: ["Prototyp na waszych danych", "Wdrożenie i testy", "Dokumentacja i szkolenie"],
        featured: true,
      },
      {
        h: "Stała opieka",
        p: "Regularna współpraca i rozwój.",
        price: "Wycena po rozmowie",
        features: ["Rozwój automatyzacji", "Treści według kalendarza", "Poprawki na bieżąco"],
      },
    ] as Plan[],
    pick: "Wybieram",
  },
  realizacje: {
    kicker: "06",
    title: "Realizacje",
    intro: "Projekty, przy których pracuję.",
    items: [
      {
        icon: "phone",
        tag: "AI voice agent",
        h: "Asistel",
        p: "Asystent głosowy AI dla aptek: odbiera telefony, zbiera zgłoszenia i odciąża zespół. Jestem współtwórcą, w ramach Tercet Labs.",
        check: "Współtwórca · Tercet Labs",
        links: [
          { href: site.socials.asistel, label: "asistel.pl" },
          { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
        ],
        viz: {
          type: "call",
          title: "Rozmowa z asystentem",
          lines: [
            { who: "in", t: "Dzień dobry, chciałabym zarezerwować lek." },
            { who: "out", t: "Chętnie pomogę. Na jakie nazwisko zapisać rezerwację?" },
            { who: "in", t: "Kowalska." },
            { who: "out", t: "Dziękuję. Apteka oddzwoni z potwierdzeniem." },
          ],
          ticket: "Zgłoszenie utworzone · rezerwacja",
        },
      },
      {
        icon: "film",
        tag: "Pipeline wideo",
        h: "Studio AI",
        p: "Linia produkcyjna treści wideo: lokalna synteza głosu, montaż w ffmpeg, grafiki, miniatury i bramki jakości.",
        check: "YouTube · Reels · Shorts",
        viz: {
          type: "progress",
          title: "Odcinek w produkcji",
          rows: [
            { t: "Scenariusz", p: 100 },
            { t: "Głos", p: 100 },
            { t: "Montaż", p: 70 },
            { t: "Miniatura", p: 30 },
          ],
          gate: "Bramka jakości przed publikacją",
        },
      },
      {
        icon: "user",
        tag: "Marka osobista",
        h: "Metoda Sufy",
        p: "Moja marka osobista prowadzona jak studio treści, produkowana własną linią z agentami AI.",
        check: "YouTube, Instagram i Facebook",
        viz: {
          type: "orbit",
          title: "Kanały",
          center: "3",
          sub: "kanały, jedna linia produkcyjna",
          nodes: ["YouTube", "Instagram", "Facebook"],
        },
      },
      {
        icon: "list",
        tag: "Praktyka",
        h: "LEV",
        p: "Moja praktyka: content i social media dla firm.",
        check: "Content i social media dla firm",
        viz: {
          type: "list",
          title: "Zakres",
          rows: [
            { t: "Strategia treści", s: "", pill: "W zakresie", tone: "ok" },
            { t: "Produkcja", s: "", pill: "W zakresie", tone: "ok" },
            { t: "Publikacja", s: "", pill: "W zakresie", tone: "ok" },
            { t: "Analityka", s: "", pill: "W zakresie", tone: "ok" },
          ],
        },
      },
    ] as Card[],
  },
  omnie: {
    kicker: "07",
    title: "Kto za tym stoi",
    intro: "Pracujesz z człowiekiem, nie z formularzem.",
    items: [
      {
        icon: "user",
        tag: "O mnie",
        h: "Maciej V. Sufa",
        p: "Content creator i specjalista od AI dla firm. Mieszkam w Łodzi, pracuję zdalnie z klientami z Polski i UE.",
        check: "Certyfikat Google & SGH",
        viz: { type: "photo", src: "/photos/maciej-swiatlo.webp", alt: "Maciej V. Sufa uśmiecha się, trzymając dwie lampy LED przy twarzy" },
      },
      {
        icon: "film",
        tag: "Kamera",
        h: "17 lat przed kamerą",
        p: "Byłem zawodowym aktorem: film, telewizja, teatr i opera. Stąd swoboda przed kamerą, warsztat głosu i opowiadanie historii.",
        check: "Warszawska Szkoła Filmowa",
        viz: { type: "photo", src: "/photos/maciej-kamera.webp", alt: "Czarno-białe zbliżenie połowy twarzy Macieja V. Sufy" },
      },
      {
        icon: "spark",
        tag: "Firma",
        h: "Tercet Labs",
        p: "W 2026 roku współzałożyłem spółkę, która wdraża AI w firmach razem z ich zespołami. Jednym z naszych produktów jest Asistel.",
        check: "Współzałożyciel",
        links: [{ href: site.socials.tercetlabs, label: "tercetlabs.pl" }],
        viz: { type: "photo", src: "/photos/maciej-firma.webp", alt: "Maciej V. Sufa w granatowej marynarce i białej koszuli" },
      },
    ] as Card[],
  },
  faq: {
    kicker: "08",
    title: "FAQ",
    intro: "Krótkie odpowiedzi na pytania, które padają najczęściej.",
    items: [
      {
        q: "Dla kogo pracuję?",
        a: "Dla firm i twórców, którzy chcą mieć regularne treści albo mniej ręcznej roboty w procesach. Pracuję zdalnie, z klientami z Polski i UE.",
      },
      { q: "Ile to kosztuje?", a: "To zależy od zakresu. Po krótkiej rozmowie dostajesz wycenę, bez zobowiązań." },
      { q: "Od czego zaczynamy?", a: "Od rozmowy i audytu. Sprawdzam, co warto zautomatyzować, dopiero potem proponuję prototyp." },
      {
        q: "Czy AI zastąpi człowieka w treściach?",
        a: "Nie. AI przejmuje powtarzalne etapy, a człowiek decyduje, co powiedzieć i po co. Razem robią więcej niż osobno.",
      },
      {
        q: "Skąd liczby w widżetach na tej stronie?",
        a: "To przykładowe widoki narzędzi, które buduję. Pokazują, jak wygląda praca systemu, a nie wyniki konkretnego klienta.",
      },
      { q: "Czy pracujesz po angielsku?", a: "Tak, na poziomie komunikatywnym B1/B2, z pomocą narzędzi AI. Strona ma wersję angielską." },
    ] as Faq[],
  },
  kontakt: {
    kicker: "09",
    title: "Kontakt",
    intro: "Napisz, o co chodzi. Odpowiem i umówimy rozmowę.",
    emailLabel: "E-mail",
    sitesLabel: "Strony",
    socialsLabel: "Social media",
    sites: [
      { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
      { href: site.socials.asistel, label: "asistel.pl" },
    ] as Link[],
  },
  thanks: {
    lines: ["Zacznijmy", "od rozmowy"],
    cta: ["Napisz", "do mnie"],
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
      { href: "#uslugi", label: "Services" },
      { href: "#realizacje", label: "Work" },
      { href: "#faq", label: "FAQ" },
      { href: "#kontakt", label: "Contact" },
    ],
  },
  hero: {
    aria: "Introduction",
    badge: "Content and AI for business",
    title: "I create content and deploy AI that saves companies time",
    lead: "I run channels from idea to publication and build automations and AI agents that take repetitive work off your team.",
    facts: ["17 years on camera", "Google & SGH certificate", "Co-creator of Asistel"],
    photoAlt: "Maciej V. Sufa in a navy shirt",
  },
  coRobie: {
    kicker: "01",
    title: "What I do",
    intro: "Three things I do every day.",
    items: [
      {
        icon: "calendar",
        tag: "Content",
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
        icon: "bolt",
        tag: "Automation",
        h: "Automations that do the boring part",
        p: "Post calendar, video generation, publishing queue and API integrations. Less manual work, more consistency.",
        check: "No copy-pasting between tools",
        viz: {
          type: "flow",
          title: "Flow: new video",
          steps: ["New file on drive", "Transcription", "Caption and thumbnail", "Publishing queue"],
          status: "Running · last run 2 min ago",
        },
      },
      {
        icon: "spark",
        tag: "AI agents",
        h: "AI agents plugged into your tools",
        p: "I combine agents and several models into one process, from voice assistants to video production lines.",
        check: "No switching to a new system",
        viz: {
          type: "orbit",
          title: "Production line",
          center: "5",
          sub: "agents in one process",
          nodes: ["Script", "Voice", "Editing", "Thumbnail", "QA"],
        },
      },
    ],
  },
  korzysci: {
    kicker: "02",
    title: "What you get",
    intro: "You see the effect in your team's calendar, not in a slide deck.",
    items: [
      {
        icon: "clock",
        tag: "Time",
        h: "Hours back",
        p: "A system handles the repeatable steps.",
        viz: { type: "line", title: "Manual work", value: "−12 h", badge: "week", points: [9, 9, 8.5, 7, 5.5, 4.5, 4, 3.6, 3.4, 3.2], axis: [], foot: [] },
      },
      {
        icon: "chart",
        tag: "Consistency",
        h: "Steady publishing",
        p: "Content ships on plan.",
        viz: { type: "bars", title: "Posts", value: "5 / week", badge: "steady", bars: [2, 3, 5, 5, 5, 5], axis: ["I", "II", "III", "IV", "V", "VI"] },
      },
      {
        icon: "list",
        tag: "Less manual work",
        h: "Automations, not copy-paste",
        p: "Boring tasks leave the list.",
        viz: {
          type: "list",
          title: "Tasks",
          rows: [
            { t: "Video caption", s: "", pill: "Auto", tone: "ok" },
            { t: "Thumbnail", s: "", pill: "Auto", tone: "ok" },
            { t: "Weekly report", s: "", pill: "Auto", tone: "ok" },
          ],
        },
      },
      {
        icon: "search",
        tag: "Decisions",
        h: "Know what works",
        p: "Analytics suggests the next move.",
        viz: { type: "alert", title: "Insight", text: "Thursday evening Reels get the highest reach", meta: "last 30 days", action: "Schedule" },
      },
    ],
  },
  uslugi: {
    kicker: "03",
    title: "Services",
    intro: "Four ways I can help.",
    items: [
      {
        icon: "search",
        tag: "AI audit",
        h: "Audit: what is worth automating",
        p: "I review your processes and point out where to start. Audit before code.",
        check: "You know where to start",
        viz: {
          type: "progress",
          title: "Automation potential",
          rows: [
            { t: "Content publishing", p: 90 },
            { t: "Request handling", p: 80 },
            { t: "Reports", p: 65 },
            { t: "Invoices", p: 40 },
          ],
          gate: "Priority: content publishing",
        },
      },
      {
        icon: "link",
        tag: "n8n and API",
        h: "Tools that talk to each other",
        p: "I design and deploy flows connecting the tools you already use: requests, reports, publishing.",
        check: "Data moves on its own",
        viz: {
          type: "list",
          title: "Integrations",
          rows: [
            { t: "Form → CRM", s: "every 5 min", pill: "Running", tone: "ok" },
            { t: "CRM → sheet", s: "hourly", pill: "Running", tone: "ok" },
            { t: "Report → e-mail", s: "Mon 8:00", pill: "Sent", tone: "ok" },
            { t: "Invoice → accounting", s: "manual", pill: "To do", tone: "warn" },
          ],
        },
      },
      {
        icon: "phone",
        tag: "Voice agents",
        h: "An assistant that answers the phone",
        p: "I co-created Asistel, a voice assistant for pharmacies. I build similar solutions for companies with heavy phone traffic.",
        check: "No call gets lost",
        links: [{ href: site.socials.asistel, label: "asistel.pl" }],
        viz: {
          type: "list",
          title: "Calls today",
          rows: [
            { t: "Medicine reservation", s: "9:12", pill: "Ticket", tone: "ok" },
            { t: "Opening hours", s: "9:40", pill: "Answered", tone: "ok" },
            { t: "Question for pharmacist", s: "10:05", pill: "Forwarded", tone: "warn" },
          ],
        },
      },
      {
        icon: "film",
        tag: "Video and social",
        h: "A content production line",
        p: "Script, voice, editing, thumbnails and publishing in one process with quality gates.",
        check: "Every piece passes QA",
        viz: {
          type: "flow",
          title: "Episode in production",
          steps: ["Script", "Voice", "Editing", "Thumbnail", "Publishing"],
          status: "Quality gate: passed",
        },
      },
    ],
  },
  jakPracuje: {
    kicker: "04",
    title: "How I work",
    intro: "I understand the problem first, then build. No blind long rollouts.",
    items: [
      {
        icon: "search",
        tag: "Step 1",
        h: "Understand",
        p: "Conversation and audit. I check where time leaks and what is really worth automating.",
        check: "Audit before code",
        viz: {
          type: "list",
          title: "Where time leaks",
          rows: [
            { t: "Retyping orders", s: "daily", pill: "Automate", tone: "warn" },
            { t: "Answering e-mails", s: "daily", pill: "Automate", tone: "warn" },
            { t: "Client calls", s: "", pill: "Keep", tone: "idle" },
          ],
        },
      },
      {
        icon: "bolt",
        tag: "Step 2",
        h: "Build a prototype",
        p: "A working prototype on your data that you can see and adjust before rollout starts.",
        check: "See the effect before rollout",
        viz: {
          type: "flow",
          title: "Prototype",
          steps: ["Your data", "Prototype", "Team test", "Fixes"],
          status: "Version 0.3 · ready to test",
        },
      },
      {
        icon: "check",
        tag: "Step 3",
        h: "Deploy and hand over",
        p: "I deploy, document and teach your team how to use it. The solution stays with you.",
        check: "The solution stays with you",
        viz: {
          type: "list",
          title: "Handover",
          rows: [
            { t: "Documentation", s: "", pill: "Done", tone: "ok" },
            { t: "Team training", s: "", pill: "Done", tone: "ok" },
            { t: "Access and passwords", s: "", pill: "Done", tone: "ok" },
            { t: "Post-launch support", s: "", pill: "Option", tone: "idle" },
          ],
        },
      },
    ],
  },
  wspolpraca: {
    kicker: "05",
    title: "Ways to work together",
    intro: "Quote after a call, because it depends on scope.",
    plans: [
      {
        h: "Audit",
        p: "A one-off review of processes and a rollout plan.",
        price: "Quote after a call",
        features: ["Conversation and process review", "Map: what to automate", "Plan with priorities"],
      },
      {
        h: "Implementation",
        p: "One process from prototype to production.",
        price: "Quote after a call",
        features: ["Prototype on your data", "Rollout and tests", "Documentation and training"],
        featured: true,
      },
      {
        h: "Ongoing support",
        p: "Regular cooperation and growth.",
        price: "Quote after a call",
        features: ["Developing automations", "Content on a calendar", "Quick fixes"],
      },
    ],
    pick: "Choose",
  },
  realizacje: {
    kicker: "06",
    title: "Work",
    intro: "Projects I work on.",
    items: [
      {
        icon: "phone",
        tag: "AI voice agent",
        h: "Asistel",
        p: "An AI voice assistant for pharmacies: it answers calls, collects requests and relieves the team. I am a co-creator, as part of Tercet Labs.",
        check: "Co-creator · Tercet Labs",
        links: [
          { href: site.socials.asistel, label: "asistel.pl" },
          { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
        ],
        viz: {
          type: "call",
          title: "Call with the assistant",
          lines: [
            { who: "in", t: "Hello, I would like to reserve a medicine." },
            { who: "out", t: "Happy to help. What name should I put the reservation under?" },
            { who: "in", t: "Kowalska." },
            { who: "out", t: "Thank you. The pharmacy will call back to confirm." },
          ],
          ticket: "Ticket created · reservation",
        },
      },
      {
        icon: "film",
        tag: "Video pipeline",
        h: "AI Studio",
        p: "A video content production line: local voice synthesis, ffmpeg editing, graphics, thumbnails and quality gates.",
        check: "YouTube · Reels · Shorts",
        viz: {
          type: "progress",
          title: "Episode in production",
          rows: [
            { t: "Script", p: 100 },
            { t: "Voice", p: 100 },
            { t: "Editing", p: 70 },
            { t: "Thumbnail", p: 30 },
          ],
          gate: "Quality gate before publishing",
        },
      },
      {
        icon: "user",
        tag: "Personal brand",
        h: "Metoda Sufy",
        p: "My personal brand run like a content studio, produced on my own line with AI agents.",
        check: "YouTube, Instagram and Facebook",
        viz: {
          type: "orbit",
          title: "Channels",
          center: "3",
          sub: "channels, one production line",
          nodes: ["YouTube", "Instagram", "Facebook"],
        },
      },
      {
        icon: "list",
        tag: "Practice",
        h: "LEV",
        p: "My practice: content and social media for companies.",
        check: "Content and social media for companies",
        viz: {
          type: "list",
          title: "Scope",
          rows: [
            { t: "Content strategy", s: "", pill: "In scope", tone: "ok" },
            { t: "Production", s: "", pill: "In scope", tone: "ok" },
            { t: "Publishing", s: "", pill: "In scope", tone: "ok" },
            { t: "Analytics", s: "", pill: "In scope", tone: "ok" },
          ],
        },
      },
    ],
  },
  omnie: {
    kicker: "07",
    title: "Who is behind this",
    intro: "You work with a person, not a form.",
    items: [
      {
        icon: "user",
        tag: "About",
        h: "Maciej V. Sufa",
        p: "Content creator and AI specialist for business. Based in Łódź, working remotely with clients from Poland and the EU.",
        check: "Google & SGH certificate",
        viz: { type: "photo", src: "/photos/maciej-swiatlo.webp", alt: "Maciej V. Sufa smiling, holding two LED light tubes beside his face" },
      },
      {
        icon: "film",
        tag: "Camera",
        h: "17 years on camera",
        p: "I was a professional actor: film, television, theatre and opera. Hence the ease on camera, a trained voice and storytelling.",
        check: "Warsaw Film School",
        viz: { type: "photo", src: "/photos/maciej-kamera.webp", alt: "Black-and-white close-up of half of Maciej V. Sufa's face" },
      },
      {
        icon: "spark",
        tag: "Company",
        h: "Tercet Labs",
        p: "In 2026 I co-founded a company that deploys AI in businesses together with their teams. One of our products is Asistel.",
        check: "Co-founder",
        links: [{ href: site.socials.tercetlabs, label: "tercetlabs.pl" }],
        viz: { type: "photo", src: "/photos/maciej-firma.webp", alt: "Maciej V. Sufa in a navy blazer and white shirt" },
      },
    ],
  },
  faq: {
    kicker: "08",
    title: "FAQ",
    intro: "Short answers to the questions I hear most.",
    items: [
      {
        q: "Who do I work for?",
        a: "Companies and creators who want consistent content or less manual work in their processes. I work remotely with clients from Poland and the EU.",
      },
      { q: "How much does it cost?", a: "It depends on scope. After a short call you get a quote, no strings attached." },
      { q: "Where do we start?", a: "With a conversation and an audit. I check what is worth automating and only then propose a prototype." },
      {
        q: "Will AI replace people in content?",
        a: "No. AI takes over repeatable steps, and a human decides what to say and why. Together they do more than apart.",
      },
      {
        q: "Where do the numbers in the widgets come from?",
        a: "They are example views of the tools I build. They show how the system works, not results of a specific client.",
      },
      { q: "Do you work in English?", a: "Yes, at a conversational B1/B2 level, supported by AI tools. This site has an English version." },
    ],
  },
  kontakt: {
    kicker: "09",
    title: "Contact",
    intro: "Tell me what it is about. I will reply and we will book a call.",
    emailLabel: "E-mail",
    sitesLabel: "Sites",
    socialsLabel: "Social media",
    sites: [
      { href: site.socials.tercetlabs, label: "tercetlabs.pl" },
      { href: site.socials.asistel, label: "asistel.pl" },
    ],
  },
  thanks: {
    lines: ["Let's start", "with a call"],
    cta: ["Write", "to me"],
  },
};

export const content = { pl, en } as const;
export type SiteContent = typeof pl;
