import type { HTMLAttributes, ReactNode } from "react";

/**
 * A hand-lettered note on a marker swipe, with a doodled arrow curling down toward the headline.
 * GSAP wipes the marker on ([data-tag-marker]) and draws the arrow ([data-tag-arrow] path).
 */
export function HandTag({
  children,
  marker = "var(--color-sun)",
  arrow = true,
  className = "",
  ...rest
}: { children: ReactNode; marker?: string; arrow?: boolean; className?: string } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`relative inline-flex items-start gap-1 text-ink ${className}`} {...rest}>
      <span className="relative isolate inline-block -rotate-2 px-3 py-1">
        <svg
          data-tag-marker
          aria-hidden
          viewBox="0 0 320 64"
          preserveAspectRatio="none"
          className="absolute inset-0 -z-10 size-full overflow-visible"
        >
          <path
            d="M10 12c38-5 88-7 150-6 54 1 104 1 152 5 4 9 5 26 2 41-46 4-98 5-152 4-55 0-106 2-152 5-6-15-6-33 0-49Z"
            fill={marker}
          />
        </svg>
        <span className="whitespace-nowrap font-hand text-[clamp(1.3rem,1.4vw+0.95rem,1.95rem)] leading-none">{children}</span>
      </span>
      {arrow ? (
        <svg data-tag-arrow aria-hidden viewBox="0 0 64 64" fill="none" className="mt-3 hidden w-11 shrink-0 sm:block">
          <path d="M6 10c16-6 34-2 40 12 5 11 1 22-8 30" stroke="var(--color-ink)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M30 46l8 7 9-6" stroke="var(--color-ink)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </p>
  );
}
