import Link from "next/link";

/** Stethoscope mark + wordmark. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 font-extrabold text-lg text-ink">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-7 h-7"
      >
        <path
          d="M10 6v14a10 10 0 0 0 20 0V6"
          stroke="var(--brand)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="38" cy="34" r="6" stroke="var(--brand)" strokeWidth="4" />
        <path
          d="M20 30v4a12 12 0 0 0 12 4"
          stroke="var(--brand)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      StudiaCare
    </Link>
  );
}
