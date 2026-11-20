"use client";

import { useEffect } from "react";

/**
 * Ustawia lang na <html> po hydracji, gdy ktoś przechodzi między PL i EN bez pełnego przeładowania.
 * Sam plik z eksportu statycznego poprawia scripts/fix-en-html.mjs — root layout ma jedno <html lang="pl">,
 * a useEffect nie zmienia tego, co widać w view-source.
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
