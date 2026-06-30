import { Header } from "@/components/header"
import { SpecsSection } from "@/components/specs-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/specs",
  title: "Technical specs",
  description:
    "Wojakcoin (WJK) chain parameters: consensus, block time, supply, addresses, and specs for developers and miners.",
})

export default function SpecsPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/specs"}
        title={"Technical specs"}
        description={"Wojakcoin (WJK) chain parameters: consensus, block time, supply, addresses, and specs for developers and miners."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <SpecsSection />
      </div>
      <Footer />
    </main>
  )
}
