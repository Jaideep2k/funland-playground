import type { Metadata } from "next";
import { business } from "@/content/site";
import { photos } from "@/content/photos";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { InstagramIcon, PhoneIcon } from "@/components/ui/Icons";
import { Star } from "@/components/ui/Shapes";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "Upcoming events at Funland Indoor Playground in Markham.",
  alternates: { canonical: "/upcoming-events" },
};

export default function UpcomingEventsPage() {
  return (
    <>
      <PageHero
        tone="sky"
        eyebrow="Upcoming events"
        title="Get ready for a fun-filled time at Funland!"
        lede={
          <p>
            Mark your calendars and join us for these exciting upcoming events! Don’t forget to bring your friends for even
            more fun.
          </p>
        }
        photos={[photos.privateCard, photos.interactive6, photos.ballPit]}
      />
      <section className="wrap max-w-4xl py-[clamp(3rem,6vw,5rem)]">
        <Reveal effect="pop" className="sticker-lg relative bg-cloud p-8 text-center md:p-12">
          <div aria-hidden className="absolute -left-4 -top-5 w-14">
            <Star />
          </div>
          <p className="text-lede text-ink-soft">Check this page regularly to see what’s happening at FUNLAND.</p>
          <p className="mt-3 text-lede text-ink-soft">Book your spot or call us for further information!</p>
          <h2 className="mt-8 font-display text-title">Here’s what’s coming up:</h2>
          <p className="mx-auto mt-4 max-w-md rounded-2xl border-2 border-dashed border-ink/25 bg-cream p-5 font-semibold text-ink-soft">
            No events are posted right now. Follow us on Instagram to hear about the next one first.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonAnchor href={business.socials.instagram} target="_blank" rel="noopener noreferrer" variant="pink" icon={<InstagramIcon />}>
              Follow on Instagram
            </ButtonAnchor>
            <ButtonAnchor href={business.phoneHref} variant="cream" icon={<PhoneIcon />}>
              {business.phone}
            </ButtonAnchor>
          </div>
          <p className="mt-8 font-display text-xl text-pink">We can’t wait to see you there!</p>
        </Reveal>
        <div className="mt-8 text-center">
          <ButtonLink href="/drop-in-play" variant="sun">
            Drop in Play
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
