"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useAmbient } from "@/components/motion/Reveal";

/** Footer motion: the "Let the fun begin!" letters rise in as the footer arrives. */
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
          yPercent: 100,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.02,
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
