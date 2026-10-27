import type { Metadata } from "next";
import Image from "next/image";
import {
  everyPackageIncludes,
  extraGuests,
  lastMinuteOffer,
  limitedOffer,
  packages,
  partyRules,
  slotNotes,
  timeSlots,
  weekdaySpecial,
  type Tone,
} from "@/content/parties";
import { decor, partyDecor, photos } from "@/content/photos";
import { business } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { RuleList } from "@/components/sections/RuleList";
import { PhotoMarquee } from "@/components/sections/PhotoMarquee";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/Transition";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { ArrowIcon, CheckIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Sparkle, Star } from "@/components/ui/Shapes";

export const metadata: Metadata = {
  title: "Party Packages and Rates",
  description:
    "Birthday party packages at Funland Indoor Playground in Markham: Basic, Deluxe, Supreme and Extreme, with pizza, juice, 2.5 hours in a party room including play time, set up and clean up.",
  alternates: { canonical: "/party-packages-and-rates" },
};

const head: Record<Tone, string> = {
  sky: "bg-sky text-ink",
  sun: "bg-sun text-ink",
  pink: "bg-pink text-white",
  ink: "bg-ink text-cream",
};

const money = (n: number) => `$${n.toFixed(2)}`;

export default function PartyPackagesPage() {
  return (
    <>
      <PageHero
        tone="pink"
        eyebrow="Birthday parties"
        title="Party Packages and Rates"
        lede={
          <p>
            Dive into our amazing party packages, each crafted to make your celebration shine! No matter the size of your
            bash, we’ve got you covered with packages bursting with fun and excitement. Let us take the stress out of
            planning so you can focus on creating unforgettable memories!
          </p>
        }
        photos={[decor[1], decor[15], decor[13]]}
        actions={
          <>
            <ButtonLink href="/contact">Book Your Party Now!</ButtonLink>
            <ButtonAnchor href={business.phoneHref} variant="cream" icon={<PhoneIcon />}>
              {business.phone}
            </ButtonAnchor>
          </>
        }
      />

      {/* Limited time offer */}
      <section className="wrap pt-[clamp(2.5rem,5vw,4rem)]">
        <Reveal effect="pop">
          <div className="sticker-lg relative grid items-center gap-6 overflow-hidden bg-sun p-7 md:grid-cols-[auto_1fr_auto] md:p-10">
            <div aria-hidden className="absolute -right-4 -top-5 w-20 opacity-90">
              <Sparkle fill="var(--color-pink)" />
            </div>
            <p className="font-display font-display-wide text-[clamp(4rem,10vw,7rem)] leading-[0.85] text-pink [text-shadow:3px_4px_0_var(--color-ink)]">
              +30
            </p>
            <div>
              <p className="eyebrow">{limitedOffer.eyebrow}</p>
              <h2 className="mt-2 font-display text-title">{limitedOffer.title}</h2>
              <p className="mt-2 font-semibold">{limitedOffer.body}</p>
              <p className="mt-2 text-sm text-ink/75">{limitedOffer.fine}</p>
            </div>
            <ButtonLink href="/contact" variant="ink">
              Book Your Party Now!
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Packages */}
      <section aria-labelledby="packages-title" className="wrap py-[clamp(4rem,8vw,7rem)]">
        <SectionHeading id="packages-title" eyebrow="Pick your package" title="Funland Party Room Packages" />

        <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" stagger={0.1} effect="pop">
          {packages.map((p) => (
            <article key={p.name} data-tilt className="sticker flex flex-col overflow-hidden bg-cloud">
              <header className={`relative border-b-[3px] border-ink px-6 pb-6 pt-5 ${head[p.tone]}`}>
                <h3 className="font-display font-display-wide text-[2rem] uppercase tracking-wide">{p.name}</h3>
                <p className="num mt-1 font-display text-[3.4rem] leading-none">${p.price}</p>
                <p className="mt-1 text-sm font-bold opacity-80">plus taxes</p>
                {p.name === "Extreme" ? (
                  <span className="absolute right-4 top-4 rotate-6 rounded-full border-[2.5px] border-ink bg-sun px-3 py-1 font-display text-xs font-semibold uppercase text-ink">
                    Most guests
                  </span>
                ) : null}
              </header>
              <dl className="flex-1 divide-y-2 divide-dashed divide-ink/12 px-6 py-3">
                <Row label="Children" value={String(p.children)} note="Birthday child goes free" />
                <Row label="Adults" value={String(p.adults)} note="Both parents of the birthday child go free" />
                <Row label="Pizzas" value={p.pizzas} note={p.pizzaNote} />
                <Row label="Juice Boxes" value={String(p.juiceBoxes)} />
                <Row label="Cutlery, Plates & Napkins" value={String(p.cutlery)} />
              </dl>
              <div className="border-t-[3px] border-ink bg-cream px-6 py-4 text-sm">
                <p className="flex justify-between gap-3">
                  <span>Each Additional Child</span>
                  <span className="num font-display font-semibold">{money(extraGuests.child)}</span>
                </p>
                <p className="mt-1 flex justify-between gap-3">
                  <span>Each Additional Adult</span>
                  <span className="num font-display font-semibold">{money(extraGuests.adult)}</span>
                </p>
                <TransitionLink
                  href="/contact"
                  className="group mt-4 flex items-center justify-between rounded-full border-[2.5px] border-ink bg-cloud px-4 py-2.5 font-display font-semibold transition-colors hover:bg-sun"
                >
                  Book {p.name}
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </TransitionLink>
              </div>
            </article>
          ))}
        </Reveal>

        {/* Shared inclusions */}
        <Reveal className="sticker relative mt-8 bg-sky-soft p-6 md:p-8" effect="pop">
          <h3 className="font-display text-2xl">Every package also includes</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {everyPackageIncludes.map((x) => (
              <li key={x.label} className="flex gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-sun">
                  <CheckIcon width={15} height={15} />
                </span>
                <span>
                  <span className="font-display font-semibold">{x.label}</span>
                  {x.value !== "Included" && x.value !== "Yes" ? <span className="text-ink-soft">: {x.value}</span> : null}
                  {x.note ? <span className="block text-sm text-ink-soft">({x.note})</span> : null}
                </span>
              </li>
            ))}
          </ul>
          <TransitionLink href="/menu" className="group mt-6 inline-flex items-center gap-2 font-display font-semibold">
            <span className="link-underline">Want more food? See our Catering Menu</span>
            <ArrowIcon className="transition-transform group-hover:translate-x-1" />
          </TransitionLink>
        </Reveal>
      </section>

      {/* Time slots */}
      <section aria-labelledby="slots-title" className="relative bg-cream-deep py-[clamp(4rem,8vw,7rem)]">
        <div className="dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="wrap relative">
          <SectionHeading id="slots-title" eyebrow="When to party" title="Party Time Slots" />
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08} effect="pop">
            {timeSlots.map((s, i) => (
              <div key={s.slot} className={`sticker relative p-6 ${["bg-sky-soft", "bg-cloud", "bg-cloud", "bg-pink-soft"][i]}`}>
                <p className="eyebrow text-ink-soft">{s.slot}</p>
                {s.times.map((t, ti) => (
                  <p key={t} className="num mt-2 font-display text-2xl">
                    {ti > 0 ? <span className="mr-1 text-base text-ink-soft">or</span> : null}
                    {t}
                  </p>
                ))}
                {s.weekendDeal ? (
                  <p className="mt-4 inline-block rounded-full border-2 border-ink bg-sun px-3 py-1 text-sm font-bold">
                    Weekends: extra 10% off
                  </p>
                ) : null}
              </div>
            ))}
          </Reveal>
          <Reveal as="ul" className="mt-8 grid gap-2 text-ink-soft md:grid-cols-2" stagger={0.05}>
            {slotNotes.map((n) => (
              <li key={n} className="flex gap-3">
                <Star className="mt-0.5 size-5 shrink-0" />
                {n}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Specials */}
      <section aria-label="Party specials" className="wrap py-[clamp(4rem,8vw,7rem)]">
        <Reveal className="grid gap-6 lg:grid-cols-2" stagger={0.12} effect="pop">
          <div className="sticker-lg relative overflow-hidden bg-pink p-8 text-white md:p-10">
            <p className="inline-block -rotate-3 rounded-2xl border-[3px] border-ink bg-sun px-5 py-2 font-display font-display-wide text-[clamp(2.4rem,6vw,3.8rem)] leading-none text-ink shadow-[var(--shadow-sticker)]">
              {weekdaySpecial.badge}
            </p>
            <p className="eyebrow mt-6 text-white/90">{weekdaySpecial.eyebrow}</p>
            <h2 className="mt-2 font-display text-title">{weekdaySpecial.title}</h2>
            <p className="mt-3 text-lede text-white/90">{weekdaySpecial.body}</p>
            <ButtonLink href="/contact" variant="sun" className="mt-7">
              Book Your Party Now!
            </ButtonLink>
          </div>
          <div className="sticker-lg relative overflow-hidden bg-sky-soft p-8 md:p-10">
            <div aria-hidden className="absolute -right-3 -top-4 w-16">
              <Star fill="var(--color-pink)" />
            </div>
            <p className="eyebrow text-sky-deep">{lastMinuteOffer.eyebrow}</p>
            <h2 className="mt-2 font-display text-title">{lastMinuteOffer.title}</h2>
            <p className="mt-3 text-lede text-ink-soft">{lastMinuteOffer.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonAnchor href={business.phoneHref} variant="sky" icon={<PhoneIcon />}>
                Call {business.phone}
              </ButtonAnchor>
              <ButtonAnchor href={`mailto:${business.email}`} variant="cream" icon={<MailIcon />}>
                Email us
              </ButtonAnchor>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Rooms */}
      <section aria-labelledby="rooms-title" className="wrap pb-[clamp(3rem,6vw,5rem)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="rooms-title" eyebrow="Three party rooms" title="Lavender, Lilium & Tulip" />
          <ButtonLink href="/photo-gallery/party-rooms" variant="cream">
            See the party rooms
          </ButtonLink>
        </div>
        <Reveal className="mt-10 grid grid-cols-3 gap-3 md:gap-6" stagger={0.1} effect="pop">
          {[
            { p: photos.lavender, name: "Lavender Room", c: "bg-[#d9cdf5]" },
            { p: photos.lilium, name: "Lilium Room", c: "bg-pink-soft" },
            { p: photos.tulip, name: "Tulip Room", c: "bg-sun-soft" },
          ].map((r) => (
            <figure key={r.name} data-tilt className={`sticker overflow-hidden ${r.c}`}>
              <div className="relative aspect-[3/4]">
                <Image src={r.p.src} alt={r.p.alt} fill sizes="(min-width: 768px) 30vw, 32vw" className="object-cover" />
              </div>
              <figcaption className="border-t-[3px] border-ink px-3 py-3 text-center font-display text-[clamp(0.9rem,1.6vw,1.35rem)] font-semibold">
                {r.name}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      {/* Rules */}
      <section aria-labelledby="party-rules-title" className="wrap py-[clamp(3rem,6vw,5rem)]">
        <SectionHeading id="party-rules-title" eyebrow="Good to know" title="Rules" />
        <RuleList items={partyRules} className="mt-10" />
      </section>

      <PhotoMarquee photos={partyDecor} />

      <CtaBand
        tone="pink"
        eyebrow="Pick a date, we’ll do the rest"
        title="Book Your Party Now!"
        body={<p>Call or email us to check availability and reserve your time slot.</p>}
      >
        <ButtonLink href="/contact" variant="sun">
          Contact us
        </ButtonLink>
        <ButtonAnchor href={business.phoneHref} variant="cream" icon={<PhoneIcon />}>
          {business.phone}
        </ButtonAnchor>
      </CtaBand>
    </>
  );
}

function Row({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="py-3">
      <dt className="text-sm font-bold uppercase tracking-wide text-ink-faint">{label}</dt>
      <dd className="mt-0.5 font-display text-lg font-semibold leading-snug">
        {value}
        {note ? <span className="mt-0.5 block font-sans text-sm font-semibold text-ink-soft">({note})</span> : null}
      </dd>
    </div>
  );
}
