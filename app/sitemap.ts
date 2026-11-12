import type { MetadataRoute } from "next";
import { POST_DATE, POST_SLUG } from "@/content/posts";
import { PROJECTS } from "@/content/projects";

const BASE = "https://jimmysam.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/writing/${POST_SLUG}`, lastModified: POST_DATE, priority: 0.8 },
    ...PROJECTS.map((p) => ({ url: `${BASE}/project/${p.slug}`, priority: 0.6 })),
  ];
}
