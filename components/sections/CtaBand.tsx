"use client";

import { useRef, type ReactNode } from "react";
import type { Tone } from "@/content/parties";
import { Reveal, SplitHeading, useAmbient } from "@/components/motion/Reveal";
import { Dot, Ring, Sparkle, Star } from "@/components/ui/Shapes";

const bg: Record<Tone, string> = {
  pink: "bg-pink text-white",
  sun: "bg-sun text-ink",
  sky: "bg-sky text-ink",
  ink: "bg-ink text-cream",
};

/** Big, loud call-to-action block with floating confetti shapes. */
export function CtaBand({
  eyebrow,
  title,
  body,
  tone = "pink",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useAmbient(ref);
  return (
    <section ref={ref} className="wrap py-[clamp(3rem,7vw,6rem)]">
      <div className={`sticker-lg relative overflow-hidden px-6 py-14 text-center md:px-16 md:py-20 ${bg[tone]}`}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div data-float className="absolute left-[6%] top-[14%] w-10 md:w-16">
            <Star fill={tone === "sun" ? "var(--color-pink)" : "var(--color-sun)"} />
          </div>
          <div data-float className="absolute bottom-[12%] right-[7%] w-10 md:w-14">
            <Ring stroke={tone === "sky" ? "var(--color-pink)" : "var(--color-sky)"} />
          </div>
          <div data-float className="absolute right-[18%] top-[12%] hidden w-8 md:block">
            <Sparkle fill={tone === "pink" ? "var(--color-sun)" : "var(--color-pink)"} />
          </div>
          <div data-float className="absolute bottom-[18%] left-[16%] hidden w-7 md:block">
            <Dot fill={tone === "ink" ? "var(--color-pink)" : "var(--color-cloud)"} />
          </div>
        </div>
        <div className="relative mx-auto max-w-3xl">
          {eyebrow ? (
            <Reveal as="p" className="eyebrow justify-center opacity-90" y={12}>
              {eyebrow}
            </Reveal>
          ) : null}
          <SplitHeading className="mt-3 font-display font-display-heavy text-headline">
            {title}
          </SplitHeading>
          {body ? (
            <Reveal as="div" className="mx-auto mt-5 max-w-xl text-lede opacity-90" delay={0.1}>
              {body}
            </Reveal>
          ) : null}
          {children ? (
            <Reveal className="mt-8 flex flex-wrap justify-center gap-3" stagger={0.08} effect="pop">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
