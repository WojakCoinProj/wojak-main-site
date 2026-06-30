"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Droplet, Shield } from "lucide-react"
import Link from "next/link"

export function FaucetsSection() {
  const faucets = [
    {
      name: "NestEx Faucet",
      href: "https://t.co/D7Rhmb4FWn",
      description:
        "Use the official NestEx faucet to earn WojakCoin faucets rewards and test the platform.",
      badge: "Recommended",
      icon: Droplet,
    },
    {
      name: "Discord Faucet",
      href: "https://discord.gg/nfvH3sFhpk",
      description:
        "Get WojakCoin faucet rewards and updates via our Discord faucet community. Join and follow the faucet instructions.",
      badge: "Community",
      icon: Droplet,
    },
  ]

  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Faucets</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Earn WojakCoin rewards from trusted faucet services
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faucets.map((f) => {
            const Icon = f.icon
            return (
              <Card
                key={f.name}
                className="border-2 hover:border-primary/60 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="text-2xl font-bold">{f.name}</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">{f.description}</div>
                    </div>
                    <div className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">
                      {f.badge}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button asChild variant="outline" className="w-full gap-2">
                      <a
                        href={f.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open
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
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Safety Reminder</h3>
                <p className="text-sm text-muted-foreground">
                  Only use official faucet links and verify pages before connecting wallets or sending funds.
                  If you see suspicious requests, do not proceed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

