import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Polityka prywatności — Maciej Sufa",
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
            z Instagrama), przybliżoną lokalizację, typ urządzenia i przeglądarki. Widzę te dane
            wyłącznie jako zbiorcze statystyki — sprawdzam w nich, które treści przyciągają ludzi.
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
            Administrator: {site.name}, {site.location}.
          </p>
        </div>
      </main>
    </>
  );
}
