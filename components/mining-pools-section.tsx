import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const pools = [
  {
    name: "RT-Pool",
    url: "https://rt-pool.cc",
    description: "Preferred mining pool — reliable payouts and low fees",
    logo: "/pools/rt-pool.png",
    initials: "RT",
  },
  {
    name: "AU Merged Mine",
    url: "https://au-merged-mine.cminors-pool.com/site/mining",
    description: "Australian merged mining pool with multiple coins",
    logo: "/pools/au-merged.png",
    initials: "AU",
  },
  {
    name: "Mining Dutch",
    url: "https://www.mining-dutch.nl/pools/wojakcoin.php",
    description: "Multi-algo pool with a dedicated WojakCoin (WJK) pool",
    logo: "/pools/miningdutch.png",
    initials: "MD",
  },
  {
    name: "zpool",
    url: "https://www.zpool.ca/site/mining?algo=sha256",
    description: "Profit-switching multi-algo pool — mine WJK on SHA-256",
    logo: "/pools/zpool.png",
    initials: "Z",
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
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                  <img
                    src={pool.logo || "/placeholder-logo.png"}
                    alt={`${pool.name} logo`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
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
