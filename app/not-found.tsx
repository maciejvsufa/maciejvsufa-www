import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="pad-x mx-auto flex min-h-[70vh] max-w-[760px] flex-col items-center justify-center text-center">
      <p className="font-mono text-[13px] text-accent">404</p>
      <h1 className="mt-2 font-display text-[clamp(32px,5vw,52px)] font-semibold text-text">
        Tej strony nie ma
      </h1>
      <p className="mt-4 text-text2">Wróćmy na stronę główną.</p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-accent px-6 py-3.5 font-medium text-ink no-underline transition-colors hover:bg-accent2"
      >
        ← Strona główna
      </Link>
    </main>
  );
}
