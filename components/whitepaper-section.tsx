"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ExternalLink } from "lucide-react"

const WHITEPAPER_PDF = "/WojakCoin-WhitepaperV1.pdf"

const sections = [
  { number: 1, title: "Introduction" },
  { number: 2, title: "Transactions" },
  { number: 3, title: "Timestamp Server" },
  { number: 4, title: "Proof-of-Work" },
  { number: 5, title: "Difficulty Adjustment" },
  { number: 6, title: "Network" },
  { number: 7, title: "Incentive" },
  { number: 8, title: "Reclaiming Disk Space" },
  { number: 9, title: "Simplified Payment Verification" },
  { number: 10, title: "Combining and Splitting Value" },
  { number: 11, title: "Privacy" },
  { number: 12, title: "Calculations" },
  { number: 13, title: "Consensus Parameters" },
  { number: 14, title: "Conclusion" },
]

export function WhitepaperSection() {
  return (
    <section className="w-full pb-16">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Whitepaper</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            A peer-to-peer meme currency — the technical foundation of WojakCoin (WJK).
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-2 mb-8 border-primary/30">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
              <FileText className="h-7 w-7 text-primary" />
              WojakCoin Whitepaper V1
            </CardTitle>
            <p className="text-center text-muted-foreground mt-2">
              A Peer-to-Peer Meme Currency
            </p>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              WojakCoin descends from the Bitcoin Core codebase and preserves its consensus model,
              transaction format, and scripting system. The whitepaper documents how WojakCoin tunes
              the economic and timing envelope — two-minute blocks, responsive per-block difficulty
              adjustment, and a community-scale issuance schedule — for a fast, fair-launch currency.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href={WHITEPAPER_PDF} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-5 w-5" />
                  Read Whitepaper
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                <a href={WHITEPAPER_PDF} download="WojakCoin-WhitepaperV1.pdf">
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Badge variant="secondary">Version 1</Badge>
              <Badge variant="secondary">MIT License</Badge>
              <Badge variant="secondary">7 pages</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto border-2 mb-8">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-xl text-center">Abstract</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4">
              A purely peer-to-peer version of meme currency would allow online payments to be sent
              directly from one party to another without passing through a financial institution. WojakCoin
              proposes a solution to the double-spending problem using the same peer-to-peer architecture
              pioneered by Bitcoin, hardened with parameters chosen for a fast-moving, community-driven
              currency — including a two-minute block interval and a responsive difficulty controller that
              re-evaluates the network hash rate at every block.
            </blockquote>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto border-2">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-xl text-center">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ol className="grid gap-2 sm:grid-cols-2">
              {sections.map((section) => (
                <li
                  key={section.number}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-sm"
                >
                  <span className="font-mono text-primary font-semibold w-6 shrink-0">
                    {section.number}.
                  </span>
                  <span>{section.title}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
