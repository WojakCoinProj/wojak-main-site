"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function DevDonationsSection() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const devDonations = [
    {
      developer: "@danny_utxo",
      currency: "Bitcoin",
      address: "bc1qmfugpjv97v2eqa7lf0g7ue0ccqzczk042qtwfw",
      shortAddress: "bc1q...2qtwfw",
    },
    {
      developer: "@senasgr",
      currency: "Ethereum",
      address: "senasgr.eth",
      shortAddress: "senasgr.eth",
    },
  ]

  const projectDonations = [
    {
      name: "WOJAK (Native)",
      address: "WdQxZndvAq671jR3fNp8TLY1o52R2ZFZqR",
      symbol: "WOJAK",
      explorer: "https://explorer.wojakcoin.cash/address/WdQxZndvAq671jR3fNp8TLY1o52R2ZFZqR",
      type: "wojak",
    },
    {
      name: "USDT TRC-20 (TRON)",
      address: "TMPuAFe5XxbAzjc5aQj2hTRHSxGVVcjGPa",
      symbol: "USDT",
      explorer: "https://tronscan.org/#/address/TMPuAFe5XxbAzjc5aQj2hTRHSxGVVcjGPa",
      type: "trc20",
    },
  ]

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Donations</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Support WojakCoin development and project growth
          </p>
        </div>

        {/* Project Donations */}
        <Card className="max-w-4xl mx-auto border-2 mb-8">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-2xl text-center">Project Donations</CardTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              All donations go to marketing, CEX listings, development, giveaways and community rewards
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {projectDonations.map((donation) => (
                <div key={donation.type} className="bg-card border border-border rounded-lg p-6">
                  <div className="mb-3">
                    <Badge variant="secondary" className="mb-2">{donation.symbol}</Badge>
                    <p className="font-semibold text-lg">{donation.name}</p>
                  </div>
                  <div className="bg-background rounded-md p-3 mb-3 border border-border">
                    <code className="text-sm break-all">{donation.address}</code>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(donation.address)}
                      className="flex-1 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      {copiedAddress === donation.address ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Address
                        </>
                      )}
                    </button>
                    <Link
                      href={donation.explorer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Explorer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="https://donations.wojakcoin2017.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View Full Donation Page
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Developer Donations */}
        <Card className="max-w-4xl mx-auto border-2" id="developers">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-2xl text-center">Developer Donations</CardTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Support the developers who maintain and improve WojakCoin
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {devDonations.map((donation) => (
                <div key={donation.developer} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1">{donation.currency}</p>
                    <p className="font-semibold text-lg">{donation.developer}</p>
                  </div>
                  <div className="bg-background rounded-md p-3 mb-3 border border-border">
                    <code className="text-sm break-all">{donation.address}</code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(donation.address)}
                    className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    {copiedAddress === donation.address ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Address
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">All contributions are voluntary and help maintain the project.</p>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="max-w-4xl mx-auto border-2 border-destructive/30 mt-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive flex-shrink-0">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Security Warning</h3>
                <p className="text-sm text-muted-foreground">
                  ⚠️ ONLY use addresses shown on this official page. Developers will NEVER DM you asking for money! 
                  Always verify addresses through official channels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
