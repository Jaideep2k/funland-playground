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

/** A single party-streamer ribbon under the hero. */
export function Ribbons() {
  return (
    <div aria-label="What happens at Funland" className="relative z-10 -my-4 py-8 md:py-10">
      <div className="-rotate-[1.5deg] border-y-[3px] border-ink bg-pink text-white">
        <Marquee speed={60}>
          {items.map((t) => (
            <span key={t} className="flex items-center gap-6 px-6 py-3.5 font-display text-[clamp(1.25rem,2.4vw,2rem)] font-semibold">
              {t}
              <Star className="size-7 shrink-0" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
