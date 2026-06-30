import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

const ROUTES: {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[0]["changeFrequency"]>
  priority: number
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/wallets", changeFrequency: "monthly", priority: 0.9 },
  { path: "/bridge", changeFrequency: "weekly", priority: 0.88 },
  { path: "/wojakswap", changeFrequency: "weekly", priority: 0.9 },
  { path: "/exchanges", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pools", changeFrequency: "weekly", priority: 0.85 },
  { path: "/specs", changeFrequency: "monthly", priority: 0.85 },
  { path: "/run-a-node", changeFrequency: "monthly", priority: 0.7 },
  { path: "/whitepaper", changeFrequency: "yearly", priority: 0.85 },
  { path: "/security", changeFrequency: "monthly", priority: 0.8 },
  { path: "/community", changeFrequency: "weekly", priority: 0.8 },
  { path: "/games", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faucets", changeFrequency: "weekly", priority: 0.75 },
  { path: "/donations", changeFrequency: "monthly", priority: 0.7 },
  { path: "/logo", changeFrequency: "yearly", priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
