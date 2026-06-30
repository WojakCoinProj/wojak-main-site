"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function ExchangesSection() {
  const exchanges = [
    {
      name: "NonKYC",
      logo: "/exchanges/nonkyc.png",
      url: "https://nonkyc.io/market/WJK_USDT",
      pair: "WJK/USDT",
      description:
        "Primary exchange for WojakCoin — trade WJK/USDT on NonKYC.io with no KYC required.",
      features: ["WJK/USDT pair", "No KYC", "Primary listing", "nonkyc.io"],
      verified: true,
      primary: true,
    },
    {
      name: "QuTrade",
      logo: "/exchanges/qutrade.png",
      url: "https://qutrade.io/en/?market=wjk_usdt",
      pair: "WJK/USDT",
      description: "Trade WojakCoin on QuTrade — spot market with WJK/USDT on qutrade.io.",
      features: ["WJK/USDT pair", "Spot trading", "qutrade.io"],
      verified: true,
    },
    {
      name: "NestEx",
      logo: "/exchanges/nestex.png",
      url: "https://trade.nestex.one/spot/WJK",
      pair: "WJK/USDT",
      description: "Trade WojakCoin on NestEx — secure, reliable trading that benefits the WJK project. 0% exchange fees, LP rewards.",
      features: ["WJK/USDT pair", "0% exchange fees", "LP rewards", "Secure"],
      verified: true,
    },
    {
      name: "Rabid Rabbit Exchange",
      logo: "/exchanges/rabidrabbit.png",
      url: "https://rabid-rabbit.org/account/trade/WJK-USDT",
      pair: "WJK/USDT",
      description: "Trade WojakCoin on Rabid Rabbit Exchange with WJK-USDT trading pair",
      features: ["WJK-USDT pair", "User-friendly interface", "Fast execution"],
      verified: true,
    },
    {
      name: "GateVia",
      logo: "/exchanges/gatevia.png",
      url: "https://gatevia.io",
      pair: "WJK/LTC, WJK/DOGE",
      description: "Trade WojakCoin on GateVia (gatevia.io) with WJK/LTC and WJK/DOGE pairs",
      features: ["WJK/LTC pair", "WJK/DOGE pair", "gatevia.io"],
      verified: true,
    },
    {
      name: "Komodo",
      logo: "/exchanges/komodo.png",
      url: "https://app.komodoplatform.com/wallet/wjk",
      pair: "WJK",
      description: "Wallet and WJK support on Komodo Platform — store and manage your WojakCoin",
      features: ["WJK wallet", "Komodo Platform", "Web app"],
      verified: true,
    },
    {
      name: "GLEEC",
      logo: "/exchanges/gleec.png",
      url: "https://dex.gleec.com/wallet/wjk",
      pair: "WJK",
      description: "Wallet and WJK on GLEEC DEX — trade and manage WojakCoin",
      features: ["WJK wallet", "GLEEC DEX", "Web app"],
      verified: true,
    },
  ]

  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Exchanges</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Trade WojakCoin (WJK) on these supported exchanges
          </p>
        </div>

        {/* Exchange Listings */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {exchanges.map((exchange, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all">
              <CardHeader className="bg-secondary/50">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                      <img
                        src={exchange.logo || "/placeholder-logo.png"}
                        alt={`${exchange.name} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <CardTitle className="text-2xl">{exchange.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {"primary" in exchange && exchange.primary && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded border border-primary/40 font-semibold">
                        Primary
                      </span>
                    )}
                    {exchange.verified && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">{exchange.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-mono font-semibold">{exchange.pair}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {exchange.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Button className="w-full gap-2" asChild>
                  <a href={exchange.url} target="_blank" rel="noopener noreferrer">
                    Trade on {exchange.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="max-w-4xl mx-auto border-2 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Trading Safety</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Always verify you're on the official exchange website before trading. Be cautious of phishing sites 
                  and never share your private keys or wallet passwords with anyone.
                </p>
                <p className="text-sm text-muted-foreground">
                  WojakCoin is continuously being added to new exchanges. Check back regularly for updates on new listings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon */}
        <Card className="max-w-4xl mx-auto border-2 border-yellow-500/30 mt-6">
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold">More Exchanges Coming Soon</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              We're actively working to list WojakCoin on additional exchanges to increase liquidity and accessibility.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
