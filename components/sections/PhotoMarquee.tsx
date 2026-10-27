import Image from "next/image";
import type { Photo } from "@/content/photos";
import { Marquee } from "@/components/motion/Marquee";

const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2"];

/** A drifting row of sticker photos. */
export function PhotoMarquee({ photos, speed = 60, reverse = false }: { photos: Photo[]; speed?: number; reverse?: boolean }) {
  return (
    <Marquee speed={speed} reverse={reverse} className="py-6">
      {photos.map((p, i) => (
        <div
          key={p.src}
          className={`mx-3 w-[clamp(11rem,22vw,16rem)] shrink-0 rounded-[1.2rem] border-[3px] border-ink bg-cloud p-1.5 shadow-[var(--shadow-sticker)] ${tilts[i % tilts.length]}`}
        >
          <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="16rem" className="aspect-[4/5] w-full rounded-[0.85rem] object-cover" />
        </div>
      ))}
    </Marquee>
  );
}
