"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { CheckIcon } from "@/components/ui/Icons";
import { Star } from "@/components/ui/Shapes";

const bg = { pink: "bg-pink-soft", sun: "bg-sun-soft", sky: "bg-sky-soft" } as const;

/** A cheerful "got it" card that pops in where the form was. */
export function FormSuccess({ title, children, tone = "sky" }: { title: string; children: ReactNode; tone?: keyof typeof bg }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap
        .timeline()
        .from(ref.current, { scale: 0.8, rotate: -3, autoAlpha: 0, duration: 0.8, ease: "back.out(1.8)" })
        .from("[data-success-badge]", { scale: 0, rotate: -180, duration: 0.8, ease: "back.out(2.2)" }, "-=0.5")
        .from("[data-success-star]", { scale: 0, duration: 0.6, ease: "back.out(3)", stagger: 0.1 }, "-=0.4");
      ref.current.focus({ preventScroll: true });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} tabIndex={-1} role="status" className={`sticker-lg relative overflow-hidden p-8 text-center outline-none md:p-12 ${bg[tone]}`}>
      <div data-success-star aria-hidden className="absolute left-6 top-6 w-10">
        <Star />
      </div>
      <div data-success-star aria-hidden className="absolute bottom-6 right-8 w-8">
        <Star fill="var(--color-pink)" />
      </div>
      <span data-success-badge className="mx-auto grid size-20 place-items-center rounded-full border-[3px] border-ink bg-sun shadow-[var(--shadow-sticker)]">
        <CheckIcon width={40} height={40} />
      </span>
      <h2 className="mt-6 font-display text-title">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-lede text-ink-soft">{children}</p>
    </div>
  );
}
