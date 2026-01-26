import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SpecsSection() {
  const specs = [
    { label: "Algorithm", value: "SHA-256", badge: true },
    { label: "Type", value: "PoW (Proof of Work)" },
    { label: "Difficulty Adjustment", value: "DGW-style (Block 1000+)", badge: true },
    { label: "RPC Port", value: "20760" },
    { label: "P2P Port", value: "20759" },
    { label: "Block Reward", value: "100 coins" },
    { label: "Block Halving", value: "210,000 blocks" },
    { label: "Total Coin Supply", value: "44,210,526 coins", badge: true },
    { label: "Premine", value: "0% (Fair Launch)", badge: true },
    { label: "Coinbase Maturity", value: "20 blocks" },
    { label: "Target Spacing", value: "2 minutes", badge: true },
    { label: "Target Timespan", value: "6 minutes" },
    { label: "Transaction Confirmations", value: "6 blocks" },
  ]

  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">{"Technical Specifications"}</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            {"Built with modern security standards and proven blockchain technology optimized for the meme economy."}
          </p>
        </div>
        <Card className="max-w-4xl mx-auto border-2">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-2xl text-center">{"WojakCoin Specs"}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">{spec.label}</span>
                  <span className="font-mono text-muted-foreground">
                    {spec.badge ? (
                      <Badge variant="secondary" className="font-mono">
                        {spec.value}
                      </Badge>
                    ) : (
                      spec.value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
