"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink } from "lucide-react"
import Link from "next/link"

interface DonateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DonateModal({ open, onOpenChange }: DonateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Donate to WojakCoin</DialogTitle>
          <DialogDescription>Choose how you'd like to support the project</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="rounded-lg border border-border p-4 bg-secondary/50">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Project Donations
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Support marketing, CEX listings, development, giveaways and community rewards
            </p>
            <Button className="w-full gap-2" asChild>
              <Link href="/donations" onClick={() => onOpenChange(false)}>
                View Project Donations
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border border-border p-4 bg-secondary/50">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Developer Donations
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Support the developers who maintain and improve WojakCoin
            </p>
            <Button className="w-full gap-2" variant="outline" asChild>
              <Link href="/donations#developers" onClick={() => onOpenChange(false)}>
                View Developer Donations
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border border-primary/30 p-4 bg-primary/5">
            <p className="text-xs text-muted-foreground text-center">
              💡 You can also visit the full donation page at{" "}
              <Link
                href="https://donations.wojakcoin2017.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                donations.wojakcoin2017.xyz
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
