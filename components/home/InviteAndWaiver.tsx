import Image from "next/image";
import { photos } from "@/content/photos";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { DownloadIcon, PenIcon } from "@/components/ui/Icons";
import { Sparkle } from "@/components/ui/Shapes";

/** The two "before you come" jobs: invite friends, and sign the waiver. */
export function InviteAndWaiver() {
  return (
    <section aria-label="Before you come" className="wrap py-[clamp(3rem,7vw,6rem)]">
      <Reveal className="grid gap-6 lg:grid-cols-2" stagger={0.12} effect="pop">
        <div className="sticker-lg relative grid items-center gap-8 overflow-hidden bg-sky-soft p-7 sm:grid-cols-[1fr_1.1fr] md:p-10">
          <div>
            <p className="eyebrow text-sky-deep">Party invitations</p>
            <h2 className="mt-3 font-display text-title">Invitation Card</h2>
            <p className="mt-4 text-ink-soft">Download our Invitation Card to send it to your friends.</p>
            <ButtonAnchor
              href="/downloads/funland-invitation-card.pdf"
              download
              variant="sky"
              className="mt-6"
              icon={<DownloadIcon />}
            >
              Download PDF
            </ButtonAnchor>
          </div>
          <div className="relative">
            <div className="rotate-[4deg] overflow-hidden rounded-2xl border-[3px] border-ink bg-cloud shadow-[var(--shadow-sticker-lg)] transition-transform duration-500 hover:rotate-0">
              <Image src={photos.invitation.src} alt={photos.invitation.alt} width={432} height={288} sizes="(min-width: 1024px) 24vw, 80vw" className="w-full" />
            </div>
          </div>
        </div>

        <div className="sticker-lg relative overflow-hidden bg-sun p-7 md:p-10">
          <div aria-hidden className="absolute -right-6 -top-6 w-28 opacity-90 md:w-36">
            <Sparkle fill="var(--color-pink)" />
          </div>
          <p className="eyebrow">Save time at the door</p>
          <h2 className="mt-3 max-w-md font-display text-title">Sign the waiver before you arrive</h2>
          <p className="mt-4 max-w-md text-ink/80">
            A signed waiver is needed to enter Funland. It only takes a few minutes online, covers up to five kids, and
            stays on file for future visits.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/waiver" variant="ink" icon={<PenIcon />}>
              Sign the Waiver
            </ButtonLink>
            <ButtonLink href="/waiver-rules" variant="cream">
              Waiver &amp; Rules
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
