import type { Metadata } from "next";
import { business } from "@/content/site";
import type { Photo } from "@/content/photos";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/gallery/Gallery";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Catering Menu",
  description: "The Funland Indoor Playground catering menu for parties and events: platters, salads and more.",
  alternates: { canonical: "/menu" },
};

/* The menu cards are shown exactly as Funland published them, so every item and price stays correct. */
const pages: Photo[] = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/menu/catering-menu-${i + 1}.jpg`,
  w: 1200,
  h: 1697,
  alt: `Funland catering menu, page ${i + 1} of 6`,
}));

export default function CateringMenuPage() {
  return (
    <>
      <PageHero
        tone="pink"
        eyebrow="Party food"
        title="Catering Menu"
        lede={<p>Tap any page to see it full size.</p>}
        actions={
          <>
            <ButtonAnchor href={business.phoneHref} variant="pink" icon={<PhoneIcon />}>
              {business.phone}
            </ButtonAnchor>
            <ButtonAnchor href={`mailto:${business.email}`} variant="cream" icon={<MailIcon />}>
              Email us
            </ButtonAnchor>
          </>
        }
      />
      <section className="wrap py-[clamp(3rem,6vw,5rem)]">
        <Gallery photos={pages} />
      </section>
      <CtaBand tone="sun" eyebrow="Planning a party?" title="Add food to your booking">
        <ButtonLink href="/party-packages-and-rates" variant="pink">
          Party Packages
        </ButtonLink>
        <ButtonLink href="/contact" variant="cream">
          Contact us
        </ButtonLink>
      </CtaBand>
    </>
  );
}
