import type { SiteContent } from "@/lib/content";
import { FitText } from "@/components/fx/fit-text";
import { SplitText } from "@/components/fx/split-text";

/**
 * Tło pierwszego ekranu: jasna siatka + pionowy portret („elegancja uśmiech 2”) jako panel
 * przy prawej krawędzi, jak w magazynie. Imię i cytat stoją po lewej, poza zdjęciem.
 * Wejście: zdjęcie powoli się przybliża do skali 1 (3 s).
 */
export function HeroBackdrop({ alt }: { alt: string }) {
  return (
    <div className="hero-bg">
      <div className="hero-photo">
        <picture>
          <source media="(max-width: 809px)" srcSet="/photos/hero-portret-640.webp" type="image/webp" />
          <img src="/photos/hero-portret.webp" alt={alt} width={1000} height={1501} fetchPriority="high" decoding="async" />
        </picture>
      </div>
    </div>
  );
}

/**
 * Pierwszy ekran jako scena „jednej strony”: zdjęcie, pomarańczowe liczby, wielkie imię,
 * rola, cytat prasowy po lewej. Przy przewijaniu tylko gaśnie — kolejna scena najeżdża od dołu.
 */
export function Hero({ t }: { t: SiteContent }) {
  const h = t.hero;
  return (
    <section aria-label={h.aria} className="scene scene-hero" data-tone="white" data-state="active">
      <HeroBackdrop alt={h.photoAlt} />
      <div className="hero">
      <div className="hero-main">
        {/* Cytat jak w gazecie: lekka kursywa, półprzezroczysty, po lewej — nie zasłania twarzy. */}
        <figure className="hero-quote">
          <blockquote>
            <SplitText as="p" text={h.quote} by="word" trigger="mount" start={1.4} stagger={0.018} />
          </blockquote>
          <figcaption>— {h.quoteBy}</figcaption>
        </figure>
        <p className="hero-stats">
          {h.stats.map((s) => (
            <span key={s} className="block">
              {s}
            </span>
          ))}
        </p>
        <div className="hero-name-box">
          <FitText as="h1" lines={h.nameLines} align="right" className="hero-name" fitHeightOf=".hero" />
        </div>
        <SplitText as="p" text={h.roleLine} by="word" trigger="mount" start={0.5} stagger={0.075} className="hero-role" />
      </div>
      </div>
    </section>
  );
}
