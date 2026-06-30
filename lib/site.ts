/** Canonical site URL for SEO (metadata, sitemap, JSON-LD). Override in production via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wojakcoin.cash"

export const SITE_NAME = "WojakCoin"

/** Primary SEO description — natural mentions of Wojak / Wojakcoin for discovery. */
export const SITE_DESCRIPTION =
  "Official Wojak coin & Wojakcoin 2017 (WJK): peer-to-peer Wojak cryptocurrency since 2017 — open source and community-run. Wallets, mining pools, exchanges, specs, roadmap, and community resources."
