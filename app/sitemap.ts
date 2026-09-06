import type { MetadataRoute } from "next";

const baseUrl = "https://alhudaqa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/en`,
      priority: 1,
    },
    {
      url: `${baseUrl}/ar`,
      priority: 1,
    },
    {
      url: `${baseUrl}/en/about`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/about`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/products`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/products`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/contact`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ar/contact`,
      priority: 0.7,
    },
  ];
}