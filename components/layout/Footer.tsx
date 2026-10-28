import { addressOneLine, business, formatTime, hours, hoursNote, nav } from "@/content/site";
import { TransitionLink } from "@/components/motion/Transition";
import { Logo } from "@/components/layout/Logo";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { DownloadIcon, FacebookIcon, InstagramIcon, MailIcon, PenIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { Sparkle, Star, Wave } from "@/components/ui/Shapes";
import { FooterMotion } from "@/components/layout/FooterMotion";

export function Footer() {
  return (
    <footer className="relative mt-[clamp(4rem,8vw,7rem)] text-cream">
      <Wave fill="var(--color-ink)" />
      <FooterMotion>
        <div className="relative overflow-hidden bg-ink pb-28 md:pb-12">
          <Star data-float className="pointer-events-none absolute right-[6%] top-10 hidden w-20 md:block" />
          <Sparkle data-float fill="var(--color-sky)" className="pointer-events-none absolute left-[46%] top-24 hidden w-10 md:block" />

          <div className="wrap pt-6">
            {/* Statement */}
            <div className="flex flex-col items-start justify-between gap-8 border-b-2 border-dashed border-white/15 pb-12 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow text-sun">Come play with us</p>
                <p data-footer-title className="mt-3 font-display font-display-heavy text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9]">
                  Let the fun <span className="text-pink-bright">begin!</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/party-packages-and-rates" variant="pink">
                  Book a Party
                </ButtonLink>
                <ButtonLink href="/waiver" variant="sun" icon={<PenIcon />}>
                  Sign the Waiver
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
              <div className="max-w-sm">
                <div className="w-44 rounded-[1.5rem] bg-cream p-3">
                  <Logo sizes="176px" />
                </div>
                <p className="mt-5 text-cream/80">
                  {business.tagline} Rain or shine, the fun never stops for kids ages {business.ages}.
                </p>
                <div className="mt-5 flex gap-2">
                  <Social href={business.socials.facebook} label="Funland on Facebook">
                    <FacebookIcon />
                  </Social>
                  <Social href={business.socials.instagram} label="Funland on Instagram">
                    <InstagramIcon />
                  </Social>
                </div>
              </div>

              <div>
                <h2 className="eyebrow text-sky">Hours of operation</h2>
                <ul className="mt-4 space-y-3">
                  {hours.map((h) => (
                    <li key={h.days}>
                      <span className="block font-display text-lg font-semibold">{h.days}</span>
                      <span className="num text-cream/80">
                        {formatTime(h.open)} – {formatTime(h.close)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-cream/60">{hoursNote}</p>
              </div>

              <div>
                <h2 className="eyebrow text-pink-bright">Contact</h2>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex gap-3">
                      <PinIcon className="mt-0.5 shrink-0 text-sun" />
                      <span className="link-underline">
                        {business.address.line1}
                        <br />
                        {business.address.city}, {business.address.region} {business.address.postal}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={business.phoneHref} className="group flex items-center gap-3">
                      <PhoneIcon className="shrink-0 text-sun" />
                      <span className="link-underline font-display text-lg font-semibold">{business.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${business.email}`} className="group flex items-center gap-3">
                      <MailIcon className="shrink-0 text-sun" />
                      <span className="link-underline break-all">{business.email}</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="eyebrow text-sun">Explore</h2>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
                  {nav.map((n) => (
                    <li key={n.href}>
                      <TransitionLink href={n.href} className="group inline-block py-0.5">
                        <span className="link-underline">{n.label}</span>
                      </TransitionLink>
                    </li>
                  ))}
                  {[
                    { href: "/waiver", label: "Sign the Waiver" },
                    { href: "/menu", label: "Catering Menu" },
                    { href: "/upcoming-events", label: "Upcoming Events" },
                  ].map((l) => (
                    <li key={l.href}>
                      <TransitionLink href={l.href} className="group inline-block py-0.5">
                        <span className="link-underline">{l.label}</span>
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
                <ButtonAnchor
                  href="/downloads/funland-invitation-card.pdf"
                  download
                  variant="cream"
                  className="mt-6 min-h-11 px-4 text-[0.92rem]"
                  icon={<DownloadIcon width={18} height={18} />}
                >
                  Invitation Card
                </ButtonAnchor>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-white/15 pt-8">
              <p className="text-sm text-cream/60">Families visit us from</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {business.serving.map((c) => (
                  <li key={c} className="rounded-full border border-white/20 px-3 py-1 text-sm text-cream/85">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col justify-between gap-3 text-sm text-cream/60 md:flex-row">
                <p>© Copyright {new Date().getFullYear()} - Funland Indoor Playground</p>
                <p>{addressOneLine}</p>
              </div>
            </div>
          </div>
        </div>
      </FooterMotion>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-magnetic
      className="grid size-12 place-items-center rounded-full border-2 border-cream/30 transition-colors hover:border-sun hover:bg-sun hover:text-ink"
    >
      {children}
    </a>
  );
}
