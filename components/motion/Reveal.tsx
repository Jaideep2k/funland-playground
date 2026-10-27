"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { intro, prefersReducedMotion, transition } from "@/lib/motion";

/** Run `play` now, or once any page-transition curtain lifts and the home intro has landed. */
export function afterCurtain(play: () => void, delay = 0.25) {
  let call: gsap.core.Tween | undefined;
  let offIntro = () => {};
  const go = () => {
    offIntro = intro.onDone(() => {
      call = gsap.delayedCall(transition.pending ? delay : 0, play);
    });
  };
  if (!transition.pending) {
    go();
    return () => {
      offIntro();
      call?.kill();
    };
  }
  const off = transition.onReveal(() => {
    off();
    call = gsap.delayedCall(delay, go);
  });
  return () => {
    off();
    offIntro();
    call?.kill();
  };
}

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Stagger the direct children instead of moving the block as one. */
  stagger?: number;
  y?: number;
  delay?: number;
  /** "pop" scales children up with a little bounce, for cards and stickers. */
  effect?: "rise" | "pop";
  id?: string;
};

/**
 * Scroll-into-view reveal, played once. The element starts hidden via `html.js [data-reveal]`,
 * so there is never a flash of the final state.
 */
export function Reveal({ as: Tag = "div", children, className, stagger, y = 32, delay = 0, effect = "rise", id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }
      const targets = stagger ? Array.from(el.children) : [el];
      gsap.set(el, { opacity: 1 });
      const from =
        effect === "pop"
          ? { opacity: 0, y: y * 1.3, scale: 0.94, rotate: (i: number) => (i % 2 ? 1.5 : -1.5) }
          : { opacity: 0, y };
      gsap.set(targets, from);
      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: effect === "pop" ? 1 : 1.1,
        ease: effect === "pop" ? "back.out(1.2)" : "expo.out",
        delay,
        stagger: stagger ?? 0,
        paused: true,
      });
      let st: ScrollTrigger | undefined;
      const cancel = afterCurtain(() => {
        st = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => tween.play() });
      }, 0.15);
      return () => {
        cancel();
        st?.kill();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={className} id={id}>
      {children}
    </Tag>
  );
}

type SplitProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "scroll" plays when the heading enters the viewport; "load" plays after the curtain/intro. */
  play?: "scroll" | "load";
  /** "lines" rise out of masks; "chars" bounce in one letter at a time. */
  by?: "lines" | "chars";
  id?: string;
};

/** Headline whose lines rise out of masks, or whose letters bounce in. */
export function SplitHeading({ as: Tag = "h2", children, className, delay = 0, play = "scroll", by = "lines", id }: SplitProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }
      let split: SplitText | undefined;
      let tween: gsap.core.Tween | undefined;
      let started = false;
      let cancelWait = () => {};
      let st: ScrollTrigger | undefined;
      const run = () => {
        split = SplitText.create(el, {
          // Letters rise inside their line's mask, so they never spill over other text while moving.
          type: by === "chars" ? "lines,words,chars" : "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { opacity: 1 });
            tween =
              by === "chars"
                ? gsap.from(self.chars, {
                    yPercent: 110,
                    rotate: (i: number) => (i % 2 ? 8 : -8),
                    duration: 1,
                    ease: "back.out(1.3)",
                    stagger: 0.018,
                    delay,
                    paused: !started,
                  })
                : gsap.from(self.lines, {
                    yPercent: 115,
                    duration: 1.1,
                    ease: "expo.out",
                    stagger: 0.09,
                    delay,
                    paused: !started,
                  });
            return tween;
          },
        });
        cancelWait = afterCurtain(() => {
          if (play === "load") {
            started = true;
            tween?.play();
          } else {
            st = ScrollTrigger.create({
              trigger: el,
              start: "top 90%",
              once: true,
              onEnter: () => {
                started = true;
                tween?.play();
              },
            });
          }
        }, 0.2);
      };
      // Split after the display face loads so line breaks match the final render.
      if (document.fonts?.status === "loaded") run();
      else document.fonts.ready.then(run);
      return () => {
        cancelWait();
        st?.kill();
        split?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={className} id={id}>
      {children}
    </Tag>
  );
}

/** Scroll-linked image reveal inside `scope`: frames open from an inset and photos settle from a zoom. */
export function useImageReveal(scope: React.RefObject<HTMLElement | null>, selector = "[data-img-reveal]") {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(selector).forEach((frame) => {
        const img = frame.querySelector("img");
        gsap.fromTo(
          frame,
          { clipPath: "inset(12% 10% 12% 10% round 2rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 95%", end: "top 45%", scrub: 0.6 },
          },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 } },
          );
        }
      });
    },
    { scope },
  );
}

/** Ambient behaviours for decorations inside `scope`:
 *  [data-float] bob gently, [data-spin] rotate slowly, [data-draw] paths draw on when scrolled into view,
 *  [data-parallax="0.3"] drift against the scroll. */
export function useAmbient(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = scope.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      (q("[data-float]") as HTMLElement[]).forEach((node, i) => {
        gsap.to(node, {
          y: `+=${gsap.utils.random(10, 22)}`,
          rotate: `+=${gsap.utils.random(-12, 12)}`,
          duration: gsap.utils.random(2.2, 3.6),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
      });
      (q("[data-spin]") as HTMLElement[]).forEach((node) => {
        gsap.to(node, { rotate: 360, duration: Number(node.dataset.spin) || 40, ease: "none", repeat: -1 });
      });
      (q("[data-draw]") as unknown as SVGPathElement[]).forEach((node) => {
        gsap.fromTo(
          node,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.3,
            ease: "power2.inOut",
            scrollTrigger: { trigger: node, start: "top 92%", once: true },
          },
        );
      });
      (q("[data-parallax]") as HTMLElement[]).forEach((node) => {
        const d = Number(node.dataset.parallax) || 0.2;
        gsap.to(node, {
          yPercent: -100 * d,
          ease: "none",
          scrollTrigger: { trigger: node, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      });
    },
    { scope },
  );
}

/** Numbers that count up when they scroll into view. */
export function CountUp({ to, className, prefix = "", suffix = "" }: { to: number; className?: string; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const obj = { v: 0 };
      el.textContent = `${prefix}0${suffix}`;
      let st: ScrollTrigger | undefined;
      const cancel = afterCurtain(() => {
        st = ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: to,
              duration: 1.6,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
              },
            }),
        });
      });
      return () => {
        cancel();
        st?.kill();
      };
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
