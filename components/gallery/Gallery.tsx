"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/photos";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon, CloseIcon } from "@/components/ui/Icons";
import { gsap } from "@/lib/gsap";
import { lockScroll, prefersReducedMotion, unlockScroll } from "@/lib/motion";

const tilts = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0"];

/** Masonry of sticker photos; tap one to open a lightbox you can arrow or swipe through. */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number, el: HTMLElement) => {
    opener.current = el;
    setIndex(i);
  };

  const close = useCallback(() => {
    if (!box.current || prefersReducedMotion()) return setIndex(null);
    gsap.to(box.current, { autoAlpha: 0, duration: 0.25, onComplete: () => setIndex(null) });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length));
      if (img.current && !prefersReducedMotion()) {
        gsap.fromTo(img.current, { x: 60 * dir, rotate: 3 * dir, autoAlpha: 0 }, { x: 0, rotate: 0, autoAlpha: 1, duration: 0.5, ease: "back.out(1.6)" });
      }
    },
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    lockScroll();
    if (box.current && !prefersReducedMotion()) {
      gsap.fromTo(box.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(img.current, { scale: 0.7, rotate: -4 }, { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(1.6)" });
    }
    box.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const back = opener.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      back?.focus({ preventScroll: true });
    };
    // Open once per index change from null only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index === null]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <Reveal className="columns-2 gap-4 md:columns-3 md:gap-6 [&>*]:mb-4 md:[&>*]:mb-6" stagger={0.05} effect="pop">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={(e) => open(i, e.currentTarget)}
            className={`group block w-full break-inside-avoid overflow-hidden rounded-[1.3rem] border-[3px] border-ink bg-cloud p-1.5 text-left shadow-[var(--shadow-sticker)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[var(--shadow-sticker-lg)] ${tilts[i % tilts.length]}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              sizes="(min-width: 768px) 30vw, 46vw"
              className="w-full rounded-[0.95rem] transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="sr-only">Open larger photo</span>
          </button>
        ))}
      </Reveal>

      {current ? (
        <div
          ref={box}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button
            data-close
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink bg-sun px-4 py-2 font-display font-semibold shadow-[var(--shadow-sticker)]"
          >
            <CloseIcon width={18} height={18} /> Close
          </button>
          <div ref={img} className="relative max-h-[78svh] w-full max-w-5xl">
            <div className="mx-auto w-fit max-w-full overflow-hidden rounded-[1.4rem] border-[3px] border-ink bg-cloud p-2 shadow-[var(--shadow-sticker-lg)]">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.w}
                height={current.h}
                sizes="90vw"
                className="mx-auto max-h-[70svh] w-auto rounded-[1rem] object-contain"
              />
            </div>
          </div>
          <p className="mt-4 max-w-xl text-center font-semibold text-cream">
            {current.alt} <span className="num ml-2 text-cream/60">{(index ?? 0) + 1} / {photos.length}</span>
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid size-12 place-items-center rounded-full border-[2.5px] border-ink bg-cloud shadow-[var(--shadow-sticker)]">
              <ArrowIcon className="rotate-180" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid size-12 place-items-center rounded-full border-[2.5px] border-ink bg-pink text-white shadow-[var(--shadow-sticker)]">
              <ArrowIcon />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
