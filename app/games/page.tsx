import { Header } from "@/components/header"
import { GamesSection } from "@/components/games-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/games",
  title: "Games",
  description:
    "Play WojakCoin games: provably-fair on-chain blackjack and multiplayer chess with WJK buy-ins via the Wojak Wallet.",
})

export default function GamesPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/games"}
        title={"Games"}
        description={"Play WojakCoin games: provably-fair on-chain blackjack and multiplayer chess with WJK buy-ins via the Wojak Wallet."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <GamesSection />
      </div>
      <Footer />
    </main>
  )
}
