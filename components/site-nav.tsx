import type { SiteContent } from "@/lib/content";

export function SiteNav({ t }: { t: SiteContent }) {
  const isEn = t.lang === "en";
  const home = isEn ? "/en/" : "/";
  return (
    <nav aria-label={t.ui.navAria} className="site-nav">
      <a className="nav-brand" href={`${home}#top`}>
        <span className="gem" aria-hidden="true" />
        <span className="font-mono">Maciej&nbsp;V.&nbsp;Sufa</span>
      </a>
      <div className="nav-menu">
        {t.ui.nav.map((l) => (
          <a key={l.href} className="nav-lnk font-mono" href={l.href}>
            {l.label}
          </a>
        ))}
        <a className="nav-cta btn-sound font-mono" href="#kontakt">
          {t.ui.navCta}
        </a>
        <span className="lang-switch font-mono" aria-label={t.ui.langSwitchAria}>
          <a href="/" className={`lang-lnk${isEn ? "" : " lang-active"}`} aria-current={isEn ? undefined : "page"} lang="pl" hrefLang="pl">
            PL
          </a>
          <span aria-hidden="true" className="lang-sep">
            /
          </span>
          <a href="/en/" className={`lang-lnk${isEn ? " lang-active" : ""}`} aria-current={isEn ? "page" : undefined} lang="en" hrefLang="en">
            EN
          </a>
        </span>
      </div>
    </nav>
  );
}
