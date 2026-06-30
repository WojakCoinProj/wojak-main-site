import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "WojakCoin (WJK) — Official Wojak Coin & Wojakcoin 2017 | Wallets, Pools, Exchanges",
    template: "%s | WojakCoin",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "WojakCoin",
    "Wojakcoin",
    "wojak coin",
    "Wojak coin",
    "wojakcoin 2017",
    "Wojakcoin 2017",
    "wojakcoin2017",
    "Wojak",
    "wojak cryptocurrency",
    "wojak meme coin",
    "WJK",
    "WJK coin",
    "wojakcoin official",
    "wojakcoin2017.xyz",
    "wojakcoin.cash",
    "buy Wojakcoin",
    "mine Wojakcoin",
    "WojakCoin wallet",
    "WojakCoin exchange",
    "peer to peer cryptocurrency",
    "meme coin",
    "fair launch crypto",
  ],
  authors: [{ name: "WojakCoin", url: SITE_URL }],
  creator: "WojakCoin",
  publisher: "WojakCoin",
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
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  icons: {
    icon: [
      { url: "/wojak-logo.png", sizes: "any" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/wojak-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "WojakCoin (WJK) — Wojak Coin & Wojakcoin 2017 | Official Site",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WojakCoin (WJK) — Wojak coin & Wojakcoin 2017, peer-to-peer cryptocurrency since 2017",
        type: "image/png",
      },
      {
        url: "/wojak-logo.png",
        width: 512,
        height: 512,
        alt: "WojakCoin (WJK) official logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "WojakCoin (WJK) — Wojak Coin & Wojakcoin 2017",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@wojakcoin2017",
    site: "@wojakcoin2017",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "cryptocurrency",
}

export const viewport: Viewport = {
  themeColor: "#0a0b14",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [
          "Wojakcoin",
          "Wojak Coin",
          "wojak coin",
          "Wojakcoin 2017",
          "wojakcoin 2017",
          "WJK",
          "Wojak cryptocurrency",
          "Wojak meme coin",
        ],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/wojak-logo.png`,
        },
        description: SITE_DESCRIPTION,
        foundingDate: "2017",
        slogan: "Peer-to-peer Wojak cryptocurrency since 2017",
        knowsAbout: [
          "WojakCoin",
          "Wojak cryptocurrency",
          "Proof of Work mining",
          "SHA-256",
          "wWojakcoin bridge",
          "Base (Ethereum L2)",
        ],
        sameAs: [
          "https://wojakcoin2017.xyz",
          "https://wojakcoin.cash",
          "https://x.com/wojakcoin2017",
          "https://t.me/Wojak_Portal",
          "https://discord.gg/TKQFCwGDgU",
          "https://github.com/WojakCoinProj/wojakcore",
          "https://explorer.wojakcoin.cash",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: [
          "Wojakcoin",
          "Wojak coin",
          "wojak coin",
          "Wojakcoin 2017",
          "wojakcoin 2017",
          "WJK",
          "Wojak crypto",
        ],
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  }

  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
