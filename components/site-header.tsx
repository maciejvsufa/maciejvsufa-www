import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { MobileMenu, ScrollLabel } from "@/components/header-bits";

/**
 * Stały nagłówek jak w Makro: po lewej imię i status, pośrodku linki do sekcji,
 * po prawej język i przycisk „Umów rozmowę”; na dole „Przewiń” → „Do góry”.
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
          {t.ui.nav.map((n) => (
            <a key={n.href} href={showScroll ? n.href : `${isEn ? "/en/" : "/"}${n.href}`}>
              {n.label}
            </a>
          ))}
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
          <a className="hdr-cta" href={t.ui.ctaHref}>
            {t.ui.cta}
            <i aria-hidden="true">↗</i>
          </a>
        </div>

        <MobileMenu t={t} />
      </div>

      {showScroll ? <ScrollLabel scroll={t.ui.scroll} top={t.ui.backToTop} /> : null}
    </header>
  );
}
