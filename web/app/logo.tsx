export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="logo">
      <svg
        className="logo-mark"
        viewBox="0 0 48 48"
        role="img"
        aria-label="Transfer Engine logo: a gated arrow passing a checkpoint bar"
      >
        <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="var(--mark-bg)" />
        <path
          d="M9 24h20"
          stroke="var(--mark-line)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M27 15.5 35.5 24 27 32.5"
          fill="none"
          stroke="var(--mark-accent)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M22 9v30" stroke="var(--mark-accent)" strokeWidth="3.2" strokeLinecap="round" opacity="0.55" />
        <circle cx="12" cy="24" r="3.4" fill="var(--mark-accent)" />
      </svg>
      {!compact && (
        <span className="logo-type">
          <b>TRANSFER</b>
          <i>ENGINE</i>
        </span>
      )}
    </span>
  );
}
