import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const pools = [
  {
    name: "RegularPool",
    url: "https://regularpool.com",
    description: "Reliable mining pool with consistent payouts and low fees",
    initials: "RP",
  },
  {
    name: "KriptoKyng",
    url: "https://kriptokyng.com/pools/wojak",
    description: "Standard pool mining with shared rewards",
    initials: "KK",
  },
  {
    name: "KriptoKyng Solo",
    url: "https://kriptokyng.com/pools/wojaksolo",
    description: "Solo mining pool - mine blocks independently",
    initials: "KS",
  },
  {
    name: "AltcoinsPool",
    url: "https://altcoinspool.cc",
    description: "Multi-coin mining pool with competitive fees",
    initials: "AC",
  },
  {
    name: "AU Merged Mine",
    url: "https://au-merged-mine.cminors-pool.com/site/mining",
    description: "Australian merged mining pool with multiple coins",
    initials: "AU",
  },
  {
    name: "HimPool",
    url: "https://himpool.com/pools/wojak",
    description: "Community-driven mining pool with regular payouts",
    initials: "HP",
  },
]

export function MiningPoolsSection() {
  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mining Pools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start mining WojakCoin with community pools. Join a pool to combine your mining power and earn rewards
            together.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-8">
          {pools.map((pool) => (
            <Card key={pool.name} className="p-4 border-2 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">{pool.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1">{pool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{pool.description}</p>
                  <Button asChild size="sm" className="w-full">
                    <a href={pool.url} target="_blank" rel="noopener noreferrer">
                      Join Pool
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
            <a
              href="https://miningpoolstats.stream/wojakcoin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              View Pool Statistics
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
