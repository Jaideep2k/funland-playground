import { albums } from "@/content/gallery";
import { TransitionLink } from "@/components/motion/Transition";

const dot: Record<string, string> = { sky: "bg-sky", sun: "bg-sun", pink: "bg-pink", ink: "bg-ink" };

/** Album pills, so every gallery page links to every other one. */
export function AlbumNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Photo albums" className="flex flex-wrap gap-2.5">
      <TransitionLink
        href="/photo-gallery"
        aria-current={!current ? "page" : undefined}
        className="rounded-full border-[2.5px] border-ink bg-cloud px-4 py-2 font-display font-semibold shadow-[2px_3px_0_0_var(--color-ink)] transition-colors hover:bg-sun-soft aria-[current=page]:bg-ink aria-[current=page]:text-cream"
      >
        All photos
      </TransitionLink>
      {albums.map((a) => (
        <TransitionLink
          key={a.slug}
          href={`/photo-gallery/${a.slug}`}
          aria-current={current === a.slug ? "page" : undefined}
          className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-cloud px-4 py-2 font-display font-semibold shadow-[2px_3px_0_0_var(--color-ink)] transition-colors hover:bg-sun-soft aria-[current=page]:bg-ink aria-[current=page]:text-cream"
        >
          <span aria-hidden className={`size-3 rounded-full border-2 border-ink ${dot[a.tone]}`} />
          {a.title}
        </TransitionLink>
      ))}
    </nav>
  );
}
