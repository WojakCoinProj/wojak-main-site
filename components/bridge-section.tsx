"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, ExternalLink, Puzzle, Send, AlertTriangle, Wallet, Clock, ScanLine, BookOpen, TrendingUp, ShieldCheck, Lock, Coins } from "lucide-react"
import Link from "next/link"

const BRIDGE_PORTAL_URL = "https://wojakcoin-bridge.dedoo.xyz"
const BRIDGE_GUIDE_URL = "https://wojakcoin-bridge.dedoo.xyz/guide"
const WWOJAK_BASE_CONTRACT = "0x867340cfc92a771cd3cffcff056a84490cade7c0"

// Live price comes from /api/wwojak-price (server-side proxy: GeckoTerminal →
// Dexscreener fallback). The chart link points at Dexscreener's token page.
const WWOJAK_PRICE_API = "/api/wwojak-price"
const DEXSCREENER_CHART_URL =
  "https://dexscreener.com/base/0x867340cFC92a771cd3cFFCfF056a84490cAde7C0"

function formatPrice(p: number): string {
  if (p >= 1)
    return p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })
  return p.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 6 })
}

function WWojakPriceCard() {
  const [priceUsd, setPriceUsd] = useState<number | null>(null)
  const [change24h, setChange24h] = useState<number | null>(null)
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await fetch(WWOJAK_PRICE_API, { cache: "no-store" })
        const data = await res.json()
        if (typeof data?.priceUsd !== "number") throw new Error("no price")
        if (!active) return
        setPriceUsd(data.priceUsd)
        setChange24h(typeof data.change24h === "number" ? data.change24h : null)
        setStatus("ok")
      } catch {
        if (active) setStatus("error")
      }
    }
    load()
    const id = setInterval(load, 60000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  const up = change24h !== null && change24h >= 0

  return (
    <Card className="border-2 border-primary/30">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">$wWojakcoin price (Base)</p>
              {status === "ok" ? (
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-bold">
                    ${priceUsd !== null ? formatPrice(priceUsd) : ""}
                  </span>
                  {change24h !== null && (
                    <span className={`text-sm font-medium ${up ? "text-green-500" : "text-red-500"}`}>
                      {up ? "▲" : "▼"} {Math.abs(change24h).toFixed(2)}% 24h
                    </span>
                  )}
                </div>
              ) : status === "loading" ? (
                <span className="text-2xl font-bold text-muted-foreground">Loading…</span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Price unavailable — check Dexscreener
                </span>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href={DEXSCREENER_CHART_URL} target="_blank" rel="noopener noreferrer">
              View chart
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Live on-chain price · wWojakcoin/ETH pool on Base · refreshes every 60s
        </p>
      </CardContent>
    </Card>
  )
}

// Proof-of-reserve: native WJK locked in custody vs. wWojakcoin minted on Base.
const BRIDGE_RESERVE_API = "/api/bridge-reserve"
const RESERVE_DASHBOARD_URL = "https://wojakcoin-bridge.dedoo.xyz/reserve"
const WJK_EXPLORER_ADDRESS = "https://mempool.wojakcoin.cash/address/"
const BASESCAN_TOKEN_URL =
  "https://basescan.org/token/0x867340cfc92a771cd3cffcff056a84490cade7c0"

type ReserveData = {
  ok: boolean
  wrappedSupply: number | null
  nativeLocked: number | null
  delta: number | null
  backedPct: number | null
  status: string | null
  custodyAddress: string | null
  feeBps: number | null
  utxoCount: number | null
}

function fmtAmount(n: number | null): string {
  if (n == null) return "—"
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 })
}

function BridgeReserveCard() {
  const [data, setData] = useState<ReserveData | null>(null)
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await fetch(BRIDGE_RESERVE_API, { cache: "no-store" })
        const d = await res.json()
        if (!active) return
        if (!d?.ok || typeof d.wrappedSupply !== "number" || typeof d.nativeLocked !== "number") {
          setData(null)
          setStatus("error")
          return
        }
        setData(d)
        setStatus("ok")
      } catch {
        if (active) setStatus("error")
      }
    }
    load()
    const id = setInterval(load, 60000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  const backed = data?.backedPct ?? null
  const fullyBacked = backed != null && backed >= 99.5 // small tolerance for timing skew
  const surplus = data?.delta != null && data.delta >= 0
  const fillPct = backed == null ? 0 : Math.max(0, Math.min(backed, 100))

  return (
    <Card className="border-2 border-primary/30">
      <CardHeader className="bg-secondary/50">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Proof of Reserve</CardTitle>
              <p className="text-sm text-muted-foreground">
                Native WJK locked vs. wWojakcoin minted
              </p>
            </div>
          </div>
          {status === "ok" && backed != null && (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                fullyBacked
                  ? "bg-green-500/15 text-green-400 border-green-500/30"
                  : "bg-red-500/15 text-red-400 border-red-500/30"
              }`}
            >
              {fullyBacked ? "● Fully backed" : "● Under-collateralized"}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {status === "loading" ? (
          <p className="text-sm text-muted-foreground">Loading reserve data…</p>
        ) : status === "error" || !data ? (
          <p className="text-sm text-muted-foreground">
            Live reserve data is unavailable right now.{" "}
            <a
              href={RESERVE_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View the bridge reserve dashboard
            </a>
            .
          </p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> Native WJK locked (custody)
                </div>
                <p className="text-2xl font-bold mt-1 break-all">{fmtAmount(data.nativeLocked)}</p>
                <p className="text-xs text-muted-foreground">WJK</p>
              </div>
              <div className="rounded-lg border bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Coins className="h-3.5 w-3.5" /> wWojakcoin minted (Base)
                </div>
                <p className="text-2xl font-bold mt-1 break-all">{fmtAmount(data.wrappedSupply)}</p>
                <p className="text-xs text-muted-foreground">wWJK · total supply</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-medium">Peg check</span>
                <span className={`text-sm font-bold ${fullyBacked ? "text-green-400" : "text-red-400"}`}>
                  {backed != null ? `${backed.toFixed(2)}% backed` : "—"}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${fullyBacked ? "bg-green-500" : "bg-red-500"}`}
                  style={{ width: `${fillPct}%` }}
                />
              </div>
              {data.delta != null && (
                <p className="text-xs text-muted-foreground mt-2">
                  {surplus ? (
                    <span className="text-green-400 font-medium">
                      Surplus +{fmtAmount(data.delta)} WJK
                    </span>
                  ) : (
                    <span className="text-red-400 font-medium">
                      Deficit {fmtAmount(data.delta)} WJK
                    </span>
                  )}{" "}
                  — every wWJK is backed 1:1 by native WJK held in bridge custody
                  {surplus ? ", with a reserve buffer on top" : ""}.
                </p>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm">
              {data.custodyAddress && (
                <div className="rounded-lg border bg-muted/30 px-3 py-2">
                  <div className="text-xs text-muted-foreground mb-0.5">
                    Custody address (multisig)
                  </div>
                  <a
                    href={`${WJK_EXPLORER_ADDRESS}${data.custodyAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs break-all text-primary hover:underline"
                  >
                    {data.custodyAddress}
                  </a>
                </div>
              )}
              <div className="rounded-lg border bg-muted/30 px-3 py-2">
                <div className="text-xs text-muted-foreground mb-0.5">Backed by</div>
                <div className="text-xs">
                  {data.utxoCount != null ? `${data.utxoCount} on-chain UTXOs` : "on-chain UTXOs"}
                  {data.feeBps != null ? ` · ${(data.feeBps / 100).toFixed(2)}% bridge fee` : ""}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
              <a
                href={RESERVE_DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Full proof-of-reserve dashboard <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={BASESCAN_TOKEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Verify wWJK contract on BaseScan <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </>
        )}
        <p className="text-[11px] text-muted-foreground mt-4">
          Live from the bridge reserve endpoint · refreshes every 60s. wWojakcoin is a standard
          ERC-20 wrapper — no mint backdoor or transfer tax; minting is gated 1:1 on verified WJK
          deposits.
        </p>
      </CardContent>
    </Card>
  )
}

const bridgeFacts = [
  { label: "Bridge fee", value: "0.5% (1% max)" },
  { label: "Minimum", value: "2 WJK / 2 wWJK" },
  { label: "Deposit time", value: "20 confirmations (~40 min)" },
  { label: "Withdrawal time", value: "~15–30 min" },
  { label: "Security", value: "2-of-3 relayers" },
  { label: "Max wWJK supply", value: "44,000,000" },
]

const storageWallets = [
  {
    name: "MetaMask",
    description: "Add the Base network and import the $wWojakcoin token contract to hold it in MetaMask.",
    url: "https://metamask.io",
    cta: "Get MetaMask",
  },
  {
    name: "Phantom",
    description: "Multi-chain wallet with Base / Ethereum support — store and manage your $wWojakcoin.",
    url: "https://phantom.com",
    cta: "Get Phantom",
  },
]

const tradeLinks = [
  {
    name: "Dexscreener",
    description: "Live $wWojakcoin price, charts, and liquidity on Base.",
    url: "https://dexscreener.com/base/0x867340cFC92a771cd3cFFCfF056a84490cAde7C0",
    cta: "View on Dexscreener",
  },
  {
    name: "Uniswap",
    description: "Swap $wWojakcoin against ETH and other Base tokens on Uniswap.",
    url: "https://app.uniswap.org/explore/tokens/base/0x867340cfc92a771cd3cffcff056a84490cade7c0",
    cta: "Trade on Uniswap",
  },
]

// Deposit flow (WJK → wWojakcoin), following the official bridge guide.
const steps = [
  {
    icon: Puzzle,
    title: "Connect & enter amount",
    body: "Open the bridge portal and connect your EVM wallet (e.g. MetaMask). Enter the amount — the portal generates OP_RETURN metadata containing your EVM address so wWJK routes to you automatically.",
  },
  {
    icon: Send,
    title: "Send WJK to the custody address",
    body: "Send native WJK to the bridge custody address shown in the portal, with the OP_RETURN metadata attached. Use a self-custody wallet only — never an exchange address.",
    links: [
      {
        label: "Get the Wojak Wallet Extension",
        url: "https://github.com/reallyshadydev/wojak-wallet-extension/releases/latest",
      },
      {
        label: "Use Dedoo (compatible wallet)",
        url: "https://t.me/dedooxyz",
      },
      {
        label: "Get the Android app (APK)",
        url: "https://github.com/WojakCoinProj/wjk-mobile-wallet/releases/latest",
      },
    ],
  },
  {
    icon: ScanLine,
    title: "Confirm your send",
    body: "Click “I’ve Sent” in the portal. It scans the Wojakcoin chain and matches your OP_RETURN to your EVM address — no TXID entry needed.",
  },
  {
    icon: Clock,
    title: "Wait for confirmations",
    body: "Wait for 20 WJK confirmations — Wojak's coinbase/mining maturity, about 40 minutes at 2-minute blocks. Relayers independently verify the deposit (minimum 2 WJK).",
  },
  {
    icon: ArrowLeftRight,
    title: "Claim your wWojakcoin",
    body: "Claim in the portal to mint wWJK to your wallet on Base, minus the 0.5% bridge fee (you pay EVM gas).",
  },
]

export function BridgeSection() {
  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Bridge</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Bridge your $WJK over to $wWojakcoin on Base-ETH anytime.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {/* Live price */}
          <WWojakPriceCard />

          {/* Proof of reserve — native WJK locked vs wWJK minted + peg check */}
          <BridgeReserveCard />

          {/* Open bridge portal */}
          <Card className="border-2 border-primary/40">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <ArrowLeftRight className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">WJK ↔ wWojakcoin Bridge</h3>
                    <p className="text-sm text-muted-foreground">
                      Move WojakCoin between the WJK chain and Base-ETH.
                    </p>
                  </div>
                </div>
                <Button className="gap-2 shrink-0" asChild>
                  <a href={BRIDGE_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                    Open Bridge Portal
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Store $wWojakcoin */}
          <div>
            <h3 className="text-2xl font-bold mb-2 text-center">Store $wWojakcoin</h3>
            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-4">
              $wWojakcoin is an ERC-20 token on Base-ETH, so it&apos;s held in EVM wallets like
              MetaMask and Phantom. Import it using the token contract below.
            </p>
            <div className="mx-auto mb-6 max-w-xl rounded-lg border bg-muted/50 px-4 py-3 text-center">
              <span className="text-xs text-muted-foreground">$wWojakcoin token contract (Base)</span>
              <p className="font-mono text-xs sm:text-sm break-all mt-1">{WWOJAK_BASE_CONTRACT}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {storageWallets.map((sw, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all">
                  <CardHeader className="bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">{sw.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 flex flex-col gap-4">
                    <p className="text-muted-foreground">{sw.description}</p>
                    <Button variant="outline" className="w-full gap-2 mt-auto" asChild>
                      <a href={sw.url} target="_blank" rel="noopener noreferrer">
                        {sw.cta}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trade here */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center">Trade $wWojakcoin</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {tradeLinks.map((link, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all">
                  <CardHeader className="bg-secondary/50">
                    <CardTitle className="text-xl">{link.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 flex flex-col gap-4">
                    <p className="text-muted-foreground">{link.description}</p>
                    <Button className="w-full gap-2 mt-auto" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.cta}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How to bridge */}
          <Card className="border-2">
            <CardHeader className="bg-secondary/50">
              <CardTitle className="text-2xl">How to bridge</CardTitle>
              <p className="text-sm text-muted-foreground">WJK → wWojakcoin (deposit)</p>
            </CardHeader>
            <CardContent className="pt-6">
              <ol className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <li key={index} className="flex gap-4">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold">{step.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.body}</p>
                        {step.links && step.links.length > 0 && (
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                            {step.links.map((l, i) => (
                              <Link
                                key={i}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                              >
                                {l.label}
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>

              {/* Reverse direction */}
              <div className="mt-6 rounded-lg border bg-muted/40 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowLeftRight className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-sm">Going back: wWojakcoin → WJK</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  In the portal, approve the bridge and initiate a withdrawal to your WJK address.
                  Relayers (2-of-3) verify it on-chain and pay out native WJK, minus the bridge fee
                  and a small network fee — typically in 15–30 minutes.
                </p>
              </div>

              <Button variant="outline" className="w-full gap-2 mt-6" asChild>
                <a href={BRIDGE_GUIDE_URL} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4" />
                  Read the full bridge guide
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Key details */}
          <Card className="border-2">
            <CardHeader className="bg-secondary/50">
              <CardTitle className="text-2xl">Key details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <dl className="grid gap-4 sm:grid-cols-2">
                {bridgeFacts.map((fact, index) => (
                  <div key={index} className="flex flex-col rounded-lg border bg-muted/40 px-4 py-3">
                    <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                    <dd className="font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {/* Safety note */}
          <Card className="border-2 border-yellow-500/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bridge safely</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                    <li>
                      The portal is in testing (Phase 1). Bridge a small amount first before sending a
                      larger transfer.
                    </li>
                    <li>
                      Use a self-custody wallet only — never send WJK from or to an exchange address.
                    </li>
                    <li>
                      Verify the custody address shown in the portal against official announcements,
                      and confirm you&apos;re on{" "}
                      <span className="font-mono">wojakcoin-bridge.dedoo.xyz</span> before sending.
                    </li>
                    <li>Withdrawals are irreversible — triple-check your WJK destination address.</li>
                    <li>
                      Phase 1 uses a trusted 2-of-3 relayer set run by the Wojakcoin dev team (not yet
                      trustless).
                    </li>
                    <li>Never share your private keys or seed phrase.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
