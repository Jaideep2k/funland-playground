import Image from "next/image";
import { partyDecor } from "@/content/photos";
import { ButtonLink } from "@/components/ui/Button";
import { SplitHeading, Reveal } from "@/components/motion/Reveal";
import { Star } from "@/components/ui/Shapes";

const tilts = [-3, 2, -2, 3, -1, 2];

/** Party wall: the pitch on one side, a pinned-up board of party photos on the other. It stays put while you scroll. */
export function PartyWall() {
  return (
    <section aria-labelledby="party-title" className="relative overflow-x-clip bg-pink py-[clamp(4rem,9vw,7.5rem)] text-white">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <Reveal as="p" className="eyebrow text-sun" y={12}>
            <Star className="size-5" /> Birthday parties
          </Reveal>
          <SplitHeading id="party-title" className="mt-4 font-display font-display-heavy text-headline">
            Ready for the best birthday ever?
          </SplitHeading>
          <Reveal as="p" className="mt-6 max-w-[34rem] text-lede text-white/90" delay={0.1}>
            Funland was made for it. With three spacious party rooms, we host celebrations of every size, and our party
            packages take care of every detail from start to finish, so all you have to do is show up and enjoy the day
            with your child.
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-3" stagger={0.08}>
            <ButtonLink href="/party-packages-and-rates" variant="sun">
              See Party Packages
            </ButtonLink>
            <ButtonLink href="/private-parties" variant="cream">
              Private Parties
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-5" stagger={0.06}>
          {partyDecor.slice(0, 6).map((p, i) => (
            <figure
              key={p.src}
              className={`rounded-[1.2rem] border-[3px] border-ink bg-cloud p-1.5 shadow-[var(--shadow-sticker)] ${i >= 4 ? "max-sm:hidden" : ""}`}
              style={{ rotate: `${tilts[i]}deg` }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw"
                className="aspect-[4/5] w-full rounded-[0.85rem] object-cover"
              />
              <figcaption className="px-1 pb-0.5 pt-2 font-display text-[0.9rem] font-semibold leading-snug text-ink">{p.alt}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
