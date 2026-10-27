import type { Metadata } from "next";
import Image from "next/image";
import { addonNotes, addons } from "@/content/addons";
import { decor, photos } from "@/content/photos";
import { business } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Star } from "@/components/ui/Shapes";

export const metadata: Metadata = {
  title: "Party Add-ons",
  description:
    "Party add-ons at Funland Indoor Playground: custom designer cakes, face painting, STEM loot bags and character/mascot visits.",
  alternates: { canonical: "/add-ons" },
};

const tag: Record<string, string> = {
  pink: "bg-pink text-white",
  sky: "bg-sky",
  sun: "bg-sun",
  ink: "bg-ink text-cream",
};

export default function AddOnsPage() {
  return (
    <>
      <PageHero
        tone="pink"
        eyebrow="Party Add-ons"
        title="Elevate Your Party to the Next Level!"
        lede={<p>Enhance your party experience with our various add-ons, designed to make your party planning hassle-free!</p>}
        photos={[photos.addonsCard, photos.cake, decor[18]]}
        actions={
          <ButtonLink href="/contact" variant="pink">
            Reach out to us
          </ButtonLink>
        }
      />

      <section aria-label="Add-ons" className="wrap py-[clamp(4rem,8vw,7rem)]">
        <Reveal className="grid gap-8 md:grid-cols-2" stagger={0.1} effect="pop">
          {addons.map((a, i) => (
            <article key={a.title} data-tilt className="sticker-lg group grid overflow-hidden bg-cloud sm:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[16rem] border-b-[3px] border-ink sm:border-b-0 sm:border-r-[3px]">
                <Image
                  src={a.photo.src}
                  alt={a.photo.alt}
                  fill
                  sizes="(min-width: 768px) 22vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className={`absolute left-4 top-4 grid size-11 place-items-center rounded-full border-[3px] border-ink font-display text-lg font-semibold ${tag[a.tone]}`}>
                  {i + 1}
                </span>
              </div>
              <div className="flex flex-col justify-center p-7">
                <h2 className="font-display text-[1.7rem] leading-tight">{a.title}</h2>
                <p className="mt-2 font-display text-lg font-semibold text-pink">{a.hook}</p>
                <p className="mt-3 text-ink-soft">{a.body}</p>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className="sticker relative mt-10 flex flex-col gap-4 bg-sun-soft p-6 md:flex-row md:items-center md:justify-between md:p-8" effect="pop">
          <div aria-hidden className="absolute -left-3 -top-4 w-11">
            <Star />
          </div>
          <ul className="space-y-1 font-display text-lg font-semibold">
            {addonNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <ButtonLink href="/menu" variant="cream" className="min-h-11 px-5">
            See our Catering Menu
          </ButtonLink>
        </Reveal>
      </section>

      <CtaBand
        tone="sun"
        eyebrow="Reach out to us to know more!"
        title="Let’s plan the extras"
        body={
          <p>
            Call us at {business.phone} or email us at {business.email}. Advance booking of at least 1 week is required.
          </p>
        }
      >
        <ButtonAnchor href={business.phoneHref} variant="pink" icon={<PhoneIcon />}>
          {business.phone}
        </ButtonAnchor>
        <ButtonAnchor href={`mailto:${business.email}`} variant="cream" icon={<MailIcon />}>
          Email us
        </ButtonAnchor>
      </CtaBand>
    </>
  );
}
