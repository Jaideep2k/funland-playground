import Image from "next/image";
import type { Photo } from "@/content/photos";
import { Reveal } from "@/components/motion/Reveal";

const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

/** A pinned-up row of sticker photos. Six on wide screens, four on tablets, three on phones. */
export function PhotoStrip({ photos }: { photos: Photo[] }) {
  return (
    <section aria-label="Party photos" className="wrap py-[clamp(2rem,4vw,3.5rem)]">
      <Reveal className="grid grid-cols-3 gap-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6" stagger={0.06}>
        {photos.slice(0, 6).map((p, i) => (
          <div
            key={p.src}
            className={`rounded-[1.1rem] border-[3px] border-ink bg-cloud p-1.5 shadow-[var(--shadow-sticker)] ${tilts[i % tilts.length]} ${i >= 4 ? "max-lg:hidden" : i >= 3 ? "max-md:hidden" : ""}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              sizes="(min-width: 1024px) 15vw, (min-width: 768px) 22vw, 30vw"
              className="aspect-[4/5] w-full rounded-[0.75rem] object-cover"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
