import Link from "next/link"
import { ArrowRight, Cpu, Coins, ShieldCheck, Users } from "lucide-react"

const highlights = [
  { icon: Cpu, label: "SHA-256 PoW", sub: "~2-min blocks" },
  { icon: Coins, label: "44,210,526 WJK", sub: "fixed max supply" },
  { icon: ShieldCheck, label: "0% premine", sub: "fair launch" },
  { icon: Users, label: "Since 2017", sub: "community-run" },
]

export function AboutSummary() {
  return (
    <section className="w-full py-16" aria-labelledby="about-heading">
      <div className="mx-auto px-4 max-w-4xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 id="about-heading" className="text-3xl md:text-5xl font-bold text-balance mb-5">
            What is WojakCoin (WJK)?
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground text-pretty">
            <p>
              <strong className="text-foreground">WojakCoin (WJK)</strong> is a peer-to-peer Wojak
              cryptocurrency launched in <strong className="text-foreground">2017</strong>. It&apos;s
              an open-source, community-run Proof-of-Work coin — inspired by the Wojak meme, but a
              real blockchain with its own full node (WojakCore), wallets, and mining ecosystem.
            </p>
            <p>
              WJK uses the <strong className="text-foreground">SHA-256</strong> algorithm with
              ~2-minute blocks and a Bitcoin-style halving schedule that caps supply at about{" "}
              <strong className="text-foreground">44.2 million coins</strong>. There was{" "}
              <strong className="text-foreground">0% premine</strong> — every WJK is fairly mined —
              and you can bridge native WJK to <strong className="text-foreground">wWojakcoin</strong>{" "}
              on Base.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {highlights.map((h, i) => {
            const Icon = h.icon
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center rounded-lg border-2 border-border bg-card/40 px-4 py-4"
              >
                <Icon className="h-5 w-5 text-primary mb-2" />
                <span className="font-semibold text-sm">{h.label}</span>
                <span className="text-xs text-muted-foreground">{h.sub}</span>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          >
            Learn more about WojakCoin <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
