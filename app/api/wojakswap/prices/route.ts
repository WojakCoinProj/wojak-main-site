import { NextResponse } from "next/server"
import { BASE_CHAIN_ID } from "@/components/wojakswap/lib/constants"
import { callZeroEx } from "@/components/wojakswap/lib/zeroex"
import { ETH, CBBTC, WWOJAK, USDC, type Token } from "@/components/wojakswap/lib/tokens"
import { rateLimited } from "@/components/wojakswap/lib/rateLimit"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// USD prices change slowly enough; cache so we don't hammer 0x per user/keystroke.
let cache: { at: number; data: Record<string, number> } | null = null
const TTL_MS = 60_000

// Price one token in USDC via 0x, returned as USD per whole token.
async function usdPrice(token: Token, probeBaseUnits: bigint, apiKey: string) {
  const params = new URLSearchParams({
    chainId: String(BASE_CHAIN_ID),
    sellToken: token.address,
    buyToken: USDC.address,
    sellAmount: probeBaseUnits.toString(),
  })
  const { status, data } = await callZeroEx("price", params, apiKey)
  if (status !== 200 || !data?.buyAmount) return null
  const usdc = Number(data.buyAmount) / 10 ** USDC.decimals
  const qty = Number(probeBaseUnits) / 10 ** token.decimals
  return qty > 0 ? usdc / qty : null
}

export async function GET(req: Request) {
  if (rateLimited(req)) {
    return NextResponse.json({ error: "Too many requests — slow down." }, { status: 429 })
  }
  const apiKey = process.env.ZEROX_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Server missing ZEROX_API_KEY" }, { status: 500 })
  }
  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json(cache.data)
  }

  const [eth, cbbtc, woj] = await Promise.all([
    usdPrice(ETH, 1000000000000000000n, apiKey), // 1 ETH (1e18)
    usdPrice(CBBTC, 10000000n, apiKey), // 0.1 cbBTC (8 decimals)
    usdPrice(WWOJAK, 100000000000n, apiKey), // 1,000 wWojak — small enough to read near-spot on the thin pool
  ])

  const data: Record<string, number> = {
    ETH: eth ?? 0,
    WETH: eth ?? 0,
    USDC: 1,
    USDT: 1,
    DAI: 1,
    cbBTC: cbbtc ?? 0,
    wWojak: woj ?? 0,
  }
  cache = { at: Date.now(), data }
  return NextResponse.json(data)
}
