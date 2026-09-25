import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { MobileMenu, ScrollLabel } from "@/components/header-bits";

/**
 * Stały nagłówek jak w szablonie: po lewej imię i status, w kolumnie 75% „Pobierz CV / Napisz do mnie”,
 * po prawej język i strefa czasowa; na dole w kolumnie 75% napis „Przewiń” → „Do góry”.
 */
export function SiteHeader({ t, showScroll = true }: { t: SiteContent; showScroll?: boolean }) {
  const isEn = t.lang === "en";
  return (
    <header className="site-header">
      <div className="hdr-top">
        <div className="hdr-logo">
          <Link href={isEn ? "/en/" : "/"} className="hdr-name">
            {site.name}
          </Link>
          <span className="hdr-status">
            <span className="dot" aria-hidden="true" />
            {t.ui.status}
          </span>
        </div>

        <nav aria-label="Menu" className="hdr-links">
          <a href={t.ui.cvHref}>{t.ui.downloadCv}</a>
          <a href={`mailto:${site.email}`}>{t.ui.contactMe}</a>
        </nav>

        <div className="hdr-right">
          <span className="lang" aria-label={t.ui.langSwitchAria}>
            <Link href="/" hrefLang="pl" lang="pl" aria-current={isEn ? undefined : "page"} className={isEn ? "" : "on"}>
              PL
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/en/" hrefLang="en" lang="en" aria-current={isEn ? "page" : undefined} className={isEn ? "on" : ""}>
              EN
            </Link>
          </span>
          <span className="tz">{t.ui.timezone}</span>
        </div>

        <MobileMenu t={t} />
      </div>

      {showScroll ? <ScrollLabel scroll={t.ui.scroll} top={t.ui.backToTop} /> : null}
    </header>
  );
}
