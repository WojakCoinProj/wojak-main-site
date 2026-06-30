import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WojakSwapClient } from "@/components/wojakswap/WojakSwapClient"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"
import "./swap.css"

export const metadata = pageMetadata({
  path: "/wojakswap",
  title: "WojakSwap",
  description:
    "Swap wWojakcoin against ETH, USDC, USDT, DAI, WETH and cbBTC on Base. Best-price routing via the 0x Swap API, wallets by Privy.",
})

// Don't statically cache the HTML for a year — this is an app page that ships
// updates often, and a stale cached shell would reference old JS chunks (the
// "still the same after a deploy" symptom). Render fresh each request so the
// browser always gets the latest bundle.
export const dynamic = "force-dynamic"

export default function WojakSwapPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/wojakswap"}
        title={"WojakSwap"}
        description={"Swap wWojakcoin against ETH, USDC, USDT, DAI, WETH and cbBTC on Base. Best-price routing via the 0x Swap API, wallets by Privy."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <WojakSwapClient />
      </div>
      <Footer />
    </main>
  )
}
