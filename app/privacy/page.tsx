import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Polityka prywatności — Maciej Sufa",
  robots: { index: false, follow: true },
};

export default function Privacy() {
  return (
    <>
      <SiteNav t={content.pl} />
      <main id="main" className="pad-x mx-auto max-w-[760px] py-20">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-semibold text-text">
          Polityka prywatności
        </h1>
        <div className="mt-6 space-y-4 leading-[1.65] text-text2">
          <p>
            Ta strona jest statyczna i nastawiona na prywatność. <strong>Nie używa</strong> ciasteczek
            firm trzecich, trackerów, pikseli reklamowych ani narzędzi analitycznych. Nie zbiera
            i nie przechowuje Twoich danych w tle.
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
      <SiteFooter t={content.pl} />
    </>
  );
}
