"use client";

import { useRef, useState } from "react";

/** Przycisk kopiujący adres e-mail do schowka (mobile bez klienta poczty). */
export function CopyEmail({ email, label, copied }: { email: string; label: string; copied: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // starsze przeglądarki bez Clipboard API — fallback przez zaznaczenie
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 2000);
  };

  return (
    <button type="button" className="btn btn-ghost btn-sound" onClick={copy} aria-live="polite">
      {done ? copied : label}
    </button>
  );
}
