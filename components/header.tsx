"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Heart, Menu, X, ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { BuyNowModal } from "./buy-now-modal"
import { DonateModal } from "./donate-modal"
import { ExplorerModal } from "./explorer-modal"

const navigationItems = [
  { href: "/about", label: "About" },
  { href: "/specs", label: "Specs" },
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/security", label: "Security" },
  { href: "/logo", label: "Logo" },
  { href: "/wallets", label: "Wallets" },
  { href: "/bridge", label: "Bridge" },
  { href: "/exchanges", label: "Exchanges" },
  { href: "/pools", label: "Mining Pools" },
  { href: "/community", label: "Community" },
  { href: "/games", label: "Games" },
  { href: "/donations", label: "Donations" },
  { href: "/faucets", label: "Faucets" },
  { href: "/wojakswap", label: "WojakSwap" },
]

function HeaderSocialLinks({
  variant = "bar",
  className = "",
}: {
  variant?: "bar" | "menu"
  className?: string
}) {
  const isMenu = variant === "menu"
  const linkClass = isMenu
    ? "p-3 rounded-lg hover:bg-accent transition-colors"
    : "p-1.5 sm:p-2 rounded-lg hover:bg-accent transition-colors"
  const iconClass = isMenu ? "h-5 w-5" : "h-4 w-4 sm:h-[18px] sm:w-[18px]"

  return (
    <div
      className={`flex items-center shrink-0 gap-0.5 sm:gap-1 ${isMenu ? "flex-wrap justify-center gap-3" : "flex-nowrap"} ${className}`}
    >
      <Link
        href="https://x.com/wojakcoin2017"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="X (Twitter)"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>
      <Link
        href="https://t.me/Wojak_Portal"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="Telegram"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </Link>
      <Link
        href="https://discord.gg/TKQFCwGDgU"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="Discord"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      </Link>
      <Link
        href="https://github.com/WojakCoinProj/wojakcore"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="GitHub"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </Link>
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [buyNowModalOpen, setBuyNowModalOpen] = useState(false)
  const [donateModalOpen, setDonateModalOpen] = useState(false)
  const [explorerModalOpen, setExplorerModalOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isHome ? "bg-background" : "bg-background/80"
      } backdrop-blur-sm border-b border-border`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Top bar: logo + actions */}
        <div className="flex items-center justify-between gap-4 py-2.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0"
          >
            <Image
              src="/wojak-logo.png"
              alt="WojakCoin"
              width={36}
              height={36}
              className="rounded-full shrink-0"
            />
            <span className="font-bold text-base sm:text-lg whitespace-nowrap">
              WojakCoin
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <HeaderSocialLinks variant="bar" className="hidden lg:flex" />

            <div className="hidden lg:block h-6 w-px bg-border mx-0.5 shrink-0" aria-hidden />

            <Button
              variant="default"
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 hidden sm:flex"
              onClick={() => setBuyNowModalOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden md:inline">Buy Now</span>
            </Button>

            <Button
              variant="default"
              size="sm"
              className="gap-1.5 sm:gap-2 bg-primary hover:bg-primary/90 px-2 sm:px-3"
              onClick={() => setExplorerModalOpen(true)}
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Explorer</span>
            </Button>

            <Button
              variant="default"
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 hidden sm:flex"
              onClick={() => setDonateModalOpen(true)}
            >
              <Heart className="h-4 w-4" />
              <span className="hidden md:inline">Donate</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="gap-2 h-11 px-3 shrink-0 border border-border hover:bg-accent hover:border-primary/50"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="font-medium">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Dropdown menu — opens on all screen sizes (header nav collapsed to a Menu button) */}
      {mobileMenuOpen && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-sm max-h-[min(75vh,calc(100dvh-3.5rem))] overflow-y-auto overscroll-contain">
          <div className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg font-medium hover:bg-accent transition-colors active:bg-accent/80"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
              <span className="w-full text-center text-xs text-muted-foreground font-medium">
                Follow WojakCoin
              </span>
              <HeaderSocialLinks variant="menu" />
            </div>
          </div>
        </nav>
      )}

      <BuyNowModal open={buyNowModalOpen} onOpenChange={setBuyNowModalOpen} />
      <DonateModal open={donateModalOpen} onOpenChange={setDonateModalOpen} />
      <ExplorerModal open={explorerModalOpen} onOpenChange={setExplorerModalOpen} />
    </header>
  )
}
