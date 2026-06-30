import { Header } from "@/components/header"
import { WhitepaperSection } from "@/components/whitepaper-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/whitepaper",
  title: "Whitepaper",
  description:
    "Read the WojakCoin (WJK) whitepaper: a peer-to-peer meme currency built on proof-of-work with fast blocks and responsive difficulty adjustment.",
})

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/whitepaper"}
        title={"Whitepaper"}
        description={"Read the WojakCoin (WJK) whitepaper: a peer-to-peer meme currency built on proof-of-work with fast blocks and responsive difficulty adjustment."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <WhitepaperSection />
      </div>
      <Footer />
    </main>
  )
}
