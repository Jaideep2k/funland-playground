import { decor, photos, type Photo } from "@/content/photos";
import type { Tone } from "@/content/parties";

export type Album = {
  slug: string;
  title: string;
  blurb: string;
  tone: Tone;
  cover: Photo;
  photos: Photo[];
};

export const albums: Album[] = [
  {
    slug: "play-structure",
    title: "Play Structure",
    blurb: "Slides, rope bridges, net floors and a ball pit, all wrapped in a giant castle.",
    tone: "sky",
    cover: photos.hall2,
    photos: [
      photos.ballPit,
      photos.steppingPads,
      photos.doubleSlide,
      photos.upperDeck,
      photos.netFloor,
      photos.climbTower,
      photos.ropeBridge,
      photos.playDeck,
      photos.tubeSlide,
      photos.carousel,
      photos.ballPitTall,
      photos.hall3,
    ],
  },
  {
    slug: "toddler-area",
    title: "Toddler Area",
    blurb: "A safe, cozy corner just for our littlest guests.",
    tone: "sun",
    cover: photos.toddlerCastle,
    photos: [photos.toddlerCastle, photos.toddlerCorner, photos.toddlerCard, photos.toddlerBlocks],
  },
  {
    slug: "party-rooms",
    title: "Party Rooms",
    blurb: "Three spacious party rooms for celebrations of every size.",
    tone: "pink",
    cover: photos.tulip,
    photos: [photos.lavender, photos.lilium, photos.tulip, decor[0], decor[13], decor[14], decor[5], decor[24], decor[26]],
  },
  {
    slug: "interactive-play",
    title: "Interactive Play",
    blurb: "Pretend markets, marble runs and games that keep curious minds busy.",
    tone: "ink",
    cover: photos.interactive6,
    photos: [
      photos.interactive1,
      photos.interactive2,
      photos.interactive3,
      photos.interactive4,
      photos.interactive5,
      photos.interactive6,
      photos.interactive7,
    ],
  },
];

/** The photos on the old gallery landing page. */
export const aroundFunland: Photo[] = [photos.hall1, photos.hall2, photos.hall3, photos.cafe, photos.cubbies];

export function getAlbum(slug: string) {
  return albums.find((a) => a.slug === slug);
}
