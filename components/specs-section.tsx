"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function SpecsSection() {
  const specs = [
    { label: "Core Version", value: "1.12.1.0", badge: true },
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

  // Generate halving reward data
  const halvingData = []
  const halvingInterval = 210000
  const maxHalvings = 10 // Show first 10 halvings
  
  for (let i = 0; i <= maxHalvings; i++) {
    const blockHeight = i * halvingInterval
    const reward = 100 / Math.pow(2, i)
    halvingData.push({
      block: blockHeight.toLocaleString(),
      height: blockHeight,
      reward: reward.toFixed(2),
      rewardValue: reward,
    })
  }

  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">{"Technical Specifications"}</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            {"Built with modern security standards and proven blockchain technology optimized for the meme economy."}
          </p>
        </div>
        <Card className="max-w-4xl mx-auto border-2 mb-8">
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
        
        {/* Halving Reward Chart */}
        <Card className="max-w-4xl mx-auto border-2">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-2xl text-center">{"Block Reward Halving Schedule"}</CardTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Block reward halves every 210,000 blocks
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={halvingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 265)" />
                <XAxis 
                  dataKey="block" 
                  label={{ value: "Block Height", position: "insideBottom", offset: -5 }}
                  tick={{ fill: "oklch(0.8 0.01 265)" }}
                  stroke="oklch(0.4 0.02 265)"
                />
                <YAxis 
                  label={{ value: "Reward (coins)", angle: -90, position: "insideLeft" }}
                  tick={{ fill: "oklch(0.8 0.01 265)" }}
                  stroke="oklch(0.4 0.02 265)"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "oklch(0.15 0.02 265)", 
                    border: "1px solid oklch(0.3 0.02 265)",
                    color: "oklch(0.95 0.01 265)"
                  }}
                  formatter={(value: number) => [`${value} coins`, "Block Reward"]}
                  labelFormatter={(label) => `Block ${label}`}
                  labelStyle={{ color: "oklch(0.95 0.01 265)" }}
                />
                <Legend wrapperStyle={{ color: "oklch(0.8 0.01 265)" }} />
                <Line 
                  type="stepAfter" 
                  dataKey="rewardValue" 
                  stroke="oklch(0.7 0.25 145)" 
                  strokeWidth={3}
                  dot={{ fill: "oklch(0.7 0.25 145)", r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Block Reward"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              {halvingData.slice(0, 5).map((data, index) => (
                <div key={index} className="p-2 rounded bg-muted/50 text-center">
                  <div className="font-semibold">Block {data.block}</div>
                  <div className="text-muted-foreground">{data.reward} coins</div>
                </div>
              ))}
            </div>
            
            {/* Reward Structure Explanation */}
            <div className="mt-8 p-6 rounded-lg bg-muted/30 border border-border">
              <h4 className="text-lg font-bold mb-3">Why This Reward Structure?</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">100 Coin Initial Reward:</strong> WojakCoin starts with a 100 coin block reward, 
                  double Bitcoin's initial 50 coins. This higher initial reward ensures adequate coin distribution during the early 
                  mining phase and provides sufficient incentive for miners to secure the network from launch.
                </p>
                <p>
                  <strong className="text-foreground">210,000 Block Halving Interval:</strong> Following Bitcoin's proven model, 
                  WojakCoin halves its block reward every 210,000 blocks. With 2-minute block times, this occurs approximately every 
                  8 months (compared to Bitcoin's ~4 years). This creates a predictable, deflationary supply schedule that balances 
                  early distribution with long-term scarcity.
                </p>
                <p>
                  <strong className="text-foreground">Exponential Decay:</strong> The reward structure uses exponential decay (halving), 
                  ensuring that the majority of coins are mined in the early years while maintaining mining incentives far into the future. 
                  This model has proven effective for creating sustainable, decentralized networks.
                </p>
                <p>
                  <strong className="text-foreground">Total Supply Cap:</strong> The halving mechanism ensures a finite total supply of 
                  approximately 44.2 million coins, creating predictable scarcity and long-term value preservation for the WojakCoin ecosystem.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
