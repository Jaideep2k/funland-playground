export const dropIn = {
  title: "Drop in Play",
  lede: "Looking for a fun and exciting place for your kids to play? Look no further!",
  paragraphs: [
    "Our incredible indoor playground is the perfect spot for kids to let loose and have a blast. Featuring a vibrant and engaging play structure, our playground offers endless fun for children up to 13 years of age.",
    "Our playground is open for walk-ins, no reservations needed! Simply check our Google hours and come on over.",
    "We also offer plenty of comfortable seating for adults so that you can sit back and relax while you watch over your kids, who are having a blast!",
    "Don’t miss out on the ultimate play experience. Bring your kids today and watch them light up with joy and excitement!",
  ],
};

export const playRates: { age: string; note?: string; weekday: string; weekend: string }[] = [
  { age: "12 to 36 Months", weekday: "$11.99", weekend: "$14.99" },
  { age: "Above 36 Months to 13 years", weekday: "$17.99", weekend: "$19.99" },
  { age: "Children under 12 Month", note: "With a paid sibling", weekday: "Free", weekend: "Free" },
  { age: "1 adult per child", weekday: "Free", weekend: "Free" },
  { age: "Additional adults", weekday: "$7.99", weekend: "$7.99" },
  { age: "Playtime", weekday: "3 Hours", weekend: "2.5 Hours" },
];

export const playDeal = "Buy 5 admissions and get 6 entries";
export const playDealNote = "No expiration date";

export const membership = {
  title: "FUNLAND Membership Rates",
  pass: "1 Month Pass",
  rates: [
    { label: "Children 1 to 3 Yrs", price: "$79" },
    { label: "Children 4 and above", price: "$99" },
  ],
  note: "Funland will be closed to members during private events",
};

export const playNotes = [
  "Parents/Caregivers must supervise their children at all times.",
  "No shoes or bare feet allowed. Only Socks are permitted in the play area.",
  "No strollers are allowed in the play area.",
  "Weekend rates will apply on PA days, Winter break and Stat Holidays.",
  "All prices exclude taxes.",
];
