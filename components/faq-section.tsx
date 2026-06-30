import Link from "next/link"

// Single source of truth for the FAQ — rendered visibly below AND emitted as
// FAQPage JSON-LD on the homepage (the visible text matches the structured data,
// which is what Google wants for FAQ rich results).
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is WojakCoin (WJK)?",
    a: "WojakCoin (WJK) is a peer-to-peer Wojak cryptocurrency launched in 2017. It is an open-source, community-run Proof-of-Work coin built on the SHA-256 algorithm with 2-minute block times. WojakCoin is fully decentralized with no central authority — anyone can run a node, mine, send, and receive WJK.",
  },
  {
    q: "Is this the official WojakCoin website?",
    a: "Yes. wojakcoin.cash is the official WojakCoin (WJK) website, alongside wojakcoin2017.xyz. It is the canonical source for wallets, mining pools, exchanges, the WJK <-> wWojakcoin bridge, specifications, the whitepaper, and community links. Always verify links against the official site and the @wojakcoin2017 channels.",
  },
  {
    q: "When was WojakCoin created?",
    a: "WojakCoin (also written as Wojakcoin 2017) launched in 2017 as a fair-launch, community cryptocurrency inspired by the Wojak meme. It has been open source and community-run since day one.",
  },
  {
    q: "What is WojakCoin's ticker, algorithm, and block time?",
    a: "WojakCoin's ticker symbol is WJK. It uses the SHA-256 Proof-of-Work algorithm with a target block time of 2 minutes, a 100-coin block reward that halves every 210,000 blocks, and DGW-style difficulty adjustment. The reference client is WojakCore.",
  },
  {
    q: "What is the maximum supply of WojakCoin?",
    a: "WojakCoin has a fixed maximum supply of approximately 44,210,526 WJK, enforced by a Bitcoin-style halving schedule (reward halves every 210,000 blocks). There was 0% premine — WJK is a fair launch.",
  },
  {
    q: "How do I buy WojakCoin (WJK)?",
    a: "You can buy WojakCoin (WJK) on supported exchanges listed on the Exchanges page. You can also acquire wWojakcoin (wWJK) on Base via Uniswap and bridge it to native WJK using the official bridge. Always self-custody your WJK in a supported wallet.",
  },
  {
    q: "Which wallets support WojakCoin?",
    a: "WojakCoin is supported by WojakCore (the official full-node desktop wallet), the Wojak Wallet browser extension, the WojakCoin web wallet, the official Android app, Dedoo, Komodo, and GLEEC. See the Wallets page for download links and setup guides.",
  },
  {
    q: "How do I mine WojakCoin?",
    a: "WojakCoin uses SHA-256 Proof-of-Work, so it can be mined with SHA-256 hardware (ASICs) or via merged mining and multi-algo pools. Point your miner at a supported WojakCoin pool — see the Mining Pools page for current pools, ports, and connection details.",
  },
  {
    q: "What is wWojakcoin and how do I bridge WJK to Base?",
    a: "wWojakcoin (wWJK) is WojakCoin wrapped as an ERC-20 token on Base (Ethereum L2), backed 1:1 by native WJK locked in bridge custody. Use the official bridge to deposit WJK and mint wWJK, or burn wWJK to withdraw native WJK. A public Proof-of-Reserve dashboard reconciles locked WJK against minted wWJK.",
  },
  {
    q: "Where can I check the WojakCoin price and trade it?",
    a: "You can check the live WojakCoin (WJK) price and trade native WJK on the exchanges listed on the Exchanges page. WJK trades as a WJK/USDT pair on NonKYC (the primary listing), plus QuTrade, NestEx, and Rabid Rabbit, with WJK/LTC and WJK/DOGE pairs on GateVia and support on Komodo. Separately, the wrapped version — wWojakcoin (wWJK) on Base — shows a live price on the Bridge page and trades against ETH on Uniswap.",
  },
  {
    q: "Is WojakCoin a fair launch with no premine?",
    a: "Yes. WojakCoin had 0% premine and no ICO — it is a fair launch. All WJK enters circulation through Proof-of-Work mining following the halving schedule, the same proven model used by Bitcoin.",
  },
  {
    q: "Is WojakCoin a meme coin?",
    a: "WojakCoin is a community meme cryptocurrency inspired by the Wojak meme, but it is a real Proof-of-Work blockchain with its own full node (WojakCore), wallets, mining ecosystem, and a bridge to Base — not just a token on another chain.",
  },
]

export function FaqSection() {
  return (
    <section className="w-full py-16" aria-labelledby="faq-heading">
      <div className="mx-auto px-4 max-w-4xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-10">
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-bold text-balance">
            WojakCoin (WJK) — Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Everything about Wojak coin &amp; Wojakcoin 2017 — what it is, how to buy, mine, store,
            and bridge WJK.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg border-2 border-border bg-card/40 px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold list-none">
                <span>{item.q}</span>
                <span className="text-primary transition-transform group-open:rotate-45 shrink-0 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Still have questions? Visit the{" "}
          <Link href="/community" className="text-primary hover:underline">
            Community
          </Link>{" "}
          page or read the{" "}
          <Link href="/whitepaper" className="text-primary hover:underline">
            whitepaper
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
