import type { SiteContent } from "@/lib/content";
import { SplitText } from "@/components/fx/split-text";
import { Cta } from "@/components/ui/cta";

/**
 * Tło pierwszego ekranu: zdjęcie na całą ramkę, tło zdjęcia ma ten sam kolor co scena (#ebf2fa),
 * więc tekst po lewej leży na czystym polu. Wejście: zdjęcie powoli wraca do skali 1 (3 s).
 */
export function HeroBackdrop({ alt }: { alt: string }) {
  return (
    <div className="hero-bg">
      <div className="hero-photo">
        <picture>
          <source media="(max-width: 809px)" srcSet="/photos/hero-maciej-900.webp" type="image/webp" />
          <img src="/photos/hero-maciej.webp" alt={alt} width={1624} height={969} fetchPriority="high" decoding="async" />
        </picture>
      </div>
    </div>
  );
}

/** Pierwszy ekran jako scena „jednej strony”: znaczek, nagłówek, podtekst, przycisk, fakty. */
export function Hero({ t }: { t: SiteContent }) {
  const h = t.hero;
  return (
    <section aria-label={h.aria} className="scene scene-hero" data-tone="white" data-state="active">
      <HeroBackdrop alt={h.photoAlt} />
      <div className="hero">
        <div className="hero-main">
          <p className="hero-badge">
            <i aria-hidden="true" />
            {h.badge}
          </p>
          <SplitText as="h1" text={h.title} by="word" trigger="mount" start={0.45} stagger={0.06} className="hero-title" />
          <p className="hero-lead">{h.lead}</p>
          <div className="hero-actions">
            <Cta href={t.ui.ctaHref} label={t.ui.cta} />
          </div>
          <ul className="hero-facts">
            {h.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
