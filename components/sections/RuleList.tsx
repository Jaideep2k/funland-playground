import { Reveal } from "@/components/motion/Reveal";

const chips = ["bg-pink text-white", "bg-sun", "bg-sky"];

/** Numbered rules as a tidy two-column list with coloured number bubbles. */
export function RuleList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <Reveal as="ol" className={`grid gap-x-8 gap-y-4 md:grid-cols-2 ${className}`} stagger={0.05}>
      {items.map((r, i) => (
        <li key={r} className="flex gap-4 rounded-2xl border-2 border-dashed border-ink/20 bg-cloud/70 p-4">
          <span
            aria-hidden
            className={`num grid size-9 shrink-0 place-items-center rounded-full border-[2.5px] border-ink font-display font-semibold ${chips[i % 3]}`}
          >
            {i + 1}
          </span>
          <span className="pt-1 leading-relaxed text-ink-soft">{r}</span>
        </li>
      ))}
    </Reveal>
  );
}
