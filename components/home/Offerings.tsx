import Image from "next/image";
import { photos } from "@/content/photos";
import { TransitionLink } from "@/components/motion/Transition";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

/* Same six tiles, same order and same destinations as the old "What we offer" grid. */
const offers = [
  { title: "Party Packages", href: "/party-packages-and-rates", photo: photos.partyCard, chip: "bg-pink text-white", blurb: "Four packages, every detail handled." },
  { title: "Private Parties", href: "/private-parties", photo: photos.privateCard, chip: "bg-sun text-ink", blurb: "The whole facility, just for your guests." },
  { title: "Play Structure", href: "/photo-gallery/play-structure", photo: photos.playCard, chip: "bg-sky text-ink", blurb: "Climb, slide and explore for hours." },
  { title: "Toddler Area", href: "/photo-gallery/toddler-area", photo: photos.toddlerCard, chip: "bg-sun text-ink", blurb: "Safe, cozy and all their own." },
  { title: "Party Rooms", href: "/photo-gallery/party-rooms", photo: photos.roomsCard, chip: "bg-pink text-white", blurb: "Three spacious rooms to celebrate in." },
  { title: "Add-Ons", href: "/add-ons", photo: photos.addonsCard, chip: "bg-sky text-ink", blurb: "Cakes, face painting, loot bags and characters." },
];

export function Offerings() {
  return (
    <section aria-labelledby="offer-title" className="relative bg-cream-deep py-[clamp(4rem,9vw,8rem)]">
      <div className="dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="wrap relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="offer-title"
            eyebrow="What we offer"
            title={
              <>
                What we offer in our <span className="text-pink">indoor playground!</span>
              </>
            }
          />
        </div>

        <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} effect="pop">
          {offers.map((o, i) => (
            <TransitionLink
              key={o.title}
              href={o.href}
              data-tilt
              className="group sticker block overflow-hidden bg-cloud transition-shadow duration-300 hover:shadow-[var(--shadow-sticker-lg)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden border-b-[3px] border-ink">
                <Image
                  src={o.photo.src}
                  alt={o.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.07]"
                />
                <span className={`absolute left-4 top-4 rounded-full border-[2.5px] border-ink px-3 py-1 font-display text-sm font-semibold ${o.chip}`}>
                  0{i + 1}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-2xl">{o.title}</h3>
                  <p className="mt-1 text-ink-soft">{o.blurb}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-sun transition-[transform,background-color] duration-300 group-hover:-rotate-12 group-hover:bg-pink group-hover:text-white">
                  <ArrowIcon />
                </span>
              </div>
            </TransitionLink>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
