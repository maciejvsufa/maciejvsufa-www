import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="pad-x mx-auto flex max-w-[1180px] flex-col gap-3 py-8 text-[13px] text-text3 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 {site.name} · {site.location}</span>
        <nav aria-label="Stopka" className="flex gap-5 font-mono">
          <a className="transition-colors hover:text-accent" href={site.socials.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="transition-colors hover:text-accent" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-accent" href="/privacy/">
            Polityka prywatności
          </a>
        </nav>
      </div>
    </footer>
  );
}
