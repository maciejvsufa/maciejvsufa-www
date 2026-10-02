import type { ReactNode } from "react";
import type { Card, SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { Scene, type Tone } from "@/components/fx/scene";
import { CopyEmail } from "@/components/ui/copy-email";
import { Cta } from "@/components/ui/cta";
import { Icon } from "@/components/viz/icon";
import { VizBody, VizPanel } from "@/components/viz/viz";

type Head = { kicker: string; title: string; intro?: string };

function Links({ links }: { links?: Card["links"] }) {
  if (!links) return null;
  return (
    <p className="pcard-links">
      {links.map((l) => (
        <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label} ↗
        </a>
      ))}
    </p>
  );
}

/**
 * Kafel jak w szablonie Makro: biały panel z etykietą, nagłówkiem, opisem i linijką z ptaszkiem
 * + panel wizualny z rozmytym tłem i pływającym widżetem. Co drugi kafel ma widżet po lewej.
 */
function Tile({ c, k, sample }: { c: Card; k: number; sample: string }) {
  return (
    <article className={`tile${k % 2 ? " is-flip" : ""}`}>
      <div className="tile-text">
        <span className="tag">
          <Icon name={c.icon} />
          {c.tag}
        </span>
        <h3 className="tile-h">{c.h}</h3>
        <p className="tile-p">{c.p}</p>
        <Links links={c.links} />
        {c.check ? (
          <p className="tile-check">
            <Icon name="check" size={16} />
            {c.check}
          </p>
        ) : null}
      </div>
      <VizPanel v={c.viz} sample={sample} tint={k} />
    </article>
  );
}

function tiles(h: Head, tone: Tone, list: Card[], sample: string) {
  return (
    <Scene
      wide
      num={h.kicker}
      title={h.title}
      intro={h.intro}
      tone={tone}
      items={list.map((c, k) => (
        <Tile key={c.h} c={c} k={k} sample={sample} />
      ))}
    />
  );
}

export function CoRobie({ t }: { t: SiteContent }) {
  return tiles(t.coRobie, "white", t.coRobie.items, t.ui.sample);
}

/** Co zyskujesz — bento jak w szablonie: cztery kafle naraz, ciemne i jasne na przemian. */
export function Korzysci({ t }: { t: SiteContent }) {
  const b = t.korzysci;
  return (
    <Scene
      wide
      num={b.kicker}
      title={b.title}
      intro={b.intro}
      tone="white"
      items={[
        <div key="bento" className="bento">
          {b.items.map((c, k) => (
            <article key={c.h} className={`bt${k % 2 === 0 ? " is-dark" : ""}`}>
              <span className="tag">
                <Icon name={c.icon} />
                {c.tag}
              </span>
              <h3 className="bt-h">{c.h}</h3>
              <p className="bt-p">{c.p}</p>
              <div className={`viz bt-viz viz-${c.viz.type}`} aria-hidden="true">
                <VizBody v={c.viz} />
              </div>
            </article>
          ))}
          <span className="bento-sample">{t.ui.sample}</span>
        </div>,
      ]}
    />
  );
}

export function Uslugi({ t }: { t: SiteContent }) {
  return tiles(t.uslugi, "sky", t.uslugi.items, t.ui.sample);
}

export function JakPracuje({ t }: { t: SiteContent }) {
  return tiles(t.jakPracuje, "white", t.jakPracuje.items, t.ui.sample);
}

/** Formy współpracy — trzy kolumny jak cennik w szablonie; środkowa wyróżniona (ciemna). */
export function Wspolpraca({ t }: { t: SiteContent }) {
  const w = t.wspolpraca;
  return (
    <Scene
      wide
      num={w.kicker}
      title={w.title}
      intro={w.intro}
      tone="sky"
      items={[
        <div key="plans" className="plans">
          {w.plans.map((p) => (
            <article key={p.h} className={`plan${p.featured ? " is-featured" : ""}`}>
              <h3 className="plan-h">{p.h}</h3>
              <p className="plan-p">{p.p}</p>
              <p className="plan-price">{p.price}</p>
              <ul className="plan-list">
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <a className="plan-btn" href={t.ui.ctaHref}>
                {w.pick} · {p.h}
              </a>
            </article>
          ))}
        </div>,
      ]}
    />
  );
}

export function Realizacje({ t }: { t: SiteContent }) {
  return tiles(t.realizacje, "white", t.realizacje.items, t.ui.sample);
}

export function Omnie({ t }: { t: SiteContent }) {
  return tiles(t.omnie, "sky", t.omnie.items, t.ui.sample);
}

function plain(h: Head, tone: Tone, items: ReactNode[]) {
  return <Scene num={h.kicker} title={h.title} intro={h.intro} tone={tone} items={items} />;
}

export function Faq({ t }: { t: SiteContent }) {
  const f = t.faq;
  return plain(f, "white", [
    <div key="faq" className="pcard faq">
      {f.items.map((it) => (
        <details key={it.q} name="faq">
          <summary>{it.q}</summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>,
  ]);
}

export function Kontakt({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  const socials = [
    { href: site.socials.instagram, label: "Instagram" },
    { href: site.socials.facebook, label: "Facebook" },
    { href: site.socials.linkedin, label: "LinkedIn" },
    { href: site.socials.github, label: "GitHub" },
  ];
  return plain(k, "sky", [
    <div key="k" className="contact-grid">
      <div className="pcard pcard-dark contact-mail">
        <span className="pcard-kicker">{k.emailLabel}</span>
        <a className="cval" href={t.ui.ctaHref}>
          {site.email}
        </a>
        <div className="contact-actions">
          <Cta href={t.ui.ctaHref} label={t.ui.cta} />
          <CopyEmail email={site.email} label={t.ui.copyEmail} copied={t.ui.emailCopied} />
        </div>
      </div>
      <div className="pcard">
        <p className="meta mb-2">{k.sitesLabel}</p>
        {k.sites.map((s) => (
          <a key={s.label} className="cval" href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <div className="pcard">
        <p className="meta mb-2">{k.socialsLabel}</p>
        {socials.map((s) => (
          <a key={s.label} className="cval" href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </div>,
  ]);
}
