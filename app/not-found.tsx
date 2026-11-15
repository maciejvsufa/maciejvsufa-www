import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nie znaleziono — Maciej V. Sufa",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="pad-x mx-auto flex min-h-[70vh] max-w-[760px] flex-col items-center justify-center text-center">
      <p className="font-mono text-[13px] text-accent">404</p>
      <h1 className="mt-2 font-display text-[clamp(32px,5vw,52px)] font-semibold text-text">
        Tej strony nie ma
      </h1>
      <p className="mt-4 text-text2">Zajrzyj do portfolio albo wróć na stronę główną.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/portfolio/"
          className="rounded-xl bg-accent px-6 py-3.5 font-medium text-ink no-underline transition-colors hover:bg-accent2"
        >
          Portfolio
        </Link>
        <Link href="/" className="rounded-xl border border-line px-6 py-3.5 font-medium text-text no-underline">
          ← Strona główna
        </Link>
      </div>
      <p className="mt-6 text-[14px] text-text3">
        <a className="lnk" href="https://www.instagram.com/maciejvsufa/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>{" "}
        ·{" "}
        <a className="lnk" href="https://www.linkedin.com/in/maciej-sufa" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </p>
    </main>
  );
}
