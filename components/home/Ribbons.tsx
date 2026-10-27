import { Marquee } from "@/components/motion/Marquee";
import { Star } from "@/components/ui/Shapes";

const items = [
  "Birthday Parties",
  "Drop in Play",
  "Toddler Area",
  "Private Events",
  "School Events",
  "Field Trips",
  "Summer Camps",
  "Corporate Gatherings",
];

/** Two crossing ribbons, like party streamers. */
export function Ribbons() {
  return (
    <div aria-label="What happens at Funland" className="relative z-10 -my-4 py-10 md:py-14">
      <div className="-rotate-[2.5deg] border-y-[3px] border-ink bg-pink text-white">
        <Marquee speed={38}>
          {items.map((t) => (
            <span key={t} className="flex items-center gap-6 px-6 py-3.5 font-display text-[clamp(1.25rem,2.4vw,2rem)] font-semibold">
              {t}
              <Star className="size-7 shrink-0" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[2deg] border-y-[3px] border-ink bg-sun text-ink" aria-hidden>
        <Marquee speed={46} reverse>
          {items.map((t) => (
            <span key={t} className="flex items-center gap-6 px-6 py-2.5 font-display text-[clamp(1rem,1.8vw,1.4rem)] font-semibold">
              {t}
              <span className="size-3.5 shrink-0 rounded-full border-2 border-ink bg-sky" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
