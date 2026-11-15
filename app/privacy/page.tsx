import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import { content } from "@/lib/content";
import { Foot } from "@/components/sections/cv-sections";

const TITLE = "Polityka prywatności — Maciej V. Sufa";
const DESC = "Jakie dane zbiera strona maciejvsufa.pl, kto jest administratorem i jakie masz prawa.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/privacy/",
    languages: { pl: "/privacy/", en: "/en/privacy/", "x-default": "/privacy/" },
  },
  openGraph: { title: TITLE, description: DESC, url: `${site.url}/privacy/`, siteName: site.name, locale: "pl_PL", type: "website" },
  robots: { index: false, follow: true },
};

export default function Privacy() {
  return (
    <>
      <SiteHeader t={content.pl} showScroll={false} />
      <main id="main" className="page pad-x mx-auto max-w-[760px] pb-20 pt-[160px]">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-bold uppercase text-text">
          Polityka prywatności
        </h1>
        <div className="mt-6 space-y-4 leading-[1.65] text-text2">
          <p>
            Ta strona jest statyczna i nastawiona na prywatność. <strong>Nie używa</strong> pikseli
            reklamowych ani nie sprzedaje i nie udostępnia Twoich danych do celów reklamowych.
          </p>
          <p>
            Do statystyk odwiedzin używam narzędzia analitycznego <strong>Metricool</strong>{" "}
            (Metricool Software S.L., Hiszpania). Po załadowaniu strony skrypt Metricool zlicza
            wizyty i zbiera dane techniczne: odwiedzane podstrony, źródło wejścia (np. link
            z Instagrama), rozmiar okna przeglądarki, a po stronie serwera Metricool także adres
            IP (z niego przybliżoną lokalizację) oraz typ urządzenia i przeglądarki. Skrypt{" "}
            <strong>nie zapisuje</strong> w Twojej przeglądarce plików cookie ani innych danych.
            Widzę te dane wyłącznie jako zbiorcze statystyki — sprawdzam w nich, które treści
            przyciągają ludzi.
            Szczegóły znajdziesz w{" "}
            <a
              className="text-accent hover:text-accent2"
              href="https://metricool.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              polityce prywatności Metricool
            </a>
            . Możesz zablokować te statystyki dowolnym blokerem treści w przeglądarce.
          </p>
          <p>
            Kontakt odbywa się przez link e-mail (mailto). Jeśli napiszesz na{" "}
            <a className="text-accent hover:text-accent2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            , Twoja wiadomość trafia do mojej skrzynki Gmail i jest przetwarzana wyłącznie w celu
            odpowiedzi i ewentualnej współpracy. Nie udostępniam jej osobom trzecim.
          </p>
          <p>
            Strona hostowana jest jako pliki statyczne. Standardowe logi serwera (adres IP,
            informacje techniczne) mogą być przetwarzane przez dostawcę hostingu w celach
            bezpieczeństwa i diagnostyki.
          </p>
          <p>
            Masz prawo wglądu, poprawienia i usunięcia swoich danych. W tej sprawie napisz na adres
            powyżej.
          </p>
          <p className="font-mono text-[13px] text-text3">
            Administrator: {site.name}, prowadzący działalność gospodarczą {site.company.name}, NIP{" "}
            {site.company.nip}, {site.company.city}. Kontakt: {site.email}.
          </p>
        </div>
        <Foot t={content.pl} />
      </main>
    </>
  );
}
