import type { IconName } from "@/lib/content";

const paths: Record<IconName, string> = {
  calendar: "M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  spark: "M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2.5 2.5 M15.5 15.5L18 18 M6 18l2.5-2.5 M15.5 8.5L18 6",
  search: "M11 5a6 6 0 1 0 0 12a6 6 0 1 0 0-12z M20 20l-4.5-4.5",
  link: "M10 14a4 4 0 0 1 0-5.6l2-2a4 4 0 0 1 5.6 5.6l-1 1 M14 10a4 4 0 0 1 0 5.6l-2 2a4 4 0 0 1-5.6-5.6l1-1",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  film: "M3 5h18v14H3z M7 5v14 M17 5v14 M3 9h4 M3 15h4 M17 9h4 M17 15h4",
  user: "M12 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8z M4 21a8 8 0 0 1 16 0",
  chart: "M5 20V11 M11 20V5 M17 20v-7 M3 20h18",
  check: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M8 12l3 3 5-6",
  clock: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M12 7v5l3 2",
  list: "M9 6h11 M9 12h11 M9 18h11 M4.5 6h.01 M4.5 12h.01 M4.5 18h.01",
};

export function Icon({ name, size = 14 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
