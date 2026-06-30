import { Header } from "@/components/header"
import { ExchangesSection } from "@/components/exchanges-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/exchanges",
  title: "Exchanges",
  description:
    "Where to buy and trade Wojakcoin (WJK): NonKYC (primary), QuTrade, NestEx, and other listings. Find liquidity and pairs for the Wojak meme cryptocurrency.",
})

export default function ExchangesPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/exchanges"}
        title={"Exchanges"}
        description={"Where to buy and trade Wojakcoin (WJK): NonKYC (primary), QuTrade, NestEx, and other listings. Find liquidity and pairs for the Wojak meme cryptocurrency."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <ExchangesSection />
      </div>
      <Footer />
    </main>
  )
}
