import Image from "next/image";
import { oMnie } from "@/lib/content";
import { CertBadge } from "@/components/ui/cert-badge";

export function OMnie() {
  return (
    <section id="o-mnie" aria-labelledby="o-mnie-title" className="sheet-section">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <span className="eyebrow font-mono">{oMnie.kicker} · O mnie</span>
          <p
            id="o-mnie-title"
            className="mt-[18px] font-display text-[clamp(22px,2.8vw,34px)] font-medium leading-[1.32] tracking-[-0.015em]"
          >
            Najcenniejszy zasób to nie&nbsp;pieniądze — to <em className="text-accent2">czas życia</em>. Buduję rozwiązania,
            dzięki którym robotę robią roboty, a&nbsp;życie zostaje człowiekowi.
          </p>
          <p className="mt-[22px] max-w-[46ch] text-[15.5px] leading-[1.7] text-text2">{oMnie.background}</p>
          <p className="mt-[18px] max-w-[52ch] text-[15.5px] leading-[1.7] text-text2">{oMnie.teamIntro}</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {oMnie.teamRoles.map((item) => (
              <div
                key={item.role}
                className="rounded-xl border border-border bg-gradient-to-b from-surface2/50 to-surface/40 px-4 py-3.5"
              >
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">{item.role}</p>
                <p className="mt-1.5 text-[14px] leading-[1.6] text-text2">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-[18px] flex items-center gap-2.5 font-mono text-[13px] text-accent">
            <CertBadge className="h-7 w-7 shrink-0 text-accent" />
            <span>{oMnie.cert}</span>
          </p>
          <p className="mt-[22px] max-w-[46ch] text-[15.5px] leading-[1.7] text-text2">{oMnie.english}</p>
        </div>

        <div
          aria-hidden
          className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-[20px] border border-border md:max-w-none"
        >
          <Image
            src="/graphics/about-collaboration.svg"
            alt=""
            fill
            sizes="(max-width: 768px) 360px, 420px"
            className="object-cover opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
