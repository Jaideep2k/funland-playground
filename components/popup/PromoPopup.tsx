"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { weekendSpecial } from "@/content/parties";
import { photos } from "@/content/photos";
import { TransitionLink } from "@/components/motion/Transition";
import { afterCurtain } from "@/components/motion/Reveal";
import { buttonClass } from "@/components/ui/Button";
import { ArrowIcon, CloseIcon } from "@/components/ui/Icons";
import { Sparkle, Star } from "@/components/ui/Shapes";
import { gsap } from "@/lib/gsap";
import { lockScroll, prefersReducedMotion, unlockScroll } from "@/lib/motion";

/* Same behaviour as the old Popup Maker popup: opens 5 seconds after landing on the home page,
   and once closed it stays away for a week. Anything can reopen it with `openPromo()`. */
const STORAGE_KEY = `funland-popup-${weekendSpecial.id}`;
const DELAY_MS = 5000;
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const OPEN_EVENT = "funland:open-promo";

export function openPromo() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function snoozed() {
  try {
    const t = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(t) && t > 0 && Date.now() - t < SNOOZE_MS;
  } catch {
    return false;
  }
}

const confettiColors = ["#e11b6e", "#ffc21f", "#22a6f2", "#ff4d93", "#1f1e5a"];

export function PromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closing = useRef(false);

  // Auto-open on the home page.
  useEffect(() => {
    if (pathname !== "/" || snoozed()) return;
    let timer: number | undefined;
    const cancel = afterCurtain(() => {
      timer = window.setTimeout(() => {
        if (!snoozed()) setOpen(true);
      }, DELAY_MS);
    }, 0);
    return () => {
      cancel();
      window.clearTimeout(timer);
    };
  }, [pathname]);

  // Manual open from anywhere.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
    const done = () => {
      closing.current = false;
      setOpen(false);
    };
    if (prefersReducedMotion() || !card.current) return done();
    gsap
      .timeline({ onComplete: done })
      .to(card.current, { scale: 0.85, y: 40, rotate: 3, autoAlpha: 0, duration: 0.35, ease: "power2.in" })
      .to(overlay.current, { autoAlpha: 0, duration: 0.3 }, "-=0.15");
  }, []);

  // Open animation, scroll lock, focus handling.
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    lockScroll();
    closeBtn.current?.focus({ preventScroll: true });

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap
        .timeline()
        .fromTo(overlay.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 })
        .fromTo(
          card.current,
          { scale: 0.85, y: 60, rotate: -3, autoAlpha: 0 },
          { scale: 1, y: 0, rotate: 0, autoAlpha: 1, duration: 0.9, ease: "back.out(1.3)" },
          "-=0.15",
        )
        .from("[data-promo-pop]", { scale: 0.5, rotate: -10, autoAlpha: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.06 }, "-=0.55")
        .from("[data-promo-photo]", { y: 40, autoAlpha: 0, duration: 0.8, ease: "back.out(1.3)", stagger: 0.08 }, "-=0.5")
        .add(() => confetti(), 0.45);
    }, overlay.current ?? undefined);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && card.current) {
        const f = card.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
        if (!f.length) return;
        const firstEl = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      ctx.revert();
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open, close]);

  const confetti = () => {
    const host = burst.current;
    if (!host) return;
    for (let i = 0; i < 34; i++) {
      const piece = document.createElement("span");
      const size = gsap.utils.random(8, 16);
      const round = Math.random() > 0.5;
      piece.style.cssText = `position:absolute;left:50%;top:40%;width:${size}px;height:${round ? size : size * 0.45}px;background:${
        confettiColors[i % confettiColors.length]
      };border-radius:${round ? "50%" : "3px"};pointer-events:none;`;
      host.appendChild(piece);
      const angle = gsap.utils.random(0, Math.PI * 2);
      const dist = gsap.utils.random(180, 420);
      gsap
        .timeline({ onComplete: () => piece.remove() })
        .to(piece, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist * 0.7 - 80,
          rotate: gsap.utils.random(-360, 360),
          duration: gsap.utils.random(0.7, 1.1),
          ease: "power3.out",
        })
        .to(piece, { y: "+=260", autoAlpha: 0, duration: 1.1, ease: "power1.in" }, "-=0.2");
    }
  };

  if (!open) return null;

  const s = weekendSpecial;
  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/55 p-3 backdrop-blur-[3px] sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div ref={burst} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />
      <div
        ref={card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        data-lenis-prevent
        className="sticker-lg relative max-h-[92svh] w-full max-w-[34rem] overflow-y-auto bg-cream"
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink bg-cloud px-3 py-1.5 font-display text-sm font-semibold uppercase tracking-wide shadow-[2px_3px_0_0_var(--color-ink)] transition-transform hover:-rotate-3 active:translate-y-0.5"
        >
          <CloseIcon width={16} height={16} />
          Close
        </button>

        <div className="relative overflow-hidden rounded-t-[1.8rem] bg-pink px-6 pb-8 pt-12 text-center text-white sm:px-10">
          <Star data-promo-pop className="absolute -left-3 top-4 w-14" />
          <Sparkle data-promo-pop fill="var(--color-sky)" className="absolute bottom-3 right-6 w-9" />
          <h2 id="promo-title" className="font-display text-[clamp(1.8rem,6vw,2.5rem)] leading-[1.02]">
            {s.title}
          </h2>
        </div>

        <div className="px-5 pb-6 pt-6 text-center sm:px-8">
          <p className="flex items-end justify-center gap-2">
            <span className="mb-3 font-display text-sm font-semibold uppercase tracking-wider">Up to</span>
            <span data-promo-pop className="font-display font-display-wide text-[clamp(4rem,16vw,5.6rem)] leading-[0.85] text-pink">
              {s.decorUpTo}
            </span>
          </p>
          <p className="mt-2 font-display text-xl font-semibold uppercase tracking-wide">{s.decorLabel}</p>
          <p data-promo-pop className="mt-3 inline-block rounded-full border-[2.5px] border-ink bg-sun px-4 py-1.5 font-display font-semibold">
            {s.urgency}
          </p>

          <div className="mt-5 border-t-[2.5px] border-dashed border-ink/25 pt-4">
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-[0.95rem] font-semibold uppercase tracking-wide">
              {s.facts.map((f, i) => (
                <li key={f} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden className="size-2 rounded-full bg-sky" /> : null}
                  {f}
                </li>
              ))}
            </ul>
            <p className="num mt-2 font-display text-[2.2rem] font-semibold leading-tight text-ink">{s.price}</p>
          </div>

          <TransitionLink href="/contact" onClick={() => close()} className={buttonClass("pink", "mt-4 w-full text-lg")}>
            <span>{s.cta}</span>
            <ArrowIcon className="transition-transform group-hover:translate-x-1" />
          </TransitionLink>

          <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {[photos.weekend1, photos.weekend2, photos.weekend3].map((p, i) => (
              <div
                key={p.src}
                data-promo-photo
                className={`overflow-hidden rounded-2xl border-[2.5px] border-ink bg-cloud shadow-[3px_4px_0_0_var(--color-ink)] ${
                  i === 0 ? "-rotate-3" : i === 2 ? "rotate-3" : "-translate-y-1"
                }`}
              >
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="160px" className="aspect-[3/4] w-full object-cover" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">{s.footnote}</p>
        </div>
      </div>
    </div>
  );
}
