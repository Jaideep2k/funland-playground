import { business, formatTime, hours, hoursNote } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { OpenToday } from "@/components/layout/OpenToday";
import { ButtonAnchor } from "@/components/ui/Button";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

/** Hours, contact and map. The three things every visiting parent needs, side by side. */
export function VisitBlock({ showMap = true }: { showMap?: boolean }) {
  return (
    <Reveal className={`grid gap-5 ${showMap ? "lg:grid-cols-[1fr_1fr_1.25fr]" : "md:grid-cols-2"}`} stagger={0.1} effect="pop">
      <div className="sticker relative bg-sun-soft p-7">
        <span className="grid size-12 place-items-center rounded-2xl border-[3px] border-ink bg-sun">
          <ClockIcon />
        </span>
        <h3 className="mt-5 font-display text-2xl">Hours of Operation</h3>
        <OpenToday className="mt-1 text-sm font-bold text-ink-soft" />
        <ul className="mt-5 divide-y-2 divide-dashed divide-ink/15">
          {hours.map((h) => (
            <li key={h.days} className="flex items-baseline justify-between gap-4 py-2.5">
              <span className="font-display font-semibold">{h.days}</span>
              <span className="num whitespace-nowrap text-ink-soft">
                {formatTime(h.open)} – {formatTime(h.close)}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">{hoursNote}</p>
      </div>

      <div className="sticker relative flex flex-col bg-sky-soft p-7">
        <span className="grid size-12 place-items-center rounded-2xl border-[3px] border-ink bg-sky">
          <PinIcon />
        </span>
        <h3 className="mt-5 font-display text-2xl">Contact</h3>
        <address className="mt-4 not-italic">
          {business.address.line1}
          <br />
          {business.address.city}, {business.address.region} {business.address.postal}
        </address>
        <p className="mt-3 text-sm text-ink-soft">
          On Highway 7, opposite{" "}
          <a href={business.markvilleUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-2">
            Markville Shopping Centre
          </a>
          , and just 5 minutes from the 407.
        </p>
        <ul className="mt-5 space-y-2">
          <li>
            <a href={business.phoneHref} className="inline-flex items-center gap-2 font-display text-xl font-semibold hover:text-pink">
              <PhoneIcon /> {business.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${business.email}`} className="inline-flex items-center gap-2 break-all hover:text-pink">
              <MailIcon className="shrink-0" /> {business.email}
            </a>
          </li>
        </ul>
        <div className="mt-auto pt-6">
          <ButtonAnchor href={business.mapsUrl} target="_blank" rel="noopener noreferrer" variant="cream" className="min-h-11 px-5">
            Get directions
          </ButtonAnchor>
        </div>
      </div>

      {showMap ? (
        <div className="sticker relative min-h-[20rem] overflow-hidden bg-cloud">
          <iframe
            title="Map to Funland Indoor Playground, 5051 Highway 7 East, Markham"
            src={business.mapEmbed}
            className="absolute inset-0 size-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}
    </Reveal>
  );
}
