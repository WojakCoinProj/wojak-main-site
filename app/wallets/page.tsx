import { Header } from "@/components/header"
import { WalletSection } from "@/components/wallet-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/wallets",
  title: "Wallets",
  description:
    "Download official Wojakcoin (WJK) wallets for desktop and mobile. Securely store and send the Wojak cryptocurrency with community-trusted releases.",
})

export default function WalletPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/wallets"}
        title={"Wallets"}
        description={"Download official Wojakcoin (WJK) wallets for desktop and mobile. Securely store and send the Wojak cryptocurrency with community-trusted releases."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <WalletSection />
      </div>
      <Footer />
    </main>
  )
}
