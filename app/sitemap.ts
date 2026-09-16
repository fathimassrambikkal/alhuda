import type { MetadataRoute } from "next";

const baseUrl = "https://www.alhudaqa.com";
const routes = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/products", priority: 0.9 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    entries.push({
      url: `${baseUrl}/en${route.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.path}`,
          ar: `${baseUrl}/ar${route.path}`,
        },
      },
    });
    entries.push({
      url: `${baseUrl}/ar${route.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route.priority,
      alternates: {
        languages: {
    en: `${baseUrl}/en${route.path}`,
    ar: `${baseUrl}/ar${route.path}`,
    "x-default": `${baseUrl}/en${route.path}`,
  },
      },
    });
  }

  return entries;
}