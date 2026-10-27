"use client";

import Image from "next/image";
import { useRef } from "react";
import { partyDecor } from "@/content/photos";
import { ButtonLink } from "@/components/ui/Button";
import { SplitHeading, Reveal } from "@/components/motion/Reveal";
import { Star } from "@/components/ui/Shapes";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const tilts = [-4, 3, -2, 5, -3, 2, -5, 4, -2, 3, -4, 2];

/**
 * Party wall. On wide screens the section pins and the photos slide sideways as you scroll;
 * on phones it is a swipeable row.
 */
export function PartyScroller() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = el.querySelector<HTMLElement>("[data-track]")!;
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
        const distance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.08;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        cards.forEach((c, i) => {
          gsap.fromTo(
            c,
            { rotate: tilts[i % tilts.length] * 2.2, y: i % 2 ? 50 : -30 },
            {
              rotate: tilts[i % tilts.length],
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: c, containerAnimation: tween, start: "left right", end: "center center", scrub: true },
            },
          );
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="party-title" className="relative overflow-hidden bg-pink text-white">
      <div className="flex min-h-[100svh] flex-col justify-center py-20 lg:py-0">
        <div data-track className="flex items-center gap-8 pl-[var(--gutter)] max-lg:overflow-x-auto max-lg:pb-8 max-lg:pr-[var(--gutter)] max-lg:[scroll-padding-inline:var(--gutter)] max-lg:[scroll-snap-type:x_mandatory] lg:w-max lg:gap-12">
          <div className="w-[min(84vw,30rem)] shrink-0 max-lg:[scroll-snap-align:start]">
            <Reveal as="p" className="eyebrow text-sun" y={12}>
              <Star className="size-5" /> Birthday parties
            </Reveal>
            <SplitHeading id="party-title" by="chars" className="mt-4 font-display font-display-wide text-headline">
              Ready for the best birthday ever?
            </SplitHeading>
            <Reveal as="p" className="mt-6 text-lede text-white/90" delay={0.1}>
              Funland was made for it. With three spacious party rooms, we host celebrations of every size, and our party
              packages take care of every detail from start to finish, so all you have to do is show up and enjoy the day
              with your child.
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-3" stagger={0.08} effect="pop">
              <ButtonLink href="/party-packages-and-rates" variant="sun">
                See Party Packages
              </ButtonLink>
              <ButtonLink href="/private-parties" variant="cream">
                Private Parties
              </ButtonLink>
            </Reveal>
          </div>

          {partyDecor.map((p, i) => (
            <figure
              key={p.src}
              data-card
              className="relative w-[min(62vw,17rem)] shrink-0 rounded-[1.4rem] border-[3px] border-ink bg-cloud p-2 shadow-[var(--shadow-sticker-lg)] max-lg:[scroll-snap-align:center] lg:w-[19rem]"
              style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                sizes="(min-width: 1024px) 19rem, 62vw"
                className="aspect-[3/4] w-full rounded-[1rem] object-cover"
              />
              <figcaption className="px-1 pb-0.5 pt-2.5 font-display text-[0.95rem] font-semibold text-ink">{p.alt}</figcaption>
            </figure>
          ))}
          <div aria-hidden className="w-[6vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
