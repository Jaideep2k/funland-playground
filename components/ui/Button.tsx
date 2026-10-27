import type { ComponentProps, ReactNode } from "react";
import { TransitionLink } from "@/components/motion/Transition";
import { ArrowIcon } from "@/components/ui/Icons";

export type ButtonVariant = "pink" | "sun" | "sky" | "ink" | "cream" | "ghost";

const variants: Record<ButtonVariant, string> = {
  pink: "bg-pink text-white",
  sun: "bg-sun text-ink",
  sky: "bg-sky-deep text-white",
  ink: "bg-ink text-cream",
  cream: "bg-cloud text-ink",
  ghost: "bg-transparent text-ink",
};

/**
 * Chunky sticker button: indigo outline + hard shadow like the logo.
 * It lifts on hover and presses flat on click.
 */
export function buttonClass(variant: ButtonVariant = "pink", extra = "") {
  return [
    "group relative inline-flex min-h-12 select-none items-center justify-center gap-2.5 rounded-full border-[3px] border-ink px-6 py-2.5",
    "font-display text-[1.02rem] font-semibold leading-none tracking-[0.005em]",
    "shadow-[var(--shadow-sticker)] transition-[transform,box-shadow,background-color] duration-200 ease-[var(--ease-out)]",
    "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_7px_0_0_var(--color-ink)]",
    "active:translate-x-[3px] active:translate-y-[4px] active:shadow-[0_0_0_0_var(--color-ink)]",
    variants[variant],
    extra,
  ].join(" ");
}

type LinkButtonProps = Omit<ComponentProps<typeof TransitionLink>, "className"> & {
  variant?: ButtonVariant;
  className?: string;
  icon?: ReactNode | false;
  children: ReactNode;
};

export function ButtonLink({ variant = "pink", className = "", icon, children, ...props }: LinkButtonProps) {
  return (
    <TransitionLink data-magnetic className={buttonClass(variant, className)} {...props}>
      <span>{children}</span>
      {icon === false ? null : (icon ?? <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />)}
    </TransitionLink>
  );
}

/** For tel:, mailto: and downloads, which must not go through the page curtain. */
export function ButtonAnchor({
  variant = "pink",
  className = "",
  icon,
  children,
  ...props
}: Omit<ComponentProps<"a">, "className"> & { variant?: ButtonVariant; className?: string; icon?: ReactNode | false }) {
  return (
    <a data-magnetic className={buttonClass(variant, className)} {...props}>
      {icon ? icon : null}
      <span>{children}</span>
    </a>
  );
}

export const toneBg: Record<string, string> = {
  pink: "bg-pink text-white",
  sun: "bg-sun text-ink",
  sky: "bg-sky text-ink",
  ink: "bg-ink text-cream",
};

export const toneSoft: Record<string, string> = {
  pink: "bg-pink-soft",
  sun: "bg-sun-soft",
  sky: "bg-sky-soft",
  ink: "bg-[#e6e5f4]",
};
