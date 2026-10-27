export type Tone = "sky" | "sun" | "pink" | "ink";

export type PartyPackage = {
  name: string;
  price: number;
  tone: Tone;
  children: number;
  adults: number;
  pizzas: string;
  pizzaNote: string;
  juiceBoxes: number;
  cutlery: number;
};

export const packages: PartyPackage[] = [
  {
    name: "Basic",
    price: 449,
    tone: "sky",
    children: 10,
    adults: 10,
    pizzas: "1 Party size",
    pizzaNote: "Each party size contains 24 small square slices",
    juiceBoxes: 10,
    cutlery: 20,
  },
  {
    name: "Deluxe",
    price: 569,
    tone: "sun",
    children: 15,
    adults: 15,
    pizzas: "1 Party size + 1 Large size",
    pizzaNote: "Each party pizza contains 24 small square slices and each large pizza contains 8 regular slices",
    juiceBoxes: 15,
    cutlery: 30,
  },
  {
    name: "Supreme",
    price: 669,
    tone: "pink",
    children: 20,
    adults: 20,
    pizzas: "2 Party size",
    pizzaNote: "Each party pizza contains 24 small square slices",
    juiceBoxes: 20,
    cutlery: 40,
  },
  {
    name: "Extreme",
    price: 829,
    tone: "ink",
    children: 30,
    adults: 30,
    pizzas: "3 Party size",
    pizzaNote: "Each party pizza contains 24 small square slices",
    juiceBoxes: 30,
    cutlery: 60,
  },
];

/** Listed on every package on the old site; shown once here. */
export const everyPackageIncludes = [
  { label: "Tea / Coffee", value: "Unlimited" },
  { label: "Time in Party Room", value: "2.5 Hours", note: "Includes play time" },
  { label: "E-invitation", value: "Included" },
  { label: "Set Up & Clean Up", value: "Yes" },
  { label: "Table covers", value: "Yes", note: "Choose from available colours" },
  { label: "1 complimentary letter sized picture", value: "Included", note: "Please inquire for more details" },
];

export const extraGuests = { child: 15.99, adult: 7.99 };

export const timeSlots = [
  { slot: "Time Slot 1", times: ["9:30am – 12:00pm"], weekendDeal: true },
  { slot: "Time Slot 2", times: ["12:30pm – 3:00pm"], weekendDeal: false },
  { slot: "Time Slot 3", times: ["3:30pm – 6:00pm"], weekendDeal: false },
  { slot: "Time Slot 4", times: ["6:00pm – 8:30pm", "6:30pm – 9:00pm"], weekendDeal: true },
];

export const slotNotes = [
  "Weekend parties booked for time slots 1 and 4 get an additional 10% discount.",
  "Special offers cannot be clubbed with any other promotion.",
  "Weekend rates will apply on PA days and Stat Holidays.",
  "If you plan to bring additional guests beyond the package limit, please call/email us in advance to discuss your arrangements and confirm whether we can accommodate them.",
  "All prices exclude taxes.",
];

export const limitedOffer = {
  eyebrow: "Limited time offer",
  title: "+30 Minutes of FREE Play!",
  body: "Now enjoy 30 additional minutes of play time (without the party room) at no extra cost.",
  fine: "Offer valid on select time slots for parties booked between October 20 and October 31. Your party can be on any date.",
};

export const weekdaySpecial = {
  badge: "20% OFF",
  eyebrow: "Weekday party special",
  title: "Save 20% on Weekday Parties!",
  body: "Celebrate Monday to Friday and enjoy 20% off your party package.",
};

export const lastMinuteOffer = {
  eyebrow: "Special offer",
  title: "Planning a last-minute birthday celebration for your child?",
  body: "Funland may be able to help! Contact us by phone or email for availability and special pricing!",
};

export const partyRules = [
  "If you wish to arrive earlier than the scheduled party time to set up, kindly call us a day before the party to check if we can accommodate an early set-up time.",
  "All regular parties are 2.5 hours in the party room and play area.",
  "Outside food is welcome as long as it is nut/peanut-free, has no strong aroma, and is easy to manage and clean if any spills occur.",
  "All food must be PEANUTS/NUTS FREE.",
  "A non-refundable deposit is required to book the slot. The deposit amount depends on the type of booking.",
  "No decorations are allowed to be stapled/pasted/taped to the walls.",
  "Pinata, confetti balloons and string spray are not allowed.",
  "Changes to party packages or pizza orders, if any, must be made no later than 4 days prior to the event.",
];

/** The site-wide popup (Popup Maker #4224 "weekend-private-party-special" on the old site). */
export const weekendSpecial = {
  id: "weekend-private-party-special",
  title: "3 Hour Weekend Private Party Special!",
  decorUpTo: "$400",
  decorLabel: "Custom decor included",
  urgency: "Offer ending in 2 weeks!",
  facts: ["Entire facility", "3 hours", "Up to 140 guests"],
  price: "$1,999 + HST",
  cta: "Enquire now",
  footnote: "Sample decor setups. Every design is personalized to your theme.",
};
