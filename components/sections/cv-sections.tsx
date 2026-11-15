import type { CSSProperties } from "react";
import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { Scene } from "@/components/fx/scene";
import { ActingButton } from "@/components/ui/acting-dialog";
import { CertificateButton } from "@/components/ui/certificate-dialog";
import { CopyEmail } from "@/components/ui/copy-email";
import { Cta } from "@/components/ui/cta";
import { Icon } from "@/components/viz/icon";
import { ReelRow } from "@/components/sections/reel-row";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Pod okładkami: skąd liczba i jedna linia współtwórcy. */
function ZakresFoot({ t }: { t: SiteContent }) {
  const z = t.coRobie;
  return (
    <div className="zakres-foot">
      <p className="zakres-proof">
        <Icon name="check" size={16} />
        {z.dowodLabel}{" "}
        {z.dowod.map((l, k) => (
          <span key={l.href}>
            {k > 0 ? " · " : null}
            <a className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          </span>
        ))}
      </p>
      <span className="bento-sample">{t.ui.sample}</span>
    </div>
  );
}

/** Tablica „Co robię”: trzy okładki rolek, nie lista kroków. */
export function Zakres({ t }: { t: SiteContent }) {
  const z = t.coRobie;
  const Board = () => (
    <div className="zakres">
      <ReelRow reels={z.reels} viewsWord={z.viewsWord} />
      <ZakresFoot t={t} />
    </div>
  );
  return (
    <Scene
      wide
      num={z.kicker}
      title={z.title}
      intro={z.intro}
      tone="sky"
      items={[<Board key="wide" />]}
      itemsWideOnly
      phoneItems={[<Board key="phone" />]}
    />
  );
}

/** O mnie + aktorstwo w jednej linii + przycisk do pełnej listy ról (bez zdjęcia). */
function AboutText({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  const a = t.aktorstwo;
  return (
    <div className="about-text">
      {k.about.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <p className="about-acting">
        <span className="about-acting-line">{a.line}:</span>
        <span className="about-titles">
          {a.titles.map((x, n) => (
            <span key={x} className="about-title" style={i(n)}>
              {x}
            </span>
          ))}
        </span>
      </p>
      <div className="about-actions">
        <ActingButton label={a.button} />
        <CertificateButton c={t.certyfikat} />
      </div>
    </div>
  );
}

function Photo({ t, className }: { t: SiteContent; className: string }) {
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, plik już zoptymalizowany */}
      <img src="/photos/maciej-warszawa.webp" alt={t.kontakt.photoAlt} width={1600} height={1067} loading="lazy" decoding="async" />
    </div>
  );
}

/** Telefon: zdjęcie nad tekstem. */
function About({ t }: { t: SiteContent }) {
  return (
    <div className="about">
      <Photo t={t} className="about-photo" />
      <AboutText t={t} />
    </div>
  );
}

/** Social w stopce i w kontakcie: kolejność z briefu 15.11.2026. GitHub tylko w kontakcie. */
const socialsMain = [
  { href: site.socials.instagram, label: "Instagram" },
  { href: site.socials.facebook, label: "Facebook" },
  { href: site.socials.youtube, label: "YouTube" },
  { href: site.socials.tiktok, label: "TikTok" },
  { href: site.socials.linkedin, label: "LinkedIn" },
];
const socials = [...socialsMain, { href: site.socials.github, label: "GitHub" }];

export function Foot({ t }: { t: SiteContent }) {
  const en = t.lang === "en";
  const base = en ? "/en" : "";
  return (
    <footer className="foot">
      <nav className="foot-nav" aria-label={en ? "Footer" : "Stopka"}>
        <a href={`${base}/`}>{en ? "Home" : "Strona główna"}</a>
        <a href={`${base}/portfolio/`}>Portfolio</a>
        <a href={`${base}/cv/`}>CV</a>
        {en ? null : <a href="/aktorstwo/">Aktorstwo</a>}
        <a href={`${base}/#kontakt`}>{en ? "Contact" : "Kontakt"}</a>
        <a href={`${base}/privacy/`}>{t.ui.footerPrivacy}</a>
      </nav>
      <p className="foot-social">
        {socialsMain.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </p>
      <p className="foot-legal">
        © 2026 {site.name} · {site.company.name} · NIP {site.company.nip} · {site.company.city}
      </p>
    </footer>
  );
}

/** Telefon: kontakt jako osobna karta. */
function Contact({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  return (
    <div className="contact-wrap">
      <div className="contact-grid">
        <div className="pcard contact-mail">
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
          <p className="contact-socials">
            {socials.map((s) => (
              <a key={s.label} className="lnk" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </p>
        </div>
      </div>
      <Foot t={t} />
    </div>
  );
}

/** Komputer: zdjęcie i opis osoby, bez kontaktu. */
function KtoAbout({ t }: { t: SiteContent }) {
  return (
    <div className="kto">
      <div className="kto-grid">
        <Photo t={t} className="kto-panel kto-photo" />
        <div className="kto-panel kto-about">
          <AboutText t={t} />
        </div>
      </div>
    </div>
  );
}

/** Komputer: jedna karta kontaktu na własnej tablicy. */
function ContactCard({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  return (
    <div className="kontakt-board">
      <div className="kto-panel kto-contact kontakt-card">
        <p className="kto-lead">{k.contactLead}</p>
        <span className="pcard-kicker">{k.emailLabel}</span>
        <a className="cval" href={t.ui.ctaHref}>
          {site.email}
        </a>
        <div className="contact-actions">
          <Cta href={t.ui.ctaHref} label={t.ui.cta} />
          <CopyEmail email={site.email} label={t.ui.copyEmail} copied={t.ui.emailCopied} />
        </div>
        <div className="kto-links">
          <div>
            <p className="meta">{k.sitesLabel}</p>
            {k.sites.map((s) => (
              <a key={s.label} className="lnk" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <div>
            <p className="meta">{k.socialsLabel}</p>
            {socials.map((s) => (
              <a key={s.label} className="lnk" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Foot t={t} />
    </div>
  );
}

/** Tablica 02 — opis osoby. Telefon: zdjęcie i tekst na jednej karcie. */
export function Osoba({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  return (
    <Scene
      wide
      num={k.kicker}
      title={k.title}
      intro={k.intro}
      tone="white"
      items={[<KtoAbout key="wide" t={t} />]}
      itemsWideOnly
      phoneItems={[<About key="about" t={t} />]}
    />
  );
}

/** Tablica 03 — kontakt, dopiero po kolejnym przewinięciu. */
export function Kontakt({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  return (
    <Scene
      wide
      num={k.contactKicker}
      title={k.contactTitle}
      tone="white"
      items={[<ContactCard key="wide" t={t} />]}
      itemsWideOnly
      phoneItems={[<Contact key="contact" t={t} />]}
    />
  );
}
