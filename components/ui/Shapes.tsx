import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

/** Rounded five-point star, filled, with the logo's indigo outline. */
export function Star({ fill = "var(--color-sun)", ...props }: P) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden {...props}>
      <path
        d="M50 6c3 0 5 2 6.4 5.2l9 18.6 20.4 3c3.4.5 5.6 2 6.4 4.6.8 2.6-.2 5.2-2.6 7.6L74.8 59.6l3.5 20.3c.6 3.4-.3 5.8-2.5 7.4-2.2 1.6-5 1.6-8 0L50 77.7l-18 9.6c-3 1.6-5.8 1.6-8 0s-3-4-2.5-7.4l3.5-20.3L10.4 45c-2.4-2.4-3.4-5-2.6-7.6.8-2.6 3-4.1 6.4-4.6l20.4-3 9-18.6C45 8 47 6 50 6Z"
        fill={fill}
        stroke="var(--color-ink)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Four-point sparkle. */
export function Sparkle({ fill = "var(--color-pink)", ...props }: P) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden {...props}>
      <path
        d="M50 4c3 26 20 43 46 46-26 3-43 20-46 46-3-26-20-43-46-46C30 47 47 30 50 4Z"
        fill={fill}
        stroke="var(--color-ink)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dot({ fill = "var(--color-sky)", ...props }: P) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden {...props}>
      <circle cx="50" cy="50" r="42" fill={fill} stroke="var(--color-ink)" strokeWidth="7" />
      <circle cx="36" cy="34" r="10" fill="#fff" opacity="0.55" />
    </svg>
  );
}

export function Ring({ stroke = "var(--color-pink)", ...props }: P) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden {...props}>
      <circle cx="50" cy="50" r="36" fill="none" stroke="var(--color-ink)" strokeWidth="24" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={stroke} strokeWidth="14" />
    </svg>
  );
}

/** Hand-drawn squiggle, drawn on with DrawSVG. */
export function Squiggle({ stroke = "var(--color-pink)", ...props }: P) {
  return (
    <svg viewBox="0 0 300 30" fill="none" aria-hidden preserveAspectRatio="none" {...props}>
      <path
        data-draw
        d="M4 18c18-14 30-14 44 0s28 14 44 0 30-14 46 0 28 14 44 0 30-14 46 0 28 14 46 0"
        stroke={stroke}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Zigzag({ stroke = "var(--color-sky)", ...props }: P) {
  return (
    <svg viewBox="0 0 120 40" fill="none" aria-hidden {...props}>
      <path
        d="M6 30 22 10l16 20 16-20 16 20 16-20 16 20 12-14"
        stroke="var(--color-ink)"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 30 22 10l16 20 16-20 16 20 16-20 16 20 12-14"
        stroke={stroke}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Soft wave edge between sections. `flip` turns it upside down. */
export function Wave({ fill = "var(--color-ink)", flip = false, className = "" }: { fill?: string; flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-[clamp(28px,4vw,64px)] w-full ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 48c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v32H0Z"
        fill={fill}
      />
    </svg>
  );
}
