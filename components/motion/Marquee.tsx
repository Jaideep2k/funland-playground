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
      let settle: gsap.core.Tween | undefined;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 250);
          settle?.kill();
          loop.timeScale(v === 0 ? 1 : v);
          settle = gsap.to(loop, { timeScale: self.direction < 0 ? -1 : 1, duration: 0.9, ease: "power2.out" });
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
