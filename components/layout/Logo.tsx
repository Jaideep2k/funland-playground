import Image from "next/image";

/** The Funland logo, rendered from the vector artwork on the invitation card. */
export function Logo({ className = "", priority = false, sizes = "180px" }: { className?: string; priority?: boolean; sizes?: string }) {
  return (
    <Image
      src="/images/brand/funland-logo.webp"
      alt="Funland Indoor Playground"
      width={1582}
      height={975}
      priority={priority}
      sizes={sizes}
      className={`h-auto ${className}`}
    />
  );
}
