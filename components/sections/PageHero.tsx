"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import type { Photo } from "@/content/photos";
import type { Tone } from "@/content/parties";
import { afterCurtain, SplitHeading } from "@/components/motion/Reveal";
import { Dot, Sparkle, Star, Wave } from "@/components/ui/Shapes";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const soft: Record<Tone, string> = {
  pink: "var(--color-pink-soft)",
  sun: "var(--color-sun-soft)",
  sky: "var(--color-sky-soft)",
  ink: "#e7e6f6",
};

const accent: Record<Tone, string> = {
  pink: "text-pink",
  sun: "text-ink",
  sky: "text-sky-deep",
  ink: "text-ink",
};

const tilts = [-5, 4, -2];

/** Interior page hero: tinted band, bouncing title, and a little pile of sticker photos. */
export function PageHero({
  eyebrow,
  title,
  lede,
  tone = "pink",
  photos = [],
  actions,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: Tone;
  photos?: Photo[];
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const items = q("[data-hero-fade]");
      const pics = q("[data-hero-photo]");
      const shapes = q("[data-hero-shape]");
      if (prefersReducedMotion()) {
        gsap.set([...items, ...pics, ...shapes], { autoAlpha: 1 });
        return;
      }
      gsap.set([...items, ...pics, ...shapes], { autoAlpha: 0 });
      const cancel = afterCurtain(() => {
        gsap
          .timeline()
          .fromTo(items, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.25)
          .fromTo(
            pics,
            { autoAlpha: 0, scale: 0.5, y: 80, rotate: (i) => (i % 2 ? 25 : -25) },
            { autoAlpha: 1, scale: 1, y: 0, rotate: (i) => tilts[i % tilts.length], duration: 1.1, ease: "back.out(1.5)", stagger: 0.12 },
            0.1,
          )
          .fromTo(shapes, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(2.4)", stagger: 0.08 }, 0.5)
          .add(() => {
            shapes.forEach((s, i) =>
              gsap.to(s, { y: "+=14", rotate: "+=12", duration: 2.4 + i * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1 }),
            );
          });
      }, 0.05);

      let off = () => {};
      if (hasFinePointer()) {
        const movers = pics.map((p, i) => ({
          d: 0.5 + i * 0.35,
          x: gsap.quickTo(p.parentElement!, "x", { duration: 1, ease: "power3.out" }),
          y: gsap.quickTo(p.parentElement!, "y", { duration: 1, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * 30 * m.d);
            m.y(ny * 20 * m.d);
          });
        };
        el.addEventListener("pointermove", onMove);
        off = () => el.removeEventListener("pointermove", onMove);
      }
      return () => {
        cancel();
        off();
      };
    },
    { scope: root },
  );

  const hasPhotos = photos.length > 0;

  return (
    <section ref={root} className="relative isolate">
      <div className="dots relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-44" style={{ backgroundColor: soft[tone] }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div data-hero-shape className="absolute left-[4%] top-[26%] w-9 md:w-12">
            <Star />
          </div>
          <div data-hero-shape className="absolute right-[5%] top-[22%] hidden w-9 md:block">
            <Sparkle fill="var(--color-sky)" />
          </div>
          <div data-hero-shape className="absolute bottom-[14%] left-[46%] hidden w-8 lg:block">
            <Dot fill="var(--color-pink)" />
          </div>
        </div>

        <div className={`wrap grid items-center gap-12 ${hasPhotos ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}>
          <div className={hasPhotos ? "" : "mx-auto max-w-4xl text-center"}>
            <p
              data-hero-fade
              className="eyebrow inline-flex rounded-full border-[2.5px] border-ink bg-cloud px-4 py-1.5 shadow-[3px_3px_0_0_var(--color-ink)]"
            >
              <span aria-hidden className="size-2.5 rounded-full bg-pink" />
              {eyebrow}
            </p>
            <SplitHeading as="h1" by="chars" play="load" delay={0.15} className={`mt-6 font-display text-headline ${accent[tone]}`}>
              {title}
            </SplitHeading>
            {lede ? (
              <div data-hero-fade className={`mt-6 text-lede text-ink-soft ${hasPhotos ? "max-w-[38rem]" : "mx-auto max-w-[44rem]"}`}>
                {lede}
              </div>
            ) : null}
            {actions ? (
              <div data-hero-fade className={`mt-8 flex flex-wrap gap-3 ${hasPhotos ? "" : "justify-center"}`}>
                {actions}
              </div>
            ) : null}
            {children ? <div data-hero-fade>{children}</div> : null}
          </div>

          {hasPhotos ? (
            <div className="relative mx-auto h-[clamp(18rem,62vw,30rem)] w-full max-w-[34rem]">
              {photos.slice(0, 3).map((p, i) => {
                const pos = [
                  "left-0 top-[6%] w-[58%] z-10",
                  "right-0 top-0 w-[46%] z-20",
                  "left-[26%] bottom-0 w-[50%] z-30",
                ][i];
                return (
                  <div key={p.src} className={`absolute ${pos}`}>
                    <div
                      data-hero-photo
                      className="overflow-hidden rounded-[1.4rem] border-[3px] border-ink bg-cloud p-1.5 shadow-[var(--shadow-sticker-lg)]"
                      style={{ transform: `rotate(${tilts[i]}deg)` }}
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={p.w}
                        height={p.h}
                        priority={i === 0}
                        sizes="(min-width: 1024px) 22vw, 50vw"
                        className={`w-full rounded-[1rem] object-cover ${i === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <Wave fill={soft[tone]} flip className="-mt-px" />
    </section>
  );
}
