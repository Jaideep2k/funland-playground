import { HeroIntro } from "@/components/home/HeroIntro";
import { Ribbons } from "@/components/home/Ribbons";
import { Welcome } from "@/components/home/Welcome";
import { Offerings } from "@/components/home/Offerings";
import { Stats } from "@/components/home/Stats";
import { PartyScroller } from "@/components/home/PartyScroller";
import { InviteAndWaiver } from "@/components/home/InviteAndWaiver";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { VisitBlock } from "@/components/sections/VisitBlock";

export default function HomePage() {
  return (
    <>
      <HeroIntro />
      <Ribbons />
      <Welcome />
      <Offerings />
      <Stats />
      <PartyScroller />
      <InviteAndWaiver />
      <section aria-labelledby="visit-title" className="wrap py-[clamp(2rem,5vw,4rem)]">
        <SectionHeading id="visit-title" eyebrow="Plan your visit" title="Come play with us" className="mb-10" />
        <VisitBlock />
      </section>
    </>
  );
}
