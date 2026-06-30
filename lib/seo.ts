import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
}

export function pageMetadata(opts: {
  path: string
  title: string
  description: string
  keywords?: string[]
}): Metadata {
  const url = `${SITE_URL}${opts.path}`
  const fullTitle = `${opts.title} | WojakCoin`
  const ogImage = {
    ...OG_IMAGE,
    alt: `${opts.title} — WojakCoin (WJK), Wojak coin & Wojakcoin 2017`,
  }
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "WojakCoin",
      title: fullTitle,
      description: opts.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: ["/og-image.png"],
      creator: "@wojakcoin2017",
      site: "@wojakcoin2017",
    },
    keywords: [
      "WojakCoin",
      "Wojakcoin",
      "wojak coin",
      "Wojak coin",
      "wojakcoin 2017",
      "Wojakcoin 2017",
      "Wojak",
      "WJK",
      opts.title.toLowerCase(),
      ...(opts.keywords ?? []),
    ],
  }
}
