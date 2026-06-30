import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSummary } from "@/components/about-summary"
import { FaqSection, FAQ_ITEMS } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { faqLd, webPageLd } from "@/lib/structured-data"

export default function Home() {
  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          webPageLd({
            path: "/",
            title: "WojakCoin (WJK) — Official Wojak Coin & Wojakcoin 2017",
            description:
              "Official Wojak coin & Wojakcoin 2017 (WJK): peer-to-peer Wojak cryptocurrency since 2017 — wallets, mining pools, exchanges, bridge, and specs.",
          }),
          faqLd(FAQ_ITEMS),
        ]}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <HeroSection />
        <AboutSummary />
        <FaqSection />
      </div>
      <Footer />
    </main>
  )
}
