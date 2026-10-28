import type { Metadata } from "next";
import Image from "next/image";
import { dropIn, membership, playDeal, playDealNote, playNotes, playRates } from "@/content/play";
import { photos } from "@/content/photos";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { VisitBlock } from "@/components/sections/VisitBlock";
import { RuleList } from "@/components/sections/RuleList";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PenIcon } from "@/components/ui/Icons";
import { Star } from "@/components/ui/Shapes";

export const metadata: Metadata = {
  title: "Drop in Play",
  description:
    "Walk-in play at Funland Indoor Playground in Markham for kids up to 13. Weekday and weekend play rates, 5-for-6 admissions and monthly memberships.",
  alternates: { canonical: "/drop-in-play" },
};

export default function DropInPlayPage() {
  return (
    <>
      <PageHero
        tone="sky"
        eyebrow="Walk-ins welcome"
        title={dropIn.title}
        lede={<p>{dropIn.lede}</p>}
        photos={[photos.ballPit, photos.carousel, photos.steppingPads]}
        actions={
          <>
            <ButtonLink href="#rates" variant="pink">
              See play rates
            </ButtonLink>
            <ButtonLink href="/waiver" variant="sun" icon={<PenIcon />}>
              Sign the Waiver
            </ButtonLink>
          </>
        }
      />

      <section className="wrap grid gap-10 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <Reveal className="space-y-5 text-lede text-ink-soft" stagger={0.08}>
          {dropIn.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="relative grid grid-cols-2 gap-4" stagger={0.1} effect="pop">
          <div className="overflow-hidden rounded-[1.4rem] border-[3px] border-ink bg-cloud p-1.5 shadow-[var(--shadow-sticker)] -rotate-2">
            <Image src={photos.ropeBridge.src} alt={photos.ropeBridge.alt} width={975} height={1300} sizes="(min-width: 1024px) 22vw, 45vw" className="aspect-[3/4] w-full rounded-[1rem] object-cover" />
          </div>
          <div className="mt-10 overflow-hidden rounded-[1.4rem] border-[3px] border-ink bg-cloud p-1.5 shadow-[var(--shadow-sticker)] rotate-2">
            <Image src={photos.ballPitTall.src} alt={photos.ballPitTall.alt} width={733} height={1030} sizes="(min-width: 1024px) 22vw, 45vw" className="aspect-[3/4] w-full rounded-[1rem] object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Rates */}
      <section id="rates" aria-labelledby="rates-title" className="relative scroll-mt-28 bg-cream-deep py-[clamp(4rem,8vw,7rem)]">
        <div className="dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="wrap relative">
          <SectionHeading id="rates-title" eyebrow="Play rates" title="Drop in Play Rates" />

          <Reveal effect="pop" className="mt-10">
            <div className="sticker-lg overflow-hidden bg-cloud">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Drop in play rates by age, weekday and weekend</caption>
                <thead>
                  <tr className="font-display text-[clamp(0.95rem,1.6vw,1.25rem)]">
                    <th scope="col" className="border-b-[3px] border-ink bg-ink px-4 py-4 text-cream md:px-7">
                      Ages
                    </th>
                    <th scope="col" className="border-b-[3px] border-l-[3px] border-ink bg-sky px-4 py-4 text-center md:px-7">
                      Weekday play rates
                    </th>
                    <th scope="col" className="border-b-[3px] border-l-[3px] border-ink bg-pink px-4 py-4 text-center text-white md:px-7">
                      Weekend play rates
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {playRates.map((r, i) => (
                    <tr key={r.age} className={i % 2 ? "bg-cream" : "bg-cloud"}>
                      <th scope="row" className="border-t-2 border-dashed border-ink/15 px-4 py-4 font-display font-semibold md:px-7">
                        {r.age}
                        {r.note ? <span className="block font-sans text-sm font-semibold text-ink-soft">({r.note})</span> : null}
                      </th>
                      <td className="num border-l-[3px] border-t-2 border-dashed border-ink/15 border-l-ink px-4 py-4 text-center font-display text-[clamp(1.05rem,2vw,1.5rem)] md:px-7">
                        {r.weekday}
                      </td>
                      <td className="num border-l-[3px] border-t-2 border-dashed border-ink/15 border-l-ink px-4 py-4 text-center font-display text-[clamp(1.05rem,2vw,1.5rem)] md:px-7">
                        {r.weekend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-6 grid gap-6 md:grid-cols-2" stagger={0.1} effect="pop">
            <div className="sticker relative flex items-center gap-5 bg-sun p-6 md:p-8">
              <p className="font-display font-display-heavy text-[clamp(3rem,7vw,4.5rem)] leading-none text-pink [text-shadow:3px_3px_0_var(--color-ink)]">5=6</p>
              <div>
                <p className="font-display text-xl">{playDeal}</p>
                <p className="mt-1 font-semibold text-ink/75">({playDealNote})</p>
              </div>
            </div>
            <div className="sticker relative bg-pink-soft p-6 md:p-8">
              <div aria-hidden className="absolute -right-3 -top-4 w-12">
                <Star fill="var(--color-sky)" />
              </div>
              <p className="eyebrow text-pink">{membership.pass}</p>
              <h3 className="mt-1 font-display text-2xl">{membership.title}</h3>
              <ul className="mt-4 space-y-2">
                {membership.rates.map((m) => (
                  <li key={m.label} className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-ink/15 pb-2">
                    <span className="font-semibold">{m.label}</span>
                    <span className="num font-display text-2xl">{m.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-soft">{membership.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="know-title" className="wrap py-[clamp(4rem,8vw,7rem)]">
        <SectionHeading id="know-title" eyebrow="Before you come" title="Good to know" />
        <RuleList items={playNotes} className="mt-10" />
      </section>

      <section aria-labelledby="hours-title" className="wrap pb-[clamp(2rem,4vw,3rem)]">
        <SectionHeading id="hours-title" eyebrow="Check our hours" title="Come on over!" className="mb-10" />
        <VisitBlock />
      </section>

      <CtaBand
        tone="sky"
        eyebrow="No reservations needed"
        title="Bring your kids today!"
        body={<p>Save time at the door by signing the waiver online before you arrive.</p>}
      >
        <ButtonLink href="/waiver" variant="pink" icon={<PenIcon />}>
          Sign the Waiver
        </ButtonLink>
        <ButtonLink href="/contact" variant="cream">
          Contact Us Now!
        </ButtonLink>
      </CtaBand>
    </>
  );
}
