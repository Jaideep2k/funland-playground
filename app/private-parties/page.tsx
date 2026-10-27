import type { Metadata } from "next";
import Image from "next/image";
import { decor, photos, privatePartyPhotos } from "@/content/photos";
import { business } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { WeekendSpecial } from "@/components/sections/WeekendSpecial";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/Transition";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { ArrowIcon, PhoneIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Private Parties",
  description:
    "Book the entire Funland Indoor Playground exclusively for your private party: birthday parties, family gatherings and special celebrations in Markham.",
  alternates: { canonical: "/private-parties" },
};

const occasions = [
  { label: "Birthday parties", c: "bg-pink text-white" },
  { label: "Family gatherings", c: "bg-sun" },
  { label: "Special celebrations", c: "bg-sky" },
  { label: "School events", c: "bg-cloud" },
  { label: "Field trips", c: "bg-pink-soft" },
  { label: "Summer camps", c: "bg-sun-soft" },
  { label: "Corporate gatherings", c: "bg-sky-soft" },
];

export default function PrivatePartiesPage() {
  return (
    <>
      <PageHero
        tone="sun"
        eyebrow="Unleash the fun!"
        title={
          <>
            Book the <span className="text-pink">entire facility</span> exclusively for your private party!
          </>
        }
        lede={<p>Welcome to the ultimate destination for unforgettable private parties!</p>}
        photos={[decor[16], decor[18], decor[19]]}
        actions={
          <>
            <ButtonLink href="/contact">Book Your Private Event Now!</ButtonLink>
            <ButtonAnchor href={business.phoneHref} variant="cream" icon={<PhoneIcon />}>
              {business.phone}
            </ButtonAnchor>
          </>
        }
      />

      <section aria-labelledby="private-title" className="wrap grid gap-12 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionHeading id="private-title" eyebrow="The whole place, just for you" title="Private Parties" />
          <Reveal as="p" className="mt-6 text-lede text-ink-soft" delay={0.1}>
            Welcome to the ultimate destination for unforgettable private parties! Our indoor playground offers a safe,
            exciting, and versatile space perfect for birthday parties, family gatherings, and special celebrations. With a
            variety of engaging activities and themed play areas, kids of all ages will have a blast while parents can
            relax and enjoy the festivities. Our dedicated team ensures a hassle-free experience, providing everything from
            setup to cleanup. Book your private event with us and create memories that will last a lifetime!
          </Reveal>
          <Reveal as="ul" className="mt-8 flex flex-wrap gap-2.5" stagger={0.05} effect="pop">
            {occasions.map((o) => (
              <li key={o.label} className={`rounded-full border-[2.5px] border-ink px-4 py-2 font-display font-semibold shadow-[2px_3px_0_0_var(--color-ink)] ${o.c}`}>
                {o.label}
              </li>
            ))}
          </Reveal>
        </div>
        <Reveal className="grid grid-cols-2 gap-4" stagger={0.1} effect="pop">
          {privatePartyPhotos.slice(0, 4).map((p, i) => (
            <div
              key={p.src}
              data-tilt
              className={`overflow-hidden rounded-[1.4rem] border-[3px] border-ink bg-cloud p-1.5 shadow-[var(--shadow-sticker)] ${i % 2 ? "translate-y-8" : ""}`}
            >
              <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 1024px) 22vw, 45vw" className="aspect-[4/5] w-full rounded-[1rem] object-cover" />
            </div>
          ))}
        </Reveal>
      </section>

      <section aria-label="Weekend private party special" className="wrap pb-[clamp(3rem,6vw,5rem)]">
        <WeekendSpecial />
      </section>

      <section aria-labelledby="bday-title" className="wrap py-[clamp(2rem,5vw,4rem)]">
        <TransitionLink href="/party-packages-and-rates" data-tilt className="group sticker-lg grid overflow-hidden bg-sky-soft md:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-[16rem]">
            <Image src={photos.partyCard.src} alt={photos.partyCard.alt} fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center border-t-[3px] border-ink p-8 md:border-l-[3px] md:border-t-0 md:p-12">
            <p className="eyebrow text-sky-deep">Just the party room?</p>
            <h2 id="bday-title" className="mt-2 font-display text-title">Birthday Parties</h2>
            <p className="mt-3 text-lede text-ink-soft">
              Our party room packages start at $449 for 10 kids, with pizza, juice, set up and clean up included.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-lg font-semibold">
              <span className="link-underline">See Party Packages</span>
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </TransitionLink>
      </section>

      <CtaBand
        tone="ink"
        eyebrow="Make it yours"
        title="Book Your Private Event Now!"
        body={<p>Tell us your date, your theme and how many guests you’re expecting.</p>}
      >
        <ButtonLink href="/contact" variant="pink">
          Enquire now
        </ButtonLink>
        <ButtonAnchor href={business.phoneHref} variant="sun" icon={<PhoneIcon />}>
          {business.phone}
        </ButtonAnchor>
      </CtaBand>
    </>
  );
}
