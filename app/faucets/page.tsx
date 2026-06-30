import { Header } from "@/components/header"
import { FaucetsSection } from "@/components/faucets-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/faucets",
  title: "Faucets",
  description:
    "Wojakcoin faucets and ways to try WJK: community links and resources for small amounts of the Wojak cryptocurrency.",
})

export default function FaucetsPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/faucets"}
        title={"Faucets"}
        description={"Wojakcoin faucets and ways to try WJK: community links and resources for small amounts of the Wojak cryptocurrency."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <FaucetsSection />
      </div>
      <Footer />
    </main>
  )
}

