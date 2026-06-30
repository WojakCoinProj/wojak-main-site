import { Header } from "@/components/header"
import { BridgeSection } from "@/components/bridge-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/bridge",
  title: "Bridge",
  description:
    "Bridge WojakCoin (WJK) to wWojakcoin on Base-ETH. Trade $wWojakcoin on Uniswap and Dexscreener, and learn how to bridge using the Wojak Wallet Extension.",
})

export default function BridgePage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/bridge"}
        title={"Bridge"}
        description={"Bridge WojakCoin (WJK) to wWojakcoin on Base-ETH. Trade $wWojakcoin on Uniswap and Dexscreener, and learn how to bridge using the Wojak Wallet Extension."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <BridgeSection />
      </div>
      <Footer />
    </main>
  )
}
