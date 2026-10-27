import type { ReactNode } from "react";
import { Reveal, SplitHeading } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  eyebrowColor = "text-pink",
  className = "",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  eyebrowColor?: string;
  className?: string;
  id?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow ? (
        <Reveal as="p" className={`eyebrow ${eyebrowColor}`} y={12}>
          {eyebrow}
        </Reveal>
      ) : null}
      <SplitHeading id={id} className="mt-3 font-display text-title text-ink">
        {title}
      </SplitHeading>
      {lede ? (
        <Reveal as="div" className={`mt-5 text-lede text-ink-soft ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`} delay={0.1}>
          {lede}
        </Reveal>
      ) : null}
    </div>
  );
}
