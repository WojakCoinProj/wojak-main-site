"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface BuyNowModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BuyNowModal({ open, onOpenChange }: BuyNowModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy WojakCoin</DialogTitle>
          <DialogDescription>Purchase WJK tokens on popular exchanges</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="rounded-lg border border-border p-4 bg-secondary/50">
            <h3 className="font-semibold mb-2">KlingEx</h3>
            <p className="text-sm text-muted-foreground mb-4">Trade WJK-USDT pair on KlingEx</p>
            <Button className="w-full gap-2" asChild>
              <a href="https://klingex.io/trade/WJK-USDT" target="_blank" rel="noopener noreferrer">
                Trade Now
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="rounded-lg border border-border p-4 bg-secondary/50">
            <h3 className="font-semibold mb-2">Rabid Rabbit Exchange</h3>
            <p className="text-sm text-muted-foreground mb-4">Trade WJK-USDT pair on Rabid Rabbit</p>
            <Button className="w-full gap-2" asChild>
              <a href="https://rabid-rabbit.org/account/trade/WJK-USDT" target="_blank" rel="noopener noreferrer">
                Trade Now
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
