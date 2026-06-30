import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "Learn what WojakCoin (WJK) is: the Wojak meme cryptocurrency, fair-launch ethos, network basics, and project history.",
})

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/about"}
        title={"About"}
        description={"Learn what WojakCoin (WJK) is: the Wojak meme cryptocurrency, fair-launch ethos, network basics, and project history."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
