import { Header } from "@/components/header"
import { SecuritySection } from "@/components/security-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/security",
  title: "Security",
  description:
    "Best practices for securing Wojakcoin (WJK) wallets and nodes. Understand risks and how to stay safe with the Wojak cryptocurrency.",
})

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/security"}
        title={"Security"}
        description={"Best practices for securing Wojakcoin (WJK) wallets and nodes. Understand risks and how to stay safe with the Wojak cryptocurrency."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <SecuritySection />
      </div>
      <Footer />
    </main>
  )
}
