export type Photo = { src: string; w: number; h: number; alt: string };

const p = (src: string, w: number, h: number, alt: string): Photo => ({ src: `/images/${src}`, w, h, alt });

export const photos = {
  // Play structure
  hall1: p("play/hall-1.jpg", 1300, 867, "The Funland play hall with its castle play structure and café seating"),
  hall2: p("play/hall-2.jpg", 1300, 867, "Castle play structure towering over the seating area at Funland"),
  hall3: p("play/hall-3.jpg", 1300, 867, "Wide view of the play structure, slides and parent seating"),
  ballPit: p("play/ball-pit.jpg", 1300, 975, "Ball pit full of red, yellow and white balls under a red tube slide"),
  ballPitTall: p("play/ball-pit-tall.jpg", 733, 1030, "Ball pit with a red tube slide dropping in"),
  doubleSlide: p("play/double-slide.jpg", 1300, 975, "Side-by-side yellow and red wave slides"),
  steppingPads: p("play/stepping-pads.jpg", 975, 1300, "Colourful stepping pads inside the play structure"),
  upperDeck: p("play/upper-deck.jpg", 975, 1300, "Upper deck of the play structure with padded walls"),
  netFloor: p("play/net-floor.jpg", 1300, 975, "Net floor high up in the play structure"),
  climbTower: p("play/climb-tower.jpg", 975, 1300, "Padded climbing steps inside the tower"),
  ropeBridge: p("play/rope-bridge.jpg", 975, 1300, "Rope bridge crossing between towers"),
  playDeck: p("play/play-deck.jpg", 1300, 975, "Play deck with stepping pads and a padded ramp"),
  tubeSlide: p("play/tube-slide.jpg", 1300, 975, "Looking down the inside of a yellow tube slide"),
  cubbies: p("play/cubbies.jpg", 1300, 975, "Shoe cubbies and coat hooks at the entrance"),
  carousel: p("play/carousel-castle.jpg", 733, 1031, "Carousel ride in front of the castle play structure"),
  toddlerBlocks: p("play/toddler-blocks-wide.jpg", 1300, 450, "Soft number blocks in the toddler area"),
  cafe: p("play/cafe.jpg", 1200, 800, "The Funland café counter with snacks and drinks"),
  playCard: p("play/play-structure-card.webp", 450, 300, "Families relaxing beside the castle play structure"),
  // Toddler
  toddlerCastle: p("toddler/toddler-castle.jpg", 1200, 900, "Toddler area with a stone arch, soft slide and fairy-tale cut-outs"),
  toddlerCorner: p("toddler/toddler-corner.jpg", 900, 1200, "Soft play shapes and a mini slide in the toddler area"),
  toddlerCard: p("toddler/toddler-area-card.webp", 450, 300, "The toddler area with a ride-on train and soft trees"),
  // Interactive
  interactive1: p("interactive/interactive-1.jpg", 900, 1200, "Interactive ball-toss game"),
  interactive2: p("interactive/interactive-2.jpg", 1200, 675, "Pretend market with a play cash register"),
  interactive3: p("interactive/interactive-3.jpg", 675, 1200, "Pink play cash register with a touch screen"),
  interactive4: p("interactive/interactive-4.jpg", 1200, 675, "Giant toy trees with play fruit"),
  interactive5: p("interactive/interactive-5.jpg", 1200, 900, "Space-themed marble run wall"),
  interactive6: p("interactive/interactive-6.jpg", 1200, 675, "Pretend grocery market with candy-striped awnings"),
  interactive7: p("interactive/interactive-7.jpg", 1200, 675, "Play market stalls stocked with toy food"),
  playExplore: p("interactive/play-explore-celebrate.jpg", 450, 253, "The Play, Explore, Celebrate sign beside the pretend market"),
  // Party rooms and parties
  lavender: p("party/lavender-room.jpg", 450, 600, "The Lavender party room set with long tables"),
  lilium: p("party/lilium-room.jpg", 450, 600, "The Lilium party room with pink table covers"),
  tulip: p("party/tulip-room.jpg", 1200, 1600, "The Tulip party room with red chairs and pink tables"),
  partyCard: p("party/party-packages-card.webp", 450, 300, "Mermaid birthday balloon backdrop"),
  roomsCard: p("party/party-rooms-card.webp", 450, 300, "Pink balloon arch with butterflies in a party room"),
  privateCard: p("party/private-parties-card.webp", 450, 300, "A fairy entertains kids at a private party"),
  addonsCard: p("addons/add-ons-card.webp", 450, 300, "A princess character reads a story at a party"),
  weekend1: p("party/weekend-decor-1.jpg", 274, 381, "Pink balloon arch with a Super Mario birthday backdrop"),
  weekend2: p("party/weekend-decor-2.jpg", 274, 381, "Purple and mint balloon garland with a mermaid backdrop"),
  weekend3: p("party/weekend-decor-3.jpg", 274, 381, "Teal and pink balloon arch with a castle backdrop"),
  // Add-ons
  cake: p("addons/designer-cake.jpg", 728, 1030, "Birthday cake with sprinkles and lit candles"),
  lootBags: p("addons/loot-bags.jpg", 728, 1030, "Funland loot bag with STEM toys"),
  addonsBanner: p("addons/add-ons-banner.jpg", 1400, 450, "Party add-ons: cupcakes, food and character visits"),
  // Misc
  exterior: p("misc/exterior.jpg", 450, 450, "Funland Indoor Playground storefront on Highway 7"),
  invitation: p("misc/invitation-card.jpg", 432, 288, "Funland party invitation card"),
} satisfies Record<string, Photo>;

const decorAlts = [
  "Pink balloon arch with butterflies",
  "Purple and silver balloon wall with a happy birthday sign",
  "Party room set with long pink tables",
  "Spider-Man themed balloon backdrop",
  "Minions themed party table",
  "Little Mermaid balloon backdrop",
  "Fairy mushroom balloon arch",
  "Party room with long blue tables",
  "Spidey and friends backdrop",
  "Paw Patrol balloon backdrop",
  "Party room ready for guests",
  "Paw Patrol birthday backdrop",
  "Pink table setting for a fifth birthday",
  "Gabby's Dollhouse balloon arch",
  "Frozen fifth birthday balloon arch",
  "Frozen castle balloon backdrop",
  "Pink castle balloon arch at a private party",
  "Kids watching a show at a private party",
  "A fairy reads to kids at a private party",
  "Kids gathered for a princess show",
  "A princess entertains a group of kids",
  "Minions party setup",
  "Café tables in the play hall",
  "Spider-Man party backdrop",
  "Butterfly party room setup",
  "Building block wall",
  "Capybara themed birthday setup",
  "Space marble run wall",
  "Little Mermaid party backdrop",
  "Pretend play market",
];

const decorDims: [number, number][] = [
  [285, 384], [580, 384], [215, 387], [285, 384], [514, 384], [285, 384], [285, 384], [514, 384], [247, 382], [251, 384],
  [283, 382], [256, 384], [289, 387], [283, 382], [514, 384], [285, 384], [454, 357], [485, 357], [267, 356], [533, 357],
  [266, 357], [478, 357], [479, 357], [268, 358], [479, 358], [640, 332], [266, 357], [479, 357], [266, 357], [712, 396],
];

export const decor: Photo[] = decorDims.map(([w, h], i) =>
  p(`decor/decor-${String(i + 1).padStart(2, "0")}.jpg`, w, h, decorAlts[i]),
);

/** Party setups only (no duplicates, no plain rooms). */
export const partyDecor: Photo[] = [0, 1, 3, 5, 6, 9, 13, 14, 15, 4, 26, 24].map((i) => decor[i]);
export const privatePartyPhotos: Photo[] = [16, 17, 18, 19, 20].map((i) => decor[i]);
