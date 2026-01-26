"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

export function LogoSection() {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/wojak-logo.png"
    link.download = "wojakcoin-logo.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">{"Official Logo"}</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            {
              "The official WojakCoin logo represents our community and shared values. Feel free to use it to spread the wojak revolution!"
            }
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-accent bg-accent/5">
            <CardContent className="pt-8 pb-8 flex flex-col items-center gap-6">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg shadow-primary/20">
                <Image src="/wojak-logo.png" alt="WojakCoin Official Logo" fill className="object-cover" priority />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2" onClick={handleDownload}>
                  <Download className="h-5 w-5" />
                  {"Download PNG"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {"Free to use for community projects, promotional materials, and wojak-related content"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
