import Image from "next/image";
import { weekendSpecial } from "@/content/parties";
import { photos } from "@/content/photos";
import { business } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Sparkle, Star } from "@/components/ui/Shapes";

/** The popup's weekend private-party special, laid out on the page so it can always be found. */
export function WeekendSpecial() {
  const s = weekendSpecial;
  return (
    <Reveal effect="pop">
      <div className="sticker-lg relative grid overflow-hidden bg-cream lg:grid-cols-[1.1fr_1fr]">
        <div className="relative bg-pink p-8 text-white md:p-12">
          <div aria-hidden className="absolute -left-4 -top-4 w-16">
            <Star />
          </div>
          <p className="eyebrow text-white/90">Weekend special</p>
          <h2 className="mt-3 font-display text-title">{s.title}</h2>
          <p className="mt-6 flex items-end gap-2">
            <span className="mb-2 font-display text-sm font-semibold uppercase tracking-wider">Up to</span>
            <span className="font-display font-display-wide text-[clamp(4rem,9vw,6rem)] leading-[0.85] text-sun [text-shadow:3px_4px_0_var(--color-ink)]">
              {s.decorUpTo}
            </span>
          </p>
          <p className="mt-2 font-display text-xl font-semibold uppercase tracking-wide">{s.decorLabel}</p>
          <p className="mt-4 inline-block rounded-full border-[2.5px] border-ink bg-sun px-4 py-1.5 font-display font-semibold text-ink">
            {s.urgency}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.facts.map((f) => (
              <li key={f} className="rounded-full border-2 border-white/60 px-3 py-1 font-display text-sm font-semibold uppercase tracking-wide">
                {f}
              </li>
            ))}
          </ul>
          <p className="num mt-5 font-display text-[2.4rem] leading-none">{s.price}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="sun">
              {s.cta}
            </ButtonLink>
            <ButtonAnchor href={business.phoneHref} variant="cream">
              Call {business.phone}
            </ButtonAnchor>
          </div>
        </div>
        <div className="relative grid grid-cols-3 items-center gap-3 p-6 md:gap-4 md:p-10">
          <div aria-hidden className="absolute right-6 top-6 w-10">
            <Sparkle fill="var(--color-sky)" />
          </div>
          {[photos.weekend1, photos.weekend2, photos.weekend3].map((p, i) => (
            <div
              key={p.src}
              className={`overflow-hidden rounded-2xl border-[3px] border-ink bg-cloud p-1 shadow-[var(--shadow-sticker)] ${
                i === 0 ? "-rotate-3" : i === 2 ? "rotate-3" : "-translate-y-4"
              }`}
            >
              <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 1024px) 14vw, 30vw" className="aspect-[3/4] w-full rounded-xl object-cover" />
            </div>
          ))}
          <p className="col-span-3 text-center text-sm text-ink-soft">{s.footnote}</p>
        </div>
      </div>
    </Reveal>
  );
}
