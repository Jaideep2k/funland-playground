import type { Metadata } from "next";
import { playgroundRules, waiverClauses, waiverIntro } from "@/content/waiver";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { RuleList } from "@/components/sections/RuleList";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PenIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Waiver",
  description:
    "Read the Funland Indoor Playground waiver and playground rules, then sign the waiver online before your visit.",
  alternates: { canonical: "/waiver-rules" },
};

export default function WaiverRulesPage() {
  return (
    <>
      <PageHero
        tone="sun"
        eyebrow="Waiver & rules"
        title="Waiver"
        lede={<p>A signed waiver is needed to enter Funland. Read it below, then sign it online before you visit.</p>}
        actions={
          <>
            <ButtonLink href="/waiver" variant="pink" icon={<PenIcon />}>
              Sign the Waiver!
            </ButtonLink>
            <ButtonLink href="#rules" variant="cream">
              Playground rules
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="waiver-text-title" className="wrap py-[clamp(4rem,8vw,7rem)]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="waiver-text-title" eyebrow="Please read" title="Funland Waiver" />
            <Reveal className="mt-8" effect="pop">
              <ButtonLink href="/waiver" variant="pink" icon={<PenIcon />}>
                Sign the Waiver!
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal className="sticker bg-cloud p-6 md:p-10" effect="rise">
            <p className="leading-relaxed text-ink-soft">{waiverIntro}</p>
            <ol className="mt-6 space-y-4">
              {waiverClauses.map((c, i) => (
                <li key={i} className="flex gap-4">
                  <span className="num mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-sun-soft font-display text-sm font-semibold">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-ink-soft">{c}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section id="rules" aria-labelledby="rules-title" className="relative scroll-mt-28 bg-cream-deep py-[clamp(4rem,8vw,7rem)]">
        <div className="dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="wrap relative">
          <SectionHeading id="rules-title" eyebrow="Play safe" title="Funland Indoor Playground Rules" />
          <RuleList items={playgroundRules} className="mt-10" />
        </div>
      </section>

      <CtaBand tone="pink" eyebrow="Ready to play?" title="Sign the Waiver!" body={<p>Covers up to five kids in one go.</p>}>
        <ButtonLink href="/waiver" variant="sun" icon={<PenIcon />}>
          Sign the Waiver
        </ButtonLink>
      </CtaBand>
    </>
  );
}
