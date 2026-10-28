# Funland Indoor Playground

Rebrand of [funlandplayground.ca](https://funlandplayground.ca). Same pages, same menu, same popup and the same
copy, prices and photos as the WordPress site, with a new design.

Next.js 16 (App Router) · Tailwind CSS 4 · GSAP (ScrollTrigger, SplitText, Flip, DrawSVG) · Lenis

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Deploys

The Vercel project `funland-playground` is connected to this repo: every push to `main` deploys to
https://funland-playground.vercel.app, and other branches get their own preview URLs.

## Brand

| | |
| --- | --- |
| Logo | `public/images/brand/funland-logo.svg` is a vector copy lifted from the invitation-card PDF; the `.webp`/`.png` are renders of it |
| Colours | The logo's triad at a softer, lower chroma, raspberry pink `#c44673`, butter `#fbcb67` and sky `#5cb5ea`, on cream `#fef8f0`, with the logo's indigo outline `#252854` as the ink |
| Type | Grandstander (headings and buttons), Rethink Sans (body) and Mansalva (the hand-written note in each hero), all from Google Fonts via `next/font` |
| Motion | The home hero keeps the full show (loader, sticker burst, parallax). Below it everything reveals once, briefly, and nothing scroll-locks or drifts with the scroll |
| Motif | The indigo outline around the logo becomes "sticker" cards and buttons with a solid offset shadow |

## Pages (old URL → new URL)

| Old | New |
| --- | --- |
| `/` | `/` loader, hero, welcome, what we offer, party wall, invitation card, waiver, hours and map |
| `/party-packages-and-rates/` | same |
| `/private-parties-2/` | `/private-parties` (the old address redirects) |
| `/drop-in-play/` | same |
| `/add-ons/` | same |
| `/waiver-rules/` | same |
| `/waiver/` | same, the online waiver form |
| `/photo-gallery/` and its four albums | same |
| `/contact/` | same |
| `/menu/` (catering menu, not in the old menu) | same, linked from the footer, Party Packages and Add-ons |
| `/upcoming-events/` (not in the old menu) | same, linked from the footer |
| `/thank-you/` | same |

The weekend private-party popup works as before: it opens 5 seconds after landing on the home page, and once it is
closed it stays away for a week. Its content lives in `weekendSpecial` in `content/parties.ts`.

## Editing content

| What | Where |
| --- | --- |
| Phone, email, address, hours, socials, menu | `content/site.ts` |
| Party packages, time slots, specials, party rules, popup | `content/parties.ts` |
| Drop-in rates and memberships | `content/play.ts` |
| Add-ons | `content/addons.ts` |
| Waiver wording and playground rules (legal: change only with the owner's sign-off) | `content/waiver.ts` |
| Gallery albums | `content/gallery.ts` |
| Photos and alt text | `content/photos.ts` |

## Forms: not connected yet

The contact form, newsletter sign-up and waiver all post to `/api/contact`, `/api/newsletter` and `/api/waiver`.
Those routes validate the data and reply "ok", **but nothing is emailed or stored yet**. Visitors see a success
message, so connect `deliver()` in `lib/forms.ts` before this goes live (for example Resend for enquiries, Mailchimp
for the newsletter, and a database or e-signature service for waivers, which include a PNG of the signature).

## Preview vs. live

Without `NEXT_PUBLIC_SITE_URL` the site is a preview: every page is marked `noindex` and `robots.txt` blocks
crawlers. When it moves to the real domain, set `NEXT_PUBLIC_SITE_URL=https://funlandplayground.ca` in Vercel and
redeploy.

## Images

- `_source-assets/` (local only, not committed) holds every original file downloaded from the live site.
- `public/images/` holds the renamed copies the site uses. `decor/` photos were cut out of the old slider banners.
- `public/downloads/funland-invitation-card.pdf` is the original invitation card.
