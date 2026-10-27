import type { Metadata } from "next";
import { business } from "@/content/site";
import { photos } from "@/content/photos";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { VisitBlock } from "@/components/sections/VisitBlock";
import { ContactForm, NewsletterForm } from "@/components/forms/ContactForms";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/Transition";
import { ButtonAnchor } from "@/components/ui/Button";
import { ArrowIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Sparkle } from "@/components/ui/Shapes";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Funland Indoor Playground at 5051 Highway 7 East Unit 1A, Markham. Call 905-868-0888 or email info@funlandplayground.ca.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        tone="sky"
        eyebrow="FUNLAND Indoor Playground"
        title="Contact Us"
        lede={
          <p>
            {business.address.line1}, {business.address.city}, {business.address.region} {business.address.postal}
          </p>
        }
        photos={[photos.exterior, photos.cafe, photos.hall3]}
        actions={
          <>
            <ButtonAnchor href={business.phoneHref} variant="pink" icon={<PhoneIcon />}>
              {business.phone}
            </ButtonAnchor>
            <ButtonAnchor href={`mailto:${business.email}`} variant="cream" icon={<MailIcon />}>
              {business.email}
            </ButtonAnchor>
          </>
        }
      />

      <section className="wrap grid gap-8 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-[1.25fr_1fr]">
        <Reveal effect="pop" className="sticker-lg bg-cloud p-6 md:p-10">
          <h2 className="font-display text-title">Contact Us</h2>
          <p className="mt-2 text-ink-soft">Party bookings, private events, field trips or just a question. We’d love to hear from you.</p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Reveal>
        <div className="flex flex-col gap-8">
          <Reveal effect="pop" className="sticker-lg relative overflow-hidden bg-sun-soft p-6 md:p-8">
            <div aria-hidden className="absolute -right-3 -top-4 w-12">
              <Sparkle fill="var(--color-pink)" />
            </div>
            <h2 className="font-display text-[1.9rem] leading-tight">Newsletter Sign-up!</h2>
            <p className="mt-2 text-ink-soft">Specials, holiday hours and new things to play with.</p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </Reveal>
          <Reveal effect="pop">
            <TransitionLink href="/party-packages-and-rates" data-tilt className="group sticker-lg flex items-center justify-between gap-4 bg-pink p-6 text-white md:p-8">
              <span className="font-display text-[1.6rem] leading-tight">Check out our Party Packages!</span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-sun text-ink transition-transform group-hover:-rotate-12">
                <ArrowIcon />
              </span>
            </TransitionLink>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="find-title" className="wrap pb-[clamp(2rem,4vw,3rem)]">
        <SectionHeading id="find-title" eyebrow="Find us" title="Hours & directions" className="mb-10" />
        <VisitBlock />
      </section>
    </>
  );
}
