"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Wallet, Shield, Smartphone, Monitor, BookOpen } from "lucide-react"

const wallets = [
  {
    name: "WojakCore",
    url: "https://github.com/WojakCoinProj/wojakcore/releases/tag/1.12.1.0",
    description:
      "Official WojakCoin core wallet and reference implementation (latest release 1.12.1.0). Full node, desktop wallet, and source code on GitHub — Linux (x86_64 and ARM64), Windows, and macOS builds. Bridge capable — move WJK across the WJK ↔ wWojakcoin bridge to Base-ETH.",
    features: [
      "Official core",
      "Full node",
      "Desktop",
      "Bridge capable",
      "Open source",
      "GitHub",
    ],
    platforms: ["web"],
    official: true,
    buttonLabel: "View on GitHub",
    docsUrl: "/run-a-node",
    docsLabel: "How to run a node",
  },
  {
    name: "Wojak Wallet Extension",
    url: "https://chromewebstore.google.com/detail/wojak-wallet/jgepofplloabbpjnidnmkpmjdikockkb",
    description:
      "Official WojakCoin browser extension, now on the Chrome Web Store. Manage WJK, WJK-20 tokens, and inscriptions directly from your browser. Fork of the Nintondo extension. Bridge capable — pair with MetaMask to bridge WJK to wWojakcoin on Base-ETH.",
    features: [
      "Browser extension",
      "Chrome Web Store",
      "WJK-20 tokens",
      "Inscriptions",
      "Bridge capable",
      "One-click install",
    ],
    platforms: ["web"],
    official: true,
    buttonLabel: "Add to Chrome",
  },
  {
    name: "WojakCoin Web Wallet",
    url: "https://wojakcoin.cash/wallet",
    description:
      "The official WojakCoin web wallet. Send, receive, and manage your WJK directly from your browser — no downloads required. ⚠️ Note: not yet bridge compatible.",
    features: [
      "Browser-based",
      "Mobile friendly",
      "QR code scanner",
      "Address book",
      "Live price tracking",
    ],
    platforms: ["web", "mobile"],
    official: true,
  },
  {
    name: "WojakCoin Wallet",
    url: "https://github.com/WojakCoinProj/wjk-mobile-wallet/releases/tag/v1.4.2",
    description:
      "Official WojakCoin Android wallet (latest release v1.4.2). Capacitor app with multi-language UI, QR scanning, and the same feature set as the web wallet — visit the GitHub release to download the APK and send, receive, and manage WJK. Release notes and iOS build on GitHub. Bridge capable — bridge WJK to wWojakcoin on Base-ETH.",
    features: [
      "Official app",
      "Android APK",
      "Multi-language",
      "QR scanner",
      "Bridge capable",
      "GitHub releases",
    ],
    platforms: ["mobile"],
    official: true,
    buttonLabel: "Get on GitHub",
    privacyUrl: "/androidprivacy",
  },
  {
    name: "Paper Wallets",
    url: "https://paper-wallets.wojakcoin2017.xyz",
    description:
      "Generate WojakCoin paper wallets offline. Create a WJK address and private key for cold storage and backup.",
    features: ["Paper wallet", "Cold storage", "Offline generation", "wojakcoin2017.xyz"],
    platforms: ["web"],
    official: true,
  },
  {
    name: "Dedoo",
    url: "https://t.me/dedooxyz",
    description:
      "Dedoo is a multi-chain web wallet with WojakCoin (WJK) support, part of the wider dedoo.xyz ecosystem. Manage your WJK and use it with the WJK ↔ wWojakcoin bridge. Join the community on Telegram for the latest.",
    features: ["WJK support", "Web app", "Bridge capable", "dedoo.xyz"],
    platforms: ["web"],
    official: false,
    buttonLabel: "Dedoo",
  },
  {
    name: "Komodo",
    url: "https://app.komodoplatform.com/wallet/wjk",
    description:
      "Komodo Platform wallet with WJK support. Store, send, and receive WojakCoin on the Komodo app.",
    features: ["WJK support", "Multi-chain", "Web app", "Komodo Platform"],
    platforms: ["web"],
    official: false,
  },
  {
    name: "GLEEC",
    url: "https://dex.gleec.com/wallet/wjk",
    description:
      "GLEEC DEX wallet for WJK. Manage and trade WojakCoin with the GLEEC web wallet.",
    features: ["WJK support", "DEX integration", "Web app", "GLEEC"],
    platforms: ["web"],
    official: false,
  },
]

export function WalletSection() {
  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Wallets</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Store, send, and receive WojakCoin (WJK) with a supported wallet
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {wallets.map((wallet, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all">
              <CardHeader className="bg-secondary/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <Wallet className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">{wallet.name}</CardTitle>
                  </div>
                  {wallet.official && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                      Official
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">{wallet.description}</p>
                {"privacyUrl" in wallet && wallet.privacyUrl && (
                  <p className="mb-4">
                    <a
                      href={wallet.privacyUrl}
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Shield className="h-3.5 w-3.5" /> Privacy Policy
                    </a>
                  </p>
                )}
                <div className="flex items-center gap-3 mb-4">
                  {wallet.platforms.includes("web") && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Monitor className="h-4 w-4" /> Web
                    </span>
                  )}
                  {wallet.platforms.includes("mobile") && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Smartphone className="h-4 w-4" /> Mobile
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {wallet.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Button className="w-full gap-2" asChild>
                  <a
                    href={wallet.url}
                    target={"downloadFilename" in wallet ? undefined : "_blank"}
                    rel={"downloadFilename" in wallet ? undefined : "noopener noreferrer"}
                    {...("downloadFilename" in wallet && { download: wallet.downloadFilename })}
                  >
                    {"buttonLabel" in wallet && wallet.buttonLabel
                      ? wallet.buttonLabel
                      : `Open ${wallet.name}`}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                {"docsUrl" in wallet && wallet.docsUrl && (
                  <Link
                    href={wallet.docsUrl}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <BookOpen className="h-4 w-4" />
                    {"docsLabel" in wallet && wallet.docsLabel ? wallet.docsLabel : "Docs"}
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Wallet Safety</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Always back up your private key and store it in a safe place. Never share your
                  private key or wallet password with anyone. Only use wallets from trusted sources.
                </p>
                <p className="text-sm text-muted-foreground">
                  More wallet options will be added as they become available. Check back for updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
