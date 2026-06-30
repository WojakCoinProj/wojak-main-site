import { Header } from "@/components/header"
import { DevDonationsSection } from "@/components/dev-donations-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/donations",
  title: "Donations",
  description:
    "Support Wojakcoin (WJK) development and infrastructure with transparent donation options for the Wojak coin project.",
})

export default function DonationsPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/donations"}
        title={"Donations"}
        description={"Support Wojakcoin (WJK) development and infrastructure with transparent donation options for the Wojak coin project."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <DevDonationsSection />
      </div>
      <Footer />
    </main>
  )
}
