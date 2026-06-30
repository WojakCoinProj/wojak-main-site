"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Gamepad2, Spade, Crown } from "lucide-react"

const games = [
  {
    name: "WojakCoin Blackjack",
    href: "https://wjkbj.wojakcoin.cash",
    description:
      "Provably-fair on-chain blackjack for WojakCoin (WJK). Connect the Wojak Wallet and play.",
    badge: "On-chain",
    icon: Spade,
  },
  {
    name: "Wojak Chess",
    href: "https://chess.wojakcoin.cash",
    description:
      "Multiplayer chess with real WojakCoin (WJK) buy-ins via the Wojak Wallet extension.",
    badge: "Multiplayer",
    icon: Crown,
  },
]

export function GamesSection() {
  return (
    <section className="w-full pb-16">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Games</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Play WojakCoin-powered games with the Wojak Wallet
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {games.map((game) => {
            const Icon = game.icon
            return (
              <Card
                key={game.href}
                className="border-2 hover:border-primary/60 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="text-2xl font-bold">{game.name}</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">{game.description}</div>
                    </div>
                    <div className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded shrink-0">
                      {game.badge}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button asChild variant="outline" className="w-full gap-2">
                      <a href={game.href} target="_blank" rel="noopener noreferrer">
                        Play Now
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-primary/30 mt-10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Wojak Wallet Required</h3>
                <p className="text-sm text-muted-foreground">
                  These games use the Wojak Wallet extension for on-chain play and WJK buy-ins.
                  Install the wallet from the{" "}
                  <Link href="/wallets" className="text-primary hover:underline">
                    Wallets
                  </Link>{" "}
                  page before you start.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
