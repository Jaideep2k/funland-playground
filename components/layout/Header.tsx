"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business, nav } from "@/content/site";
import { TransitionLink } from "@/components/motion/Transition";
import { Logo } from "@/components/layout/Logo";
import { OpenToday } from "@/components/layout/OpenToday";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { ArrowIcon, ChevronIcon, FacebookIcon, InstagramIcon, PenIcon, PhoneIcon } from "@/components/ui/Icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, prefersReducedMotion, unlockScroll } from "@/lib/motion";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const dotColors = ["bg-pink", "bg-sun", "bg-sky", "bg-pink", "bg-sun", "bg-sky", "bg-pink", "bg-sun"];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const first = useRef(true);

  // The pink info bar slides away and the nav settles into a floating pill once the page leaves the top.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
    setGalleryOpen(false);
  }, [pathname]);

  useGSAP(
    () => {
      const el = menu.current;
      if (!el) return;
      const reduced = prefersReducedMotion();
      gsap.set(el, { autoAlpha: 0 });
      menuTl.current = gsap
        .timeline({ paused: true })
        .set(el, { autoAlpha: 1 })
        .fromTo(
          el,
          { clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" },
          { clipPath: "circle(150% at calc(100% - 2.75rem) 2.75rem)", duration: reduced ? 0.01 : 0.8, ease: "expo.inOut" },
        )
        .from(
          el.querySelectorAll("[data-menu-item]"),
          { yPercent: 120, rotate: 4, duration: reduced ? 0.01 : 0.8, ease: "back.out(1.6)", stagger: 0.045 },
          reduced ? 0 : "-=0.4",
        )
        .from(el.querySelectorAll("[data-menu-meta]"), { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.06 }, "-=0.55");
    },
    { scope: menu },
  );

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    if (first.current) {
      first.current = false;
      return;
    }
    if (open) {
      lockScroll();
      tl.timeScale(1).play();
    } else {
      tl.timeScale(1.7).reverse();
      unlockScroll();
    }
  }, [open]);

  useEffect(() => {
    if (!open && !galleryOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
      setGalleryOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, galleryOpen]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-10" />
      <header
        id="site-header"
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out)] ${
          scrolled ? "md:-translate-y-10" : ""
        }`}
      >
        {/* Info bar: the old site's pink "Tel:" strip, kept so returning parents still find the number first. */}
        <div className="hidden h-10 bg-pink text-[0.9rem] font-semibold text-white md:block">
          <div className="wrap flex h-full items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <a href={business.phoneHref} className="inline-flex items-center gap-2 hover:underline">
                <PhoneIcon width={16} height={16} />
                Tel: {business.phone}
              </a>
              <OpenToday className="hidden lg:inline-flex" />
            </div>
            <div className="flex items-center gap-2">
              <TransitionLink
                href="/waiver"
                className="mr-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 transition-colors hover:bg-white/25"
              >
                <PenIcon width={15} height={15} />
                Sign the waiver online
              </TransitionLink>
              <a
                href={business.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Funland on Facebook"
                className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white/20"
              >
                <FacebookIcon width={17} height={17} />
              </a>
              <a
                href={business.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Funland on Instagram"
                className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white/20"
              >
                <InstagramIcon width={17} height={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[92rem] px-[max(0.5rem,calc(var(--gutter)-1rem))] pt-2">
          <div className="relative flex h-[4.5rem] items-center justify-between gap-4 px-[min(1rem,calc(var(--gutter)-0.5rem))]">
            <div
              aria-hidden
              className={`absolute inset-0 rounded-full border-[3px] border-ink bg-cloud/90 shadow-[var(--shadow-sticker)] backdrop-blur-xl transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${
                scrolled ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
              }`}
            />
            <TransitionLink
              href="/"
              aria-label="Funland Indoor Playground home"
              className={`relative z-10 -my-2 block shrink-0 transition-[width] duration-500 ease-[var(--ease-out)] ${
                scrolled ? "w-[104px]" : "w-[118px] md:w-[150px] xl:w-[128px] 2xl:w-[150px]"
              }`}
            >
              <Logo priority sizes="160px" className="w-full drop-shadow-[0_6px_10px_rgba(31,30,90,0.12)]" />
            </TransitionLink>

            <nav aria-label="Primary" className="relative z-10 hidden items-center xl:flex">
              {nav.map((item, i) => {
                const active = isActive(pathname, item.href);
                if (item.children) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setGalleryOpen(true)}
                      onMouseLeave={() => setGalleryOpen(false)}
                    >
                      <div className="flex items-center">
                        <TransitionLink
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className="group relative whitespace-nowrap py-2 pl-2 pr-1 font-display text-[0.92rem] font-semibold 2xl:pl-3 2xl:text-[1rem]"
                        >
                          {item.label}
                          <Underline active={active} color={dotColors[i]} />
                        </TransitionLink>
                        <button
                          type="button"
                          aria-expanded={galleryOpen}
                          aria-controls="gallery-submenu"
                          aria-label="Show photo gallery albums"
                          onClick={() => setGalleryOpen((v) => !v)}
                          className="grid size-7 place-items-center rounded-full hover:bg-sun-soft"
                        >
                          <ChevronIcon width={16} height={16} className={`transition-transform ${galleryOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      <div
                        id="gallery-submenu"
                        className={`absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300 ease-[var(--ease-out)] ${
                          galleryOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                        }`}
                      >
                        <ul className="sticker bg-cloud p-2">
                          {item.children.map((c, ci) => (
                            <li key={c.href}>
                              <TransitionLink
                                href={c.href}
                                aria-current={pathname === c.href ? "page" : undefined}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-display font-semibold transition-colors hover:bg-sun-soft aria-[current=page]:bg-pink-soft"
                              >
                                <span aria-hidden className={`size-3 rounded-full border-2 border-ink ${dotColors[ci + 1]}`} />
                                {c.label}
                              </TransitionLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }
                return (
                  <TransitionLink
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative whitespace-nowrap px-2 py-2 font-display text-[0.92rem] font-semibold 2xl:px-3 2xl:text-[1rem]"
                  >
                    {item.label}
                    <Underline active={active} color={dotColors[i]} />
                  </TransitionLink>
                );
              })}
            </nav>

            <div className="relative z-10 flex items-center gap-2">
              <span className="hidden sm:block">
                <ButtonLink href="/party-packages-and-rates" variant="pink" className="min-h-11 whitespace-nowrap px-4 2xl:px-5">
                  Book a Party
                </ButtonLink>
              </span>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className={buttonClass(open ? "ink" : "sun", "min-h-11 gap-3 px-4 xl:hidden")}
              >
                <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
                <span aria-hidden className="relative block h-3.5 w-6">
                  <span
                    className={`absolute left-0 top-0 h-[3px] w-6 rounded-full bg-current transition-transform duration-300 ${
                      open ? "translate-y-[5.5px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[3px] w-6 rounded-full bg-current transition-transform duration-300 ${
                      open ? "-translate-y-[5.5px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        data-lenis-prevent
        className="dots fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream px-[var(--gutter)] pb-28 pt-28 xl:hidden"
        style={{ visibility: "hidden" }}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item, i) => (
            <div key={item.href} className="border-b-2 border-dashed border-line">
              <span className="mask-line">
                <TransitionLink
                  data-menu-item
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="group flex items-center justify-between gap-4 py-3 font-display text-[clamp(1.9rem,8vw,2.8rem)] leading-[1.05] aria-[current=page]:text-pink"
                >
                  <span className="flex items-center gap-4">
                    <span aria-hidden className={`size-4 shrink-0 rounded-full border-[3px] border-ink ${dotColors[i]}`} />
                    {item.label}
                  </span>
                  <ArrowIcon className="shrink-0 transition-transform group-hover:translate-x-1" />
                </TransitionLink>
              </span>
              {item.children ? (
                <div data-menu-meta className="flex flex-wrap gap-2 pb-4 pl-8">
                  {item.children.map((c) => (
                    <TransitionLink
                      key={c.href}
                      href={c.href}
                      className="rounded-full border-2 border-ink bg-cloud px-3.5 py-1.5 font-display text-[0.95rem] font-semibold"
                    >
                      {c.label}
                    </TransitionLink>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
        <div data-menu-meta className="mt-8 grid gap-3 sm:grid-cols-2">
          <ButtonLink href="/party-packages-and-rates" variant="pink" className="w-full">
            Book a Party
          </ButtonLink>
          <ButtonLink href="/waiver" variant="sun" className="w-full" icon={<PenIcon />}>
            Sign the Waiver
          </ButtonLink>
        </div>
        <div data-menu-meta className="mt-8 space-y-1.5 text-[1.05rem]">
          <a href={business.phoneHref} className="block font-display text-2xl font-semibold">
            {business.phone}
          </a>
          <a href={`mailto:${business.email}`} className="block underline decoration-2 underline-offset-4">
            {business.email}
          </a>
          <OpenToday className="pt-1 text-ink-soft" />
        </div>
      </div>
    </>
  );
}

function Underline({ active, color }: { active: boolean; color: string }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-x-2 -bottom-0.5 h-[5px] origin-left rounded-full border-[1.5px] border-ink transition-transform duration-500 ease-[var(--ease-bounce)] ${color} ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}
