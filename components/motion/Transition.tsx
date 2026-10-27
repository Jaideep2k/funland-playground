"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type MouseEvent,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion, scrollToTop, transition } from "@/lib/motion";

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });

export function useTransitionNav() {
  return useContext(TransitionContext);
}

/**
 * Route changes play a three-colour curtain (sky, sun, pink, then cream with the logo):
 * the panels sweep up to cover the page, the route swaps underneath, then they lift away.
 * Back/forward navigation stays instant.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const safety = useRef<number | undefined>(undefined);

  const panels = () => (root.current ? Array.from(root.current.querySelectorAll<HTMLElement>("[data-panel]")) : []);

  const lift = useCallback(() => {
    const el = root.current;
    window.clearTimeout(safety.current);
    scrollToTop();
    ScrollTrigger.refresh();
    transition.pending = false;
    transition.emitReveal();
    if (!el) return;
    const ps = panels();
    gsap
      .timeline({
        delay: 0.05,
        onComplete: () => {
          gsap.set(el, { visibility: "hidden", pointerEvents: "none" });
          gsap.set(ps, { yPercent: 100 });
          busy.current = false;
        },
      })
      .to(el.querySelector("[data-curtain-logo]"), { scale: 0.8, autoAlpha: 0, duration: 0.3, ease: "power2.in" })
      .to([...ps].reverse(), { yPercent: -100, duration: 0.75, ease: "expo.inOut", stagger: 0.07 }, "<0.1");
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;

      if (url.pathname === window.location.pathname) {
        if (url.hash) {
          const node = document.querySelector(url.hash);
          if (node instanceof HTMLElement) {
            if (window.__lenis) window.__lenis.scrollTo(node, { offset: -110 });
            else node.scrollIntoView({ behavior: "smooth" });
          }
        } else if (window.__lenis) window.__lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (prefersReducedMotion() || !root.current) {
        router.push(target);
        return;
      }
      if (busy.current) return;
      busy.current = true;
      transition.pending = true;

      const el = root.current;
      const ps = panels();
      gsap.set(el, { visibility: "visible", pointerEvents: "auto" });
      gsap.set(ps, { yPercent: 100 });
      gsap.set(el.querySelector("[data-curtain-logo]"), { scale: 0.6, autoAlpha: 0 });
      gsap
        .timeline({
          onComplete: () => {
            router.push(target, { scroll: false });
            // If the route never commits (network hiccup), don't strand the curtain.
            safety.current = window.setTimeout(lift, 5000);
          },
        })
        .to(ps, { yPercent: 0, duration: 0.7, ease: "expo.inOut", stagger: 0.07 })
        .to(el.querySelector("[data-curtain-logo]"), { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.3");
    },
    [router, lift],
  );

  useEffect(() => {
    gsap.set(panels(), { yPercent: 100 });
  }, []);

  useEffect(() => {
    if (busy.current) lift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[80]" style={{ visibility: "hidden" }}>
        <div data-panel className="absolute inset-0 bg-sky" />
        <div data-panel className="absolute inset-0 bg-sun" />
        <div data-panel className="absolute inset-0 bg-pink" />
        <div data-panel className="absolute inset-0 flex items-center justify-center bg-cream">
          <div data-curtain-logo className="w-[min(46vw,260px)]">
            <Image src="/images/brand/funland-logo.webp" alt="" width={1582} height={975} priority sizes="260px" />
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

type LinkProps = ComponentProps<typeof Link>;

/** Drop-in for next/link that routes through the curtain transition. */
export function TransitionLink({ href, onClick, target, ...props }: LinkProps) {
  const { navigate } = useTransitionNav();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || target === "_blank") return;
    const url = new URL(href.toString(), window.location.href);
    if (url.origin !== window.location.origin) return;
    e.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  };
  return <Link href={href} target={target} onClick={handle} {...props} />;
}
