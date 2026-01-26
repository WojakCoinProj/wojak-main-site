"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Search } from "lucide-react"
import Image from "next/image"
import { ExplorerModal } from "./explorer-modal"
import { BuyNowModal } from "./buy-now-modal"

export function HeroSection() {
  const [explorerModalOpen, setExplorerModalOpen] = useState(false)
  const [buyNowModalOpen, setBuyNowModalOpen] = useState(false)

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/10 pt-32 pb-12">
      <div className="absolute inset-0 bg-[url('/abstract-grid.png')] bg-repeat opacity-5" />

      <div className="container relative z-10 px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Wojak Logo */}
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative rounded-full shadow-2xl">
              <Image
                src="/wojak-logo.png"
                alt="WojakCoin Logo"
                width={256}
                height={256}
                className="rounded-full"
                priority
              />
            </div>
          </div>

          {/* Title and Badge */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center gap-2 text-sm font-mono text-accent">
              <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>{"Created 2017 • Revived 2025"}</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-balance">
              <span className="text-foreground">{"Wojak"}</span>
              <span className="text-primary">{"Coin"}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl">
              {"A peer to peer meme currency serving the internet community, created 2017 and revived 2025."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg gap-2" onClick={() => setBuyNowModalOpen(true)}>
              {"Buy Now"}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg gap-2 bg-transparent" asChild>
              <a href="https://github.com/WojakCoinProj/wojakcore/releases" target="_blank" rel="noopener noreferrer">
                <Download className="h-5 w-5" />
                {"Download Wallet"}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg gap-2 bg-transparent"
              onClick={() => setExplorerModalOpen(true)}
            >
              <Search className="h-5 w-5" />
              {"Explorer"}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 justify-center text-sm mt-4">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-3xl font-bold text-primary font-mono">{"SHA-256"}</span>
              <span className="text-muted-foreground">{"Algorithm"}</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-3xl font-bold text-primary font-mono">{"44M"}</span>
              <span className="text-muted-foreground">{"Total Supply"}</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-3xl font-bold text-primary font-mono">{"2min"}</span>
              <span className="text-muted-foreground">{"Block Time"}</span>
            </div>
          </div>
        </div>
      </div>

      <ExplorerModal open={explorerModalOpen} onOpenChange={setExplorerModalOpen} />
      <BuyNowModal open={buyNowModalOpen} onOpenChange={setBuyNowModalOpen} />
    </section>
  )
}
