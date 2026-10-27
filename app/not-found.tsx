import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PenIcon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <PageHero
      tone="pink"
      eyebrow="404"
      title="Oops! This slide goes nowhere."
      lede={<p>The page you’re looking for has moved. Try one of these instead.</p>}
      actions={
        <>
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/party-packages-and-rates" variant="sun">
            Party Packages
          </ButtonLink>
          <ButtonLink href="/waiver" variant="cream" icon={<PenIcon />}>
            Sign the Waiver
          </ButtonLink>
        </>
      }
    />
  );
}
