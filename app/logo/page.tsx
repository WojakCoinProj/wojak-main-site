import { Header } from "@/components/header"
import { LogoSection } from "@/components/logo-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/logo",
  title: "Logo & brand",
  description:
    "Official Wojakcoin (WJK) logos and brand assets for media, partners, and community use.",
})

export default function LogoPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/logo"}
        title={"Logo & brand"}
        description={"Official Wojakcoin (WJK) logos and brand assets for media, partners, and community use."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <LogoSection />
      </div>
      <Footer />
    </main>
  )
}
