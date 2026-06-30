import { Header } from "@/components/header"
import { RunANodeSection } from "@/components/run-a-node-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/run-a-node",
  title: "Run a Node",
  description:
    "How to run a WojakCoin (WJK) full node with WojakCore — download, configure wojakcoin.conf, start wojakcoind, and sync the blockchain. Ports, RPC, and useful commands.",
})

export default function RunANodePage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/run-a-node"}
        title={"Run a Node"}
        description={"How to run a WojakCoin (WJK) full node with WojakCore \u00e2\u0080\u0094 download, configure wojakcoin.conf, start wojakcoind, and sync the blockchain. Ports, RPC, and useful commands."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <RunANodeSection />
      </div>
      <Footer />
    </main>
  )
}
