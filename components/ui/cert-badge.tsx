/** Odznaka certyfikacji — Google G w tarczy (Umiejętności Jutra: AI). */
export function CertBadge({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 2.5 33.5 9v11.5c0 8.2-5.7 15.9-13.5 17.5C12.2 36.4 6.5 28.7 6.5 20.5V9L20 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M20.4 18.2v2.2h4.9c-.15 1.15-.53 1.99-1.12 2.58-.58.58-1.48 1.2-3.05 1.2-2.44 0-4.35-1.97-4.35-4.4 0-2.44 1.91-4.4 4.35-4.4 1.31 0 2.28.51 2.99 1.19l1.17-1.17C23.37 13.22 22.05 12.6 20.4 12.6c-2.83 0-5.12 2.29-5.12 5.12s2.29 5.12 5.12 5.12c1.64 0 2.88-.54 3.84-1.54.99-.99 1.3-2.38 1.3-3.56 0-.38-.03-.74-.09-1.04h-5.05Z"
        fill="currentColor"
      />
    </svg>
  );
}
