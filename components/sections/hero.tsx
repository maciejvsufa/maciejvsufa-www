import type { SiteContent } from "@/lib/content";
import { FitText } from "@/components/fx/fit-text";
import { SplitText } from "@/components/fx/split-text";

/**
 * Stałe tło strony (przewijana treść jedzie po nim), czarno-białe, dwie warstwy:
 * rozmyte tło na cały ekran + postać przy prawej krawędzi — twarz wypada w pasie,
 * którego czarny panel nie zasłania, więc wizerunek widać przez całe przewijanie.
 * Wejście: skala 1.2 → 1 przez 3 s (jak w szablonie).
 */
export function HeroBackdrop({ alt }: { alt: string }) {
  return (
    <div className="hero-bg">
      <div className="hero-bg-zoom">
        <picture>
          <source media="(max-width: 809px)" srcSet="/hero-fig-480.webp" type="image/webp" />
          <img
            className="hero-fig"
            src="/hero-fig.webp"
            alt={alt}
            width={800}
            height={995}
            fetchPriority="high"
            decoding="async"
          />
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
