"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos } from "@/content/photos";
import { business } from "@/content/site";
import { Reveal, SplitHeading, useAmbient, useImageReveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/Transition";
import { ArrowIcon } from "@/components/ui/Icons";
import { Sparkle, Squiggle, Star } from "@/components/ui/Shapes";

/* The old home page copy, kept word for word, split into three scannable cards. */
const cards = [
  {
    tag: "Play",
    tone: "bg-sky-soft",
    dot: "bg-sky",
    href: "/drop-in-play",
    cta: "Drop in Play",
    body: "Rain or shine, the fun never stops at Funland Indoor Playground. Built for kids ages 1 to 13, our play structure is packed with interactive play elements and hands-on activities that keep them climbing, exploring, and learning for hours. Even our littlest guests get in on the action with a dedicated toddler area that’s safe, cozy, and all their own. And with the whole facility kept sparkling clean and safe, parents can finally kick back while the kids play their hearts out.",
  },
  {
    tag: "Party",
    tone: "bg-pink-soft",
    dot: "bg-pink",
    href: "/party-packages-and-rates",
    cta: "Party Packages",
    body: "Ready for the best birthday ever? Funland was made for it. With three spacious party rooms, we host celebrations of every size, and our party packages take care of every detail from start to finish, so all you have to do is show up and enjoy the day with your child. Want the whole place to yourselves? The entire facility is available for private events your guests won’t forget.",
  },
  {
    tag: "Events",
    tone: "bg-sun-soft",
    dot: "bg-sun",
    href: "/contact",
    cta: "Contact us",
    body: "The fun doesn’t stop at parties, either. We host school events, field trips, summer camps, corporate gatherings, and more, all year round. Whatever the occasion, Funland turns it into a celebration. Come play with us. The fun is already waiting!",
  },
];

export function Welcome() {
  const ref = useRef<HTMLElement>(null);
  useAmbient(ref);
  useImageReveal(ref);

  return (
    <section ref={ref} aria-labelledby="welcome-title" className="relative py-[clamp(4rem,9vw,8rem)]">
      <div aria-hidden className="pointer-events-none absolute right-[5%] top-16 w-12 md:w-16" data-float>
        <Sparkle fill="var(--color-sun)" />
      </div>
      <div className="wrap">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="p" className="eyebrow justify-center text-pink" y={12}>
            <span aria-hidden className="inline-block size-2.5 rounded-full border-2 border-ink bg-sun" />
            Hello, families!
          </Reveal>
          <SplitHeading id="welcome-title" className="mt-3 font-display text-headline">
            Welcome to Funland Indoor <span className="text-sky-deep">Playground!</span>
          </SplitHeading>
          <div className="mx-auto mt-4 h-5 w-48">
            <Squiggle className="h-full w-full" />
          </div>
        </div>

        <Reveal className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.12} effect="pop">
          {cards.map((c) => (
            <article key={c.tag} data-tilt className={`sticker flex flex-col p-7 ${c.tone}`}>
              <p className="flex items-center gap-2 font-display text-2xl">
                <span aria-hidden className={`size-4 rounded-full border-[3px] border-ink ${c.dot}`} />
                {c.tag}
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">{c.body}</p>
              <TransitionLink href={c.href} className="group mt-auto inline-flex items-center gap-2 pt-6 font-display font-semibold">
                <span className="link-underline">{c.cta}</span>
                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </TransitionLink>
            </article>
          ))}
        </Reveal>

        <div className="relative mt-16">
          <div data-img-reveal className="sticker-lg relative aspect-[16/10] overflow-hidden bg-cloud md:aspect-[21/9]">
            <Image src={photos.hall1.src} alt={photos.hall1.alt} fill sizes="92vw" className="object-cover" />
          </div>
          <Reveal
            effect="pop"
            className="relative -mt-14 ml-4 max-w-md rounded-[1.5rem] border-[3px] border-ink bg-cloud p-6 shadow-[var(--shadow-sticker-lg)] md:absolute md:-bottom-10 md:left-10 md:mt-0 md:ml-0"
          >
            <div aria-hidden className="absolute -right-5 -top-6 w-12">
              <Star />
            </div>
            <p className="font-display text-xl">Easy to find, hard to leave.</p>
            <p className="mt-2 text-ink-soft">
              Situated on Highway 7, opposite{" "}
              <a href={business.markvilleUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-ink underline decoration-sun decoration-[3px] underline-offset-2">
                Markville Shopping Centre
              </a>
              , and just 5 minutes from the 407, Funland is easily accessible. For more details, give us a call at{" "}
              <a href={business.phoneHref} className="font-bold text-pink">
                {business.phone}
              </a>
              .
            </p>
            <p className="mt-3 font-display text-lg text-pink">Let the fun begin!</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
