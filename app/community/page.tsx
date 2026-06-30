import { Header } from "@/components/header"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/community",
  title: "Community",
  description:
    "Join the Wojakcoin community: Telegram, X (Twitter), and social links for WJK holders, miners, and Wojak meme coin fans.",
})

export default function CommunityPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/community"}
        title={"Community"}
        description={"Join the Wojakcoin community: Telegram, X (Twitter), and social links for WJK holders, miners, and Wojak meme coin fans."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <CommunitySection />
      </div>
      <Footer />
    </main>
  )
}
