import type { MetadataRoute } from "next"
import { SITE_DESCRIPTION } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WojakCoin (WJK) — Official Wojak Coin & Wojakcoin 2017",
    short_name: "WojakCoin",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0b14",
    theme_color: "#0a0b14",
    categories: ["finance"],
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  }
}
