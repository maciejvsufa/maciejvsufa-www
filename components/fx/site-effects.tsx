"use client";

import { useEffect } from "react";

/** Ciche dźwięki UI przy hover/klik na przyciskach i linkach nawigacji. */
export function SiteEffects() {
  useEffect(() => {
    let actx: AudioContext | undefined;
    const tone = (freq: number, dur: number, vol: number) => {
      try {
        actx = actx ?? new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        if (actx.state === "suspended") void actx.resume();
        const o = actx.createOscillator();
        const g = actx.createGain();
        const f = actx.createBiquadFilter();
        f.type = "lowpass";
        f.frequency.value = 760;
        f.Q.value = 0.6;
        o.type = "sine";
        o.frequency.value = freq;
        o.connect(f);
        f.connect(g);
        g.connect(actx.destination);
        const t = actx.currentTime;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(vol, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.start(t);
        o.stop(t + dur + 0.03);
      } catch {
        /* brak dźwięku — OK */
      }
    };

    const buttons = document.querySelectorAll(".btn-sound, .nav-menu a");
    const onEnter = () => tone(430, 0.16, 0.018);
    const onClick = () => {
      tone(300, 0.11, 0.03);
      setTimeout(() => tone(480, 0.14, 0.022), 45);
    };

    buttons.forEach((b) => {
      b.addEventListener("mouseenter", onEnter);
      b.addEventListener("click", onClick);
    });

    return () => {
      buttons.forEach((b) => {
        b.removeEventListener("mouseenter", onEnter);
        b.removeEventListener("click", onClick);
      });
    };
  }, []);

  return null;
}
