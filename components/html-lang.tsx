"use client";

import { useEffect } from "react";

/**
 * Ustawia atrybut lang na <html> po stronie klienta.
 * Root layout renderuje <html lang="pl"> — na "/en/" nadpisujemy na "en"
 * (static export: jeden root layout, brak per-route <html>).
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
