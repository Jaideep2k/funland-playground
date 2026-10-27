export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://funlandplayground.ca";

/* Preview builds (no NEXT_PUBLIC_SITE_URL) tell search engines to stay away, so the review copy
   never competes with the real site. Set NEXT_PUBLIC_SITE_URL when it goes live on funlandplayground.ca. */
export const IS_LIVE = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const business = {
  name: "Funland Indoor Playground",
  shortName: "Funland",
  tagline: "The best place to have fun!",
  legalName: "Ashreen Holdings Ltd",
  phone: "905-868-0888",
  phoneHref: "tel:+19058680888",
  email: "info@funlandplayground.ca",
  address: {
    line1: "5051 Highway 7 East Unit 1A",
    city: "Markham",
    region: "ON",
    postal: "L3R 1N3",
  },
  directions:
    "Situated on Highway 7, opposite Markville Shopping Centre, and just 5 minutes from the 407, Funland is easily accessible.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Funland+Indoor+Playground+5051+Highway+7+East+Unit+1A+Markham+ON",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.5448547726855!2d-79.29161474785961!3d43.865261579012056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d678878ce7f3%3A0x2e9f2ca4aaf51c90!2s5051+Hwy+7+%231A%2C+Unionville%2C+ON+L3R+1N3!5e0!3m2!1sen!2sca!4v1559655135215!5m2!1sen!2sca",
  markvilleUrl: "https://shops.cadillacfairview.com/property/cf-markville",
  socials: {
    facebook: "https://www.facebook.com/Funland-Indoor-Playground-339627396907712/",
    instagram: "https://www.instagram.com/funland_playground/",
  },
  ages: "1 to 13",
  /* Cities from the old site's tag list. */
  serving: [
    "Markham",
    "North York",
    "Pickering",
    "Whitby",
    "Ajax",
    "Stouffville",
    "Aurora",
    "Newmarket",
    "Richmond Hill",
    "Vaughan",
    "Toronto",
    "Scarborough",
  ],
};

export const addressOneLine = `${business.address.line1}, ${business.address.city}, ${business.address.region} ${business.address.postal}`;

/** Day 0 = Sunday, matching Date#getDay. Times are 24h "HH:MM". */
export const hours: { days: string; short: string; open: string; close: string; dayIdx: number[] }[] = [
  { days: "Monday – Friday", short: "Mon – Fri", open: "14:00", close: "19:00", dayIdx: [1, 2, 3, 4, 5] },
  { days: "Saturday", short: "Sat", open: "09:30", close: "19:00", dayIdx: [6] },
  { days: "Sunday", short: "Sun", open: "09:30", close: "19:00", dayIdx: [0] },
];

export const hoursNote =
  "For real-time updates and increased hours on PA days and winter/summer holidays, please check our Google hours or follow us on Instagram.";

export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${suffix}`;
}

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

/* Same items, same order, same names as the old menu so returning parents find everything. */
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Party Packages", href: "/party-packages-and-rates" },
  { label: "Private Parties", href: "/private-parties" },
  { label: "Drop in Play", href: "/drop-in-play" },
  { label: "Party Add-ons", href: "/add-ons" },
  { label: "Waiver", href: "/waiver-rules" },
  {
    label: "Photo Gallery",
    href: "/photo-gallery",
    children: [
      { label: "Play Structure", href: "/photo-gallery/play-structure" },
      { label: "Toddler Area", href: "/photo-gallery/toddler-area" },
      { label: "Party Rooms", href: "/photo-gallery/party-rooms" },
      { label: "Interactive Play", href: "/photo-gallery/interactive-play" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
