import type { MetadataRoute } from "next";
import { albums } from "@/content/gallery";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/party-packages-and-rates",
    "/private-parties",
    "/drop-in-play",
    "/add-ons",
    "/waiver-rules",
    "/waiver",
    "/photo-gallery",
    ...albums.map((a) => `/photo-gallery/${a.slug}`),
    "/contact",
    "/menu",
    "/upcoming-events",
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
