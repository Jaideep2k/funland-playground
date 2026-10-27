import type { Metadata } from "next";
import { business } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { WaiverForm } from "@/components/forms/WaiverForm";
import { TransitionLink } from "@/components/motion/Transition";

export const metadata: Metadata = {
  title: "Waiver",
  description: "Sign the Funland Indoor Playground waiver online before your visit. One waiver covers up to five kids.",
  alternates: { canonical: "/waiver" },
};

export default function WaiverPage() {
  return (
    <>
      <PageHero
        tone="sun"
        eyebrow="Sign online"
        title="Funland Waiver"
        lede={
          <p>
            Fill this in before you arrive to save time at the front desk. Questions? Call us at{" "}
            <a href={business.phoneHref} className="font-bold text-ink underline decoration-pink decoration-[3px] underline-offset-2">
              {business.phone}
            </a>
            . You can also read the{" "}
            <TransitionLink href="/waiver-rules#rules" className="font-bold text-ink underline decoration-sky decoration-[3px] underline-offset-2">
              playground rules
            </TransitionLink>
            .
          </p>
        }
      />
      <section className="wrap max-w-[56rem] py-[clamp(3rem,6vw,5rem)]">
        <WaiverForm />
      </section>
    </>
  );
}
