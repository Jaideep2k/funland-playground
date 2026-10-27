import type { Metadata } from "next";
import Image from "next/image";
import { albums, aroundFunland } from "@/content/gallery";
import { photos } from "@/content/photos";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/gallery/Gallery";
import { AlbumNav } from "@/components/gallery/AlbumNav";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/Transition";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Photos of Funland Indoor Playground: the play structure, toddler area, party rooms and interactive play.",
  alternates: { canonical: "/photo-gallery" },
};

const chip: Record<string, string> = { sky: "bg-sky", sun: "bg-sun", pink: "bg-pink text-white", ink: "bg-ink text-cream" };

export default function PhotoGalleryPage() {
  return (
    <>
      <PageHero
        tone="sky"
        eyebrow="Take a peek inside"
        title="Photo Gallery"
        lede={<p>Slides, castles, ball pits and party rooms. Here’s what’s waiting for your kids at Funland.</p>}
        photos={[photos.hall2, photos.toddlerCorner, photos.interactive6]}
      />

      <section aria-labelledby="albums-title" className="wrap py-[clamp(4rem,8vw,7rem)]">
        <SectionHeading id="albums-title" eyebrow="Albums" title="Pick an album" />
        <Reveal className="mt-10 grid gap-6 sm:grid-cols-2" stagger={0.1} effect="pop">
          {albums.map((a) => (
            <TransitionLink key={a.slug} href={`/photo-gallery/${a.slug}`} data-tilt className="group sticker-lg block overflow-hidden bg-cloud">
              <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-ink">
                <Image src={a.cover.src} alt={a.cover.alt} fill sizes="(min-width: 640px) 46vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className={`absolute left-4 top-4 rounded-full border-[2.5px] border-ink px-3 py-1 font-display text-sm font-semibold ${chip[a.tone]}`}>
                  {a.photos.length} photos
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <h2 className="font-display text-[1.8rem] leading-tight">{a.title}</h2>
                  <p className="mt-1 text-ink-soft">{a.blurb}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-sun transition-transform group-hover:-rotate-12">
                  <ArrowIcon />
                </span>
              </div>
            </TransitionLink>
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="around-title" className="wrap pb-[clamp(2rem,5vw,4rem)]">
        <SectionHeading id="around-title" eyebrow="Around Funland" title="The play hall & café" />
        <div className="mt-6">
          <AlbumNav />
        </div>
        <div className="mt-10">
          <Gallery photos={aroundFunland} />
        </div>
      </section>

      <CtaBand tone="pink" eyebrow="Seeing is believing" title="Come play with us!">
        <ButtonLink href="/drop-in-play" variant="sun">
          Drop in Play
        </ButtonLink>
        <ButtonLink href="/party-packages-and-rates" variant="cream">
          Party Packages
        </ButtonLink>
      </CtaBand>
    </>
  );
}
