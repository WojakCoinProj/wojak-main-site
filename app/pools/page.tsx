import { Header } from "@/components/header"
import { MiningPoolsSection } from "@/components/mining-pools-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/pools",
  title: "Mining pools",
  description:
    "Mine Wojakcoin (WJK) with official and community mining pools. Connect your hashrate to secure the Wojak cryptocurrency network.",
})

export default function PoolsPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/pools"}
        title={"Mining pools"}
        description={"Mine Wojakcoin (WJK) with official and community mining pools. Connect your hashrate to secure the Wojak cryptocurrency network."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <MiningPoolsSection />
      </div>
      <Footer />
    </main>
  )
}
