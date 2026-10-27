import type Lenis from "lenis";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/* The Lenis instance lives on window so overlays (menu, popup, lightbox) can pause it. */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

let locks = 0;

export function lockScroll() {
  locks += 1;
  window.__lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.style.overflow = "";
  window.__lenis?.start();
}

export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

/**
 * Page-transition and intro signals.
 * The curtain covers → route changes → curtain lifts ("reveal").
 * The home intro loader announces when the hero has landed ("intro").
 */
type Listener = () => void;
const revealListeners = new Set<Listener>();
const introListeners = new Set<Listener>();

export const transition = {
  pending: false,
  onReveal(fn: Listener) {
    revealListeners.add(fn);
    return () => revealListeners.delete(fn);
  },
  emitReveal() {
    revealListeners.forEach((fn) => fn());
  },
};

/* True on the first hard load of the home page, when the server-rendered loader is in the DOM. */
function introPending() {
  if (typeof document === "undefined") return false;
  const html = document.documentElement;
  return html.classList.contains("js") && !html.classList.contains("intro-seen") && !!document.querySelector(".intro-loader");
}

export const intro = {
  running: introPending(),
  onDone(fn: Listener) {
    if (!intro.running) {
      fn();
      return () => {};
    }
    introListeners.add(fn);
    return () => introListeners.delete(fn);
  },
  finish() {
    intro.running = false;
    introListeners.forEach((fn) => fn());
    introListeners.clear();
  },
};
