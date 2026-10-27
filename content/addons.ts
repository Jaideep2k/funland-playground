import { photos, type Photo } from "@/content/photos";
import type { Tone } from "@/content/parties";

export const addons: { title: string; hook: string; body: string; photo: Photo; tone: Tone }[] = [
  {
    title: "Custom Designer Cakes",
    hook: "No Celebration is complete Without a Cake!",
    body: "Our custom designer cakes make every occasion sweeter.",
    photo: photos.cake,
    tone: "pink",
  },
  {
    title: "Face Painting",
    hook: "Unleash the Magic!",
    body: "Add a burst of color and creativity to your party with our face painting services.",
    photo: { src: "/images/addons/face-painting.jpg", w: 1450, h: 466, alt: "A smiling girl with a painted face and painted hands" },
    tone: "sky",
  },
  {
    title: "Loot Bags",
    hook: "Delight the kids!",
    body: "Loot bags featuring two high-quality, STEM-based toys. Special pricing available for party bookings.",
    photo: photos.lootBags,
    tone: "sun",
  },
  {
    title: "Character/Mascot Visits",
    hook: "Bring the Magic to Life!",
    body: "Surprise your little one with a visit from their favorite character/mascot for unforgettable memories.",
    photo: photos.addonsCard,
    tone: "ink",
  },
];

export const addonNotes = [
  "All Add-ons are subject to availability.",
  "Advance booking of at least 1 week is required.",
];
