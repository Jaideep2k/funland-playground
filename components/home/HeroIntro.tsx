"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos, decor, type Photo } from "@/content/photos";
import { business } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { OpenToday } from "@/components/layout/OpenToday";
import { ButtonLink } from "@/components/ui/Button";
import { PenIcon, PhoneIcon } from "@/components/ui/Icons";
import { Sparkle, Squiggle } from "@/components/ui/Shapes";
import { HandTag } from "@/components/ui/HandTag";
import { afterCurtain } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/Transition";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { hasFinePointer, intro, prefersReducedMotion } from "@/lib/motion";

const INTRO_KEY = "funland-intro";

const MAIN = photos.hall2;
const FLIPS: Photo[] = [photos.ballPit, decor[15], photos.toddlerCastle, photos.interactive6, decor[3], photos.doubleSlide, decor[13], photos.interactive5];

/* Sticker photos on opposite corners of the hero frame, kept to two so the main photo leads.
   Positions are % of the stage; `d` is pointer depth. */
const STICKERS: { photo: Photo; cls: string; r: number; d: number }[] = [
  { photo: photos.ballPit, cls: "left-[-4%] top-[-9%] w-[33%]", r: -6, d: 0.9 },
  { photo: photos.toddlerCastle, cls: "right-[-6%] bottom-[-6%] w-[34%]", r: 4, d: 1 },
];

export function HeroIntro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = root.current;
      if (!el || !contextSafe) return;
      const html = document.documentElement;
      const header = document.getElementById("site-header");
      const actionBar = document.getElementById("action-bar");
      const q = gsap.utils.selector(el);

      const frame = q("[data-frame]")[0] as HTMLElement;
      const stage = q("[data-stage]")[0] as HTMLElement;
      const stickers = q("[data-sticker]") as HTMLElement[];
      const shapes = q("[data-shape]") as HTMLElement[];
      const lines = q("[data-line]") as HTMLElement[];
      const copy = q("[data-copy]") as HTMLElement[];
      const badges = q("[data-badge]") as HTMLElement[];
      const squiggle = q("[data-squiggle] path");
      const tagMarker = q("[data-tag-marker]");
      const tagArrow = q("[data-tag-arrow] path");
      const sun = q("[data-sunburst]");
      const introEls = q("[data-intro]");

      const reveal = () => gsap.set(introEls, { autoAlpha: 1 });
      const markSeen = () => {
        html.classList.add("intro-seen");
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {}
      };

      if (prefersReducedMotion()) {
        reveal();
        markSeen();
        intro.finish();
        return;
      }

      // Every sticker starts stacked behind the hero frame, then bursts out to its spot.
      const burstFrom = () => {
        const f = frame.getBoundingClientRect();
        const fx = f.left + f.width / 2;
        const fy = f.top + f.height / 2;
        return stickers.map((b) => {
          const r = b.getBoundingClientRect();
          return { x: fx - (r.left + r.width / 2), y: fy - (r.top + r.height / 2) };
        });
      };

      const landing = (tl: gsap.core.Timeline, at: string | number, speed = 1) => {
        const from = burstFrom();
        tl.addLabel("impact", at)
          .fromTo(
            stickers,
            { x: (i) => from[i].x, y: (i) => from[i].y, scale: 0.3, rotate: (i) => (i % 2 ? 12 : -12), autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              scale: 1,
              rotate: (i) => STICKERS[i]?.r ?? 0,
              autoAlpha: 1,
              duration: 1.3 * speed,
              ease: "back.out(1.15)",
              stagger: { each: 0.05, from: "center" },
            },
            "impact",
          )
          .fromTo(sun, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.6, ease: "expo.out" }, "impact")
          .fromTo(
            shapes,
            { scale: 0, rotate: -45, autoAlpha: 0 },
            { scale: 1, rotate: 0, autoAlpha: 1, duration: 1, ease: "back.out(1.5)", stagger: 0.05 },
            "impact+=0.15",
          )
          .fromTo(lines, { yPercent: 115, rotate: 3, autoAlpha: 1 }, { yPercent: 0, rotate: 0, duration: 1.1 * speed, ease: "expo.out", stagger: 0.1 }, "impact+=0.02")
          .fromTo(copy, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, "impact+=0.35")
          .fromTo(badges, { scale: 0.4, rotate: -25, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.9, ease: "back.out(1.5)", stagger: 0.12 }, "impact+=0.6")
          .fromTo(tagMarker, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.inOut" }, "impact+=0.45")
          .fromTo(tagArrow, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.6, ease: "power2.out", stagger: 0.35 }, "impact+=0.9")
          .fromTo(squiggle, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" }, "impact+=0.75");
        // The header slides its contents in, not itself: its own transform belongs to the CSS scroll behaviour.
        if (header) {
          tl.set(header, { autoAlpha: 1 }, "impact+=0.4").fromTo(
            header.children,
            { autoAlpha: 0, y: -20 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.06, clearProps: "transform" },
            "impact+=0.4",
          );
        }
        if (actionBar) {
          tl.fromTo(actionBar, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", clearProps: "transform" }, "impact+=0.7");
        }
      };

      // Ambient motion once settled: sunburst spin, floaty shapes, pointer drift, scroll depth.
      const setupAmbient = contextSafe(() => {
        gsap.to(sun, { rotate: 360, duration: 120, ease: "none", repeat: -1 });
        shapes.forEach((s, i) => {
          gsap.to(s, {
            y: `+=${gsap.utils.random(10, 20)}`,
            rotate: `+=${gsap.utils.random(-14, 14)}`,
            duration: gsap.utils.random(2.2, 3.4),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.15,
          });
        });
        gsap.to(q("[data-badge-spin]"), { rotate: 360, duration: 18, ease: "none", repeat: -1 });
        gsap.to(q("[data-frame-scroll]"), {
          y: 80,
          rotate: 2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        gsap.to(q("[data-copy-scroll]"), {
          y: 60,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        // On phones the stage sits right under the copy, so stickers stay put instead of drifting into the text.
        const wide = window.matchMedia("(min-width: 1024px)").matches;
        (wide ? (q("[data-sticker-wrap]") as HTMLElement[]) : []).forEach((w) => {
          gsap.to(w, {
            y: -60 - 50 * Number(w.dataset.depth || 0.5),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
          });
        });
        ScrollTrigger.refresh();

        if (!hasFinePointer()) return;
        const movers = (q("[data-mouse]") as HTMLElement[]).map((node) => {
          const d = Number(node.dataset.mouse || 0.5);
          return {
            d,
            x: gsap.quickTo(node, "x", { duration: 1.1, ease: "power3.out" }),
            y: gsap.quickTo(node, "y", { duration: 1.1, ease: "power3.out" }),
          };
        });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * 44 * m.d);
            m.y(ny * 30 * m.d);
          });
        };
        el.addEventListener("pointermove", onMove);
      });

      const done = () => {
        stage.style.zIndex = "";
        markSeen();
        intro.finish();
        setupAmbient();
      };

      const loaderEl = q("[data-loader]")[0] as HTMLElement | undefined;
      const runLoader = !!loaderEl && getComputedStyle(loaderEl).display !== "none";

      if (!runLoader) {
        // Repeat visit or arriving through the curtain: just land the hero.
        gsap.set(introEls, { autoAlpha: 1 });
        gsap.set([...stickers, ...lines, ...copy, ...shapes, ...badges], { autoAlpha: 0 });
        const cancel = afterCurtain(() => {
          const tl = gsap.timeline({ onComplete: done });
          tl.fromTo(frame, { scale: 0.85, rotate: -6, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 1, ease: "back.out(1.4)" });
          landing(tl, 0.1, 0.9);
        }, 0.1);
        return () => cancel();
      }

      // Full loader: first visit this session.
      html.dataset.intro = "running";
      window.__lenis?.stop();
      gsap.set(introEls, { autoAlpha: 1 });
      gsap.set([...stickers, ...lines, ...copy, ...shapes, ...badges, frame], { autoAlpha: 0 });
      if (header) gsap.set(header, { autoAlpha: 0 });
      if (actionBar) gsap.set(actionBar, { autoAlpha: 0 });

      const win = q("[data-loader-window]")[0] as HTMLElement;
      const flipImgs = q("[data-flip]") as HTMLElement[];
      const counter = q("[data-count]")[0] as HTMLElement;
      const bar = q("[data-bar]")[0] as HTMLElement;
      const loaderLogo = q("[data-loader-logo]");
      const balls = q("[data-ball]");
      const loaderMeta = q("[data-loader-meta]");
      const tracked = Array.from(el.querySelectorAll<HTMLImageElement>("img[data-track]"));

      gsap
        .timeline()
        .from(loaderLogo, { scale: 0.6, y: 20, autoAlpha: 0, duration: 0.9, ease: "back.out(1.4)" })
        .from(win, { scale: 0.7, y: 30, autoAlpha: 0, duration: 0.8, ease: "back.out(1.3)" }, "-=0.5")
        .from(loaderMeta, { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.08 }, "-=0.4");

      // Ball-pit balls bounce in turn while we wait.
      const bounce = gsap.to(balls, {
        y: -22,
        duration: 0.32,
        ease: "power2.out",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.1, repeat: -1, yoyo: true },
      });

      // Flip through Funland inside the little window.
      let idx = 0;
      const cycle = gsap.to({}, {
        duration: 0.2,
        repeat: -1,
        onRepeat: () => {
          flipImgs.forEach((img, i) => (img.style.opacity = i === idx ? "1" : "0"));
          idx = (idx + 1) % flipImgs.length;
        },
      });

      const start = performance.now();
      const MIN = 2200;
      const MAX = 5000;
      let shown = 0;
      let finished = false;

      const finish = contextSafe(() => {
        cycle.kill();
        bounce.kill();
        flipImgs.forEach((img) => (img.style.opacity = "0"));

        // FLIP: put the real frame exactly over the loader window, then let it fly home.
        // The whole stage (frame, badge, stickers) rises above the loader together, so the badge and
        // stickers keep their place in front of the frame for the entire flight and nothing re-stacks
        // when the intro hands over.
        const w = win.getBoundingClientRect();
        const f = frame.getBoundingClientRect();
        stage.style.zIndex = "75";
        gsap.set(frame, {
          x: w.left + w.width / 2 - (f.left + f.width / 2),
          y: w.top + w.height / 2 - (f.top + f.height / 2),
          scale: w.width / f.width,
          rotate: 0,
          autoAlpha: 1,
        });
        gsap.set(win, { autoAlpha: 0 });

        const tl = gsap.timeline({
          onComplete: () => {
            loaderEl!.remove();
            delete html.dataset.intro;
            window.__lenis?.start();
            done();
          },
        });
        tl.to(loaderLogo, { y: -60, scale: 0.8, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 0)
          .to(loaderMeta, { autoAlpha: 0, y: 20, duration: 0.35 }, 0)
          .to(balls, { y: 60, autoAlpha: 0, duration: 0.4, stagger: 0.04, ease: "power2.in" }, 0)
          .to(loaderEl!, { clipPath: "circle(0% at 50% 50%)", duration: 1, ease: "expo.inOut" }, 0.15)
          .to(frame, { x: 0, y: 0, scale: 1, rotate: 0, duration: 1.15, ease: "expo.inOut" }, 0.15);
        landing(tl, 0.95);
      });

      const tick = () => {
        const elapsed = performance.now() - start;
        const loaded = tracked.length ? tracked.filter((img) => img.complete).length / tracked.length : 1;
        const fontsReady = document.fonts?.status !== "loading";
        const target = elapsed > MAX ? 1 : Math.min(elapsed / MIN, loaded, fontsReady ? 1 : 0.9);
        shown += (target * 100 - shown) * 0.09;
        if (target === 1 && shown > 99.4) shown = 100;
        counter.textContent = String(Math.round(shown)).padStart(2, "0");
        gsap.set(bar, { scaleX: shown / 100 });
        if (shown === 100 && !finished) {
          finished = true;
          gsap.ticker.remove(tick);
          finish();
        }
      };
      gsap.ticker.add(tick);

      // Never strand the page behind the loader.
      const safety = window.setTimeout(() => {
        if (!finished) {
          finished = true;
          gsap.ticker.remove(tick);
          finish();
        }
      }, 9000);

      return () => {
        gsap.ticker.remove(tick);
        window.clearTimeout(safety);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-28 md:pb-28 md:pt-40 xl:pt-44">
      {/* ── Loader ── */}
      <div
        data-loader
        aria-hidden
        className="intro-loader dots fixed inset-0 z-[70] flex-col items-center justify-center bg-cream px-6"
        style={{ clipPath: "circle(150% at 50% 50%)" }}
      >
        <div data-loader-logo className="w-[min(64vw,320px)]">
          <Logo priority sizes="320px" />
        </div>
        <div
          data-loader-window
          className="relative mt-7 aspect-[5/4] w-[min(52vw,230px)] overflow-hidden rounded-[1.4rem] border-[3px] border-ink bg-cloud shadow-[var(--shadow-sticker)]"
        >
          {FLIPS.map((p, i) => (
            <Image
              key={p.src}
              data-flip
              data-track
              src={p.src}
              alt=""
              fill
              priority
              sizes="230px"
              className="object-cover"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>
        <div className="mt-8 flex items-end gap-2.5" aria-hidden>
          {["bg-pink", "bg-sun", "bg-sky", "bg-pink", "bg-sun"].map((c, i) => (
            <span key={i} data-ball className={`block size-4 rounded-full border-[2.5px] border-ink ${c}`} />
          ))}
        </div>
        <div data-loader-meta className="mt-6 flex items-baseline gap-1 font-display text-ink">
          <span data-count className="num font-display-heavy text-[clamp(3rem,10vw,4.5rem)] leading-none">
            00
          </span>
          <span className="text-2xl">%</span>
        </div>
        <div data-loader-meta className="mt-3 h-3 w-[min(60vw,260px)] overflow-hidden rounded-full border-[2.5px] border-ink bg-cloud">
          <div data-bar className="h-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-pink),var(--color-sun),var(--color-sky))]" />
        </div>
        <p data-loader-meta className="mt-4 font-display text-lg font-semibold text-ink-soft">
          Getting the fun ready…
        </p>
      </div>

      {/* ── Backdrop ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-intro className="absolute left-[62%] top-[48%] -translate-x-1/2 -translate-y-1/2">
          <div data-sunburst className="sunburst aspect-square w-[150vmax] rounded-full" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream" />
      </div>

      {/* One floating shape: enough sparkle without competing with the photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5]">
        <div data-mouse="0.8" className="absolute left-[44%] top-[16%] hidden w-9 lg:block">
          <div data-intro data-shape>
            <Sparkle />
          </div>
        </div>
      </div>

      <div className="wrap grid items-center gap-x-10 gap-y-20 lg:grid-cols-[1.02fr_1fr]">
        {/* Copy */}
        <div data-copy-scroll className="relative z-10">
          <HandTag data-intro data-copy>
            <span className="sm:hidden">Indoor playground in Markham</span>
            <span className="hidden sm:inline">Indoor playground in Markham, Ontario</span>
          </HandTag>
          <h1 id="hero-title" className="mt-4 font-display text-hero text-ink">
            <span className="mask-line">
              <span data-intro data-line className="inline-block">
                The best place
              </span>
            </span>
            <span className="mask-line">
              <span data-intro data-line className="inline-block">
                to have{" "}
                <span className="relative inline-block text-pink">
                  fun!
                  <span data-squiggle className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full">
                    <Squiggle stroke="var(--color-sun)" className="h-full w-full" />
                  </span>
                </span>
              </span>
            </span>
          </h1>
          <p data-intro data-copy className="mt-7 max-w-[36rem] text-lede text-ink-soft">
            Rain or shine, the fun never stops at Funland. A giant play structure for kids ages {business.ages}, a cozy
            toddler area and three party rooms, right on Highway 7 in Markham.
          </p>
          <div data-intro data-copy className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/party-packages-and-rates" variant="pink">
              Book a Party
            </ButtonLink>
            <ButtonLink href="/drop-in-play" variant="sun">
              Drop in Play
            </ButtonLink>
          </div>
          <div data-intro data-copy className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-semibold text-ink-soft">
            <a href={business.phoneHref} className="inline-flex items-center gap-2 hover:text-pink">
              <PhoneIcon width={18} height={18} />
              {business.phone}
            </a>
            <OpenToday />
            <TransitionLink href="/waiver" className="inline-flex items-center gap-2 hover:text-pink">
              <PenIcon width={18} height={18} />
              <span className="link-underline">Sign the waiver</span>
            </TransitionLink>
          </div>
        </div>

        {/* Stage */}
        <div data-stage className="relative mx-auto w-full max-w-[38rem] px-[6%] lg:max-w-none">
          <div data-frame-scroll className="relative">
            <div data-frame data-intro className="sticker-lg relative aspect-[5/4] overflow-hidden bg-cloud">
              <Image
                data-track
                src={MAIN.src}
                alt={MAIN.alt}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 88vw"
                className="object-cover"
              />
            </div>
            {/* Spinning age badge */}
            <div data-intro data-badge className="absolute left-[50%] -top-[clamp(3.2rem,6vw,4.6rem)] z-20 size-[clamp(5.5rem,10vw,7.5rem)]">
              <div className="relative grid size-full place-items-center rounded-full border-[3px] border-ink bg-sun shadow-[var(--shadow-sticker)]">
                <svg data-badge-spin viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
                  <defs>
                    <path id="badge-circle" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" />
                  </defs>
                  <text className="fill-ink font-display text-[8.6px] font-semibold uppercase tracking-[0.1em]">
                    <textPath href="#badge-circle">3 party rooms · Toddler area · </textPath>
                  </text>
                </svg>
                <span className="text-center font-display leading-none">
                  <span className="block text-[0.7rem] font-semibold uppercase">Ages</span>
                  <span className="block text-[clamp(1.2rem,2.4vw,1.7rem)]">1–13</span>
                </span>
              </div>
            </div>
          </div>

          {STICKERS.map((s) => (
            <div key={s.photo.src} data-sticker-wrap data-depth={s.d} className={`absolute z-10 ${s.cls}`}>
              <div data-mouse={s.d}>
                <div
                  data-intro
                  data-sticker
                  className="overflow-hidden rounded-[1.1rem] border-[3px] border-ink bg-cloud p-1 shadow-[var(--shadow-sticker)]"
                >
                  <Image
                    data-track
                    src={s.photo.src}
                    alt={s.photo.alt}
                    width={s.photo.w}
                    height={s.photo.h}
                    sizes="(min-width: 1024px) 18vw, 34vw"
                    className={`w-full rounded-[0.8rem] object-cover ${s.photo.w > s.photo.h ? "aspect-[4/3]" : "aspect-[3/4]"}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
