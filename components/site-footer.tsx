import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-[clamp(28px,6vw,80px)] py-[26px] text-[12.5px] text-text3">
      <span className="font-mono">© 2026 {site.name}</span>
      <span className="font-mono">
        <a className="transition-colors hover:text-accent" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        {" · PL / EU · "}
        <a className="transition-colors hover:text-accent" href="/privacy/">
          Polityka prywatności
        </a>
      </span>
    </footer>
  );
}
