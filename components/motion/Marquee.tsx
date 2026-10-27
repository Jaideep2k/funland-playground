"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Endless ribbon. It speeds up and flips direction with the scroll, then eases back to cruising.
 */
export function Marquee({
  children,
  className = "",
  speed = 40,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds per loop. */
  speed?: number;
  reverse?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const track = el.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const loop = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: speed, ease: "none", repeat: -1 },
      );
      // Scrolling nudges the ribbon faster (and backwards when scrolling up), then it eases back to cruising.
      let settle: gsap.core.Timeline | undefined;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const dir = self.direction < 0 ? -1 : 1;
          const boost = 1 + Math.min(3, Math.abs(self.getVelocity()) / 900);
          settle?.kill();
          settle = gsap
            .timeline()
            .to(loop, { timeScale: dir * boost, duration: 0.35, ease: "power2.out" })
            .to(loop, { timeScale: dir, duration: 1.4, ease: "power2.inOut" });
        },
      });
      return () => {
        st.kill();
        settle?.kill();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      <div data-track className="flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
