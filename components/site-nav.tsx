const links = [
  { href: "#co-robie", label: "Usługi" },
  { href: "#projekty", label: "Projekty" },
  { href: "#jak-pracuje", label: "Jak pracuję" },
  { href: "#o-mnie", label: "O mnie" },
];

export function SiteNav() {
  return (
    <nav aria-label="Główna" className="site-nav">
      <a className="nav-brand" href="#top">
        <span className="gem" aria-hidden="true" />
        <span className="font-mono">Maciej&nbsp;V.&nbsp;Sufa</span>
      </a>
      <div className="nav-menu">
        {links.map((l) => (
          <a key={l.href} className="nav-lnk font-mono" href={l.href}>
            {l.label}
          </a>
        ))}
        <a className="nav-cta btn-sound font-mono" href="#kontakt">
          Porozmawiajmy
        </a>
      </div>
    </nav>
  );
}
