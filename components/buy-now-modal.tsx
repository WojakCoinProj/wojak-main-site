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
      <DialogContent className="sm:max-w-sm max-h-[90vh] flex flex-col p-4">
        <DialogHeader className="flex-shrink-0 pb-2">
          <DialogTitle className="text-base">Buy WojakCoin</DialogTitle>
          <DialogDescription className="text-xs">Exchanges to get WJK</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 overflow-y-auto min-h-0 py-1 -mx-1 px-1">
          <div className="rounded-md border-2 border-primary/50 p-2.5 bg-primary/10">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <h3 className="font-semibold text-sm">NonKYC</h3>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-primary border border-primary/40 bg-primary/15 px-1.5 py-0.5 rounded">
                Primary
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">WJK/USDT — no KYC</p>
            <Button size="sm" className="w-full gap-1.5 h-8 text-xs" asChild>
              <a href="https://nonkyc.io/market/WJK_USDT" target="_blank" rel="noopener noreferrer">
                Trade Now <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
          <div className="rounded-md border border-border p-2.5 bg-secondary/50">
            <h3 className="font-semibold text-sm mb-0.5">QuTrade</h3>
            <p className="text-xs text-muted-foreground mb-2">WJK/USDT</p>
            <Button size="sm" className="w-full gap-1.5 h-8 text-xs" asChild>
              <a href="https://qutrade.io/en/?market=wjk_usdt" target="_blank" rel="noopener noreferrer">
                Trade Now <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
          <div className="rounded-md border border-border p-2.5 bg-secondary/50">
            <h3 className="font-semibold text-sm mb-0.5">NestEx</h3>
            <p className="text-xs text-muted-foreground mb-2">WJK/USDT</p>
            <Button size="sm" className="w-full gap-1.5 h-8 text-xs" asChild>
              <a href="https://trade.nestex.one/spot/WJK" target="_blank" rel="noopener noreferrer">
                Trade Now <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
          <div className="rounded-md border border-border p-2.5 bg-secondary/50">
            <h3 className="font-semibold text-sm mb-0.5">Rabid Rabbit</h3>
            <p className="text-xs text-muted-foreground mb-2">WJK-USDT</p>
            <Button size="sm" className="w-full gap-1.5 h-8 text-xs" asChild>
              <a href="https://rabid-rabbit.org/account/trade/WJK-USDT" target="_blank" rel="noopener noreferrer">
                Trade Now <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
          <div className="rounded-md border border-border p-2.5 bg-secondary/50">
            <h3 className="font-semibold text-sm mb-0.5">GateVia</h3>
            <p className="text-xs text-muted-foreground mb-2">WJK/LTC, WJK/DOGE</p>
            <Button size="sm" className="w-full gap-1.5 h-8 text-xs" asChild>
              <a href="https://gatevia.io" target="_blank" rel="noopener noreferrer">
                Trade Now <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
          <div className="rounded-md border border-border p-2.5 bg-secondary/50">
            <h3 className="font-semibold text-sm mb-0.5">Komodo</h3>
            <p className="text-xs text-muted-foreground mb-2">WJK on Komodo Platform</p>
            <Button size="sm" className="w-full gap-1.5 h-8 text-xs" asChild>
              <a href="https://app.komodoplatform.com/wallet/wjk" target="_blank" rel="noopener noreferrer">
                Trade Now <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
          <div className="rounded-md border border-border p-2.5 bg-secondary/50">
            <h3 className="font-semibold text-sm mb-0.5">GLEEC</h3>
            <p className="text-xs text-muted-foreground mb-2">WJK on GLEEC DEX</p>
            <Button size="sm" className="w-full gap-1.5 h-8 text-xs" asChild>
              <a href="https://dex.gleec.com/wallet/wjk" target="_blank" rel="noopener noreferrer">
                Trade Now <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
