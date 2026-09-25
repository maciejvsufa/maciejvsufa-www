import type { SiteContent } from "@/lib/content";
import { SecHead } from "@/components/ui/sec-head";

export function Umiejetnosci({ t }: { t: SiteContent }) {
  const s = t.skills;
  return (
    <section id="umiejetnosci" aria-labelledby="umiejetnosci-title" className="cv-section">
      <SecHead id="umiejetnosci-title" num={s.kicker} title={s.title} />
      <div className="grid gap-6">
        {s.groups.map((g) => (
          <div key={g.h} className="grid gap-3 sm:grid-cols-[160px_1fr]">
            <h3 className="font-mono text-[13px] text-text3">{g.h}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li key={it} className="tag">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
