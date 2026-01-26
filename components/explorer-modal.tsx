"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Search } from "lucide-react"

interface ExplorerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExplorerModal({ open, onOpenChange }: ExplorerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Block Explorers</DialogTitle>
          <DialogDescription>View WojakCoin blockchain data and transactions</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Button variant="outline" className="w-full justify-between h-auto py-4 bg-transparent" asChild>
            <a href="https://explorer.wojakcoin.cash" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Official Explorer</div>
                  <div className="text-xs text-muted-foreground">explorer.wojakcoin.cash</div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-between h-auto py-4 bg-transparent" asChild>
            <a href="https://wojak-explorer.dedoo.xyz/" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Mempool Explorer</div>
                  <div className="text-xs text-muted-foreground">by dedoo.xyz</div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
