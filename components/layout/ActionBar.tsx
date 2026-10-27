"use client";

import { business } from "@/content/site";
import { TransitionLink } from "@/components/motion/Transition";
import { CakeIcon, PenIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

/** Phones only: the four things parents look for most, always one thumb away. */
export function ActionBar() {
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 font-display text-[0.78rem] font-semibold leading-none transition-colors active:scale-95";
  return (
    <nav
      id="action-bar"
      aria-label="Quick actions"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[45] md:hidden"
    >
      <div className="flex gap-1 rounded-[1.6rem] border-[3px] border-ink bg-cloud p-1.5 shadow-[var(--shadow-sticker)]">
        <a href={business.phoneHref} className={`${item} hover:bg-sky-soft`}>
          <PhoneIcon className="text-sky-deep" />
          Call
        </a>
        <TransitionLink href="/waiver" className={`${item} hover:bg-sun-soft`}>
          <PenIcon className="text-sun-deep" />
          Waiver
        </TransitionLink>
        <TransitionLink href="/party-packages-and-rates" className={`${item} bg-pink text-white`}>
          <CakeIcon />
          Book a Party
        </TransitionLink>
        <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${item} hover:bg-pink-soft`}>
          <PinIcon className="text-pink" />
          Directions
        </a>
      </div>
    </nav>
  );
}
