import { site } from "@/lib/site";

const links = [
  { href: "#co-robie", label: "Co robię" },
  { href: "#projekty", label: "Projekty" },
  { href: "#jak-pracuje", label: "Jak pracuję" },
  { href: "#kontakt", label: "Kontakt" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Główna"
        className="pad-x mx-auto flex max-w-[1180px] items-center justify-between py-4"
      >
        <a href="#main" className="font-display text-lg font-semibold tracking-tight text-text">
          MVS<span className="text-accent">.</span>
        </a>
        <ul className="hidden gap-7 font-mono text-[13px] text-text2 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a className="transition-colors hover:text-accent" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${site.email}`}
          className="rounded-lg border border-border px-4 py-2 font-mono text-[13px] text-text transition-colors hover:border-accent hover:text-accent"
        >
          Napisz →
        </a>
      </nav>
    </header>
  );
}
