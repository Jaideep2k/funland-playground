import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <PageHero
      tone="sun"
      eyebrow="Message received"
      title="Thanks for contacting us!"
      lede={<p>We will get in touch with you shortly.</p>}
      actions={
        <>
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/party-packages-and-rates" variant="cream">
            Party Packages
          </ButtonLink>
        </>
      }
    />
  );
}
