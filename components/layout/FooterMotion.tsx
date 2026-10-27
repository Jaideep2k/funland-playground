"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useAmbient } from "@/components/motion/Reveal";

/** Footer motion: the "Let the fun begin!" letters bounce up as the footer arrives. */
export function FooterMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useAmbient(ref);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const title = el.querySelector<HTMLElement>("[data-footer-title]");
      if (!title) return;
      let split: SplitText | undefined;
      const run = () => {
        split = SplitText.create(title, { type: "lines,words,chars", mask: "lines" });
        gsap.from(split.chars, {
          yPercent: 110,
          rotate: (i: number) => (i % 2 ? 8 : -8),
          duration: 1,
          ease: "back.out(1.3)",
          stagger: 0.025,
          scrollTrigger: { trigger: title, start: "top 92%", once: true },
        });
        ScrollTrigger.refresh();
      };
      if (document.fonts?.status === "loaded") run();
      else document.fonts.ready.then(run);
      return () => split?.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
