"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

type Mover = { x: gsap.QuickToFunc; y: gsap.QuickToFunc; r?: gsap.QuickToFunc };

/**
 * Site-wide pointer play, wired once with event delegation so it covers every page:
 *  [data-magnetic] buttons lean toward the cursor,
 *  [data-tilt] cards tip in 3D under the cursor.
 */
export function Interactions() {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const movers = new WeakMap<HTMLElement, Mover>();
    let active: HTMLElement | null = null;

    const get = (el: HTMLElement, tilt: boolean) => {
      let m = movers.get(el);
      if (!m) {
        if (tilt) gsap.set(el, { transformPerspective: 900 });
        m = tilt
          ? {
              x: gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" }),
              y: gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" }),
            }
          : {
              x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" }),
              y: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" }),
            };
        movers.set(el, m);
      }
      return m;
    };

    const release = (el: HTMLElement) => {
      const m = movers.get(el);
      if (!m) return;
      m.x(0);
      m.y(0);
    };

    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic],[data-tilt]") ?? null;
      if (active && active !== target) release(active);
      active = target;
      if (!target) return;
      const tilt = target.hasAttribute("data-tilt");
      const r = target.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      const m = get(target, tilt);
      if (tilt) {
        m.x(nx * 10);
        m.y(-ny * 10);
      } else {
        m.x(nx * 12);
        m.y(ny * 10);
      }
    };

    const onLeave = () => {
      if (active) release(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
