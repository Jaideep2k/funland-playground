import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { albums, getAlbum } from "@/content/gallery";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/gallery/Gallery";
import { AlbumNav } from "@/components/gallery/AlbumNav";
import { ButtonLink } from "@/components/ui/Button";

type Params = { params: Promise<{ album: string }> };

export function generateStaticParams() {
  return albums.map((a) => ({ album: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const album = getAlbum((await params).album);
  if (!album) return {};
  return {
    title: album.title,
    description: `${album.title} photos at Funland Indoor Playground in Markham. ${album.blurb}`,
    alternates: { canonical: `/photo-gallery/${album.slug}` },
  };
}

export default async function AlbumPage({ params }: Params) {
  const album = getAlbum((await params).album);
  if (!album) notFound();

  const isParty = album.slug === "party-rooms";
  return (
    <>
      <PageHero tone={album.tone} eyebrow="Photo Gallery" title={album.title} lede={<p>{album.blurb}</p>} photos={album.photos.slice(0, 3)} />
      <section className="wrap py-[clamp(3rem,6vw,5rem)]">
        <AlbumNav current={album.slug} />
        <div className="mt-10">
          <Gallery photos={album.photos} />
        </div>
      </section>
      <CtaBand
        tone={isParty ? "pink" : "sun"}
        eyebrow={isParty ? "Celebrate here" : "Come play"}
        title={isParty ? "Book Your Party Now!" : "Let the fun begin!"}
      >
        {isParty ? (
          <ButtonLink href="/party-packages-and-rates" variant="sun">
            Party Packages
          </ButtonLink>
        ) : (
          <ButtonLink href="/drop-in-play" variant="pink">
            Drop in Play
          </ButtonLink>
        )}
        <ButtonLink href="/contact" variant="cream">
          Contact
        </ButtonLink>
      </CtaBand>
    </>
  );
}
