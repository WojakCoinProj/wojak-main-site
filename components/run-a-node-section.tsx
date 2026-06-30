import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Settings, Play, RefreshCw, Server, Terminal } from "lucide-react"

const RELEASES_URL = "https://github.com/WojakCoinProj/wojakcore/releases/latest"
const SOURCE_URL = "https://github.com/WojakCoinProj/wojakcore"

const params = [
  { label: "Algorithm", value: "SHA-256 (PoW)" },
  { label: "P2P port", value: "20759" },
  { label: "RPC port", value: "20760" },
  { label: "Block time", value: "~2 minutes" },
  { label: "Data directory", value: "~/.wojakcoin" },
  { label: "Config file", value: "~/.wojakcoin/wojakcoin.conf" },
]

const steps = [
  {
    icon: Download,
    title: "1. Download WojakCore",
    body: "Grab the latest WojakCore release for your OS — Linux (x86_64 or ARM64), Windows, or macOS. The archive contains the node daemon (wojakcoind), the CLI (wojakcoin-cli), and the desktop wallet (wojakcoin-qt).",
    link: { label: "WojakCore releases on GitHub", url: RELEASES_URL },
  },
  {
    icon: Settings,
    title: "2. Create a config file",
    body: "Make the data directory and a wojakcoin.conf with RPC enabled (see the example below). Choose a strong rpcpassword. txindex=1 is optional but lets the node serve full transaction lookups.",
  },
  {
    icon: Play,
    title: "3. Start the node",
    body: "Run the daemon headless with wojakcoind -daemon, or just launch the wojakcoin-qt desktop app — it runs a full node and a wallet together. On first run the node connects to peers and begins downloading the chain.",
  },
  {
    icon: RefreshCw,
    title: "4. Let it sync",
    body: "The node downloads and verifies the full WojakCoin blockchain (a one-time process). Track progress with wojakcoin-cli getblockchaininfo (watch \"blocks\" approach \"headers\") and wojakcoin-cli getpeerinfo to confirm connections.",
  },
]

export function RunANodeSection() {
  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Run a WojakCoin Node</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Running a full WojakCore node validates the WojakCoin blockchain yourself, strengthens
            the network, and lets you use your own wallet and RPC without trusting a third party.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {/* Steps */}
          <Card className="border-2">
            <CardHeader className="bg-secondary/50">
              <CardTitle className="text-2xl">Getting started</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ol className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <li key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.body}</p>
                        {step.link && (
                          <a
                            href={step.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-primary hover:underline"
                          >
                            {step.link.label}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </CardContent>
          </Card>

          {/* Example config */}
          <Card className="border-2">
            <CardHeader className="bg-secondary/50">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Example wojakcoin.conf</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-3">
                Place this in <span className="font-mono">~/.wojakcoin/wojakcoin.conf</span> (create
                the folder if it doesn&apos;t exist):
              </p>
              <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed">
                <code>{`server=1
daemon=1
txindex=1
rpcuser=wojak
rpcpassword=CHANGE_ME_to_a_long_random_value
rpcport=20760
# P2P listening port (default)
# port=20759`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Useful commands */}
          <Card className="border-2">
            <CardHeader className="bg-secondary/50">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Useful commands</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed">
                <code>{`# Start the node (headless)
wojakcoind -daemon

# Check sync progress and chain state
wojakcoin-cli getblockchaininfo

# See connected peers
wojakcoin-cli getpeerinfo

# Create / check a wallet address
wojakcoin-cli getnewaddress
wojakcoin-cli getbalance

# Stop the node cleanly
wojakcoin-cli stop`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Network parameters */}
          <Card className="border-2">
            <CardHeader className="bg-secondary/50">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Network parameters</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <dl className="grid gap-4 sm:grid-cols-2">
                {params.map((p, index) => (
                  <div key={index} className="flex flex-col rounded-lg border bg-muted/40 px-4 py-3">
                    <dt className="text-xs text-muted-foreground">{p.label}</dt>
                    <dd className="font-mono font-semibold text-sm break-all">{p.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs text-muted-foreground mt-4">
                To allow inbound connections, forward TCP port <span className="font-mono">20759</span>{" "}
                to your machine. Keep your <span className="font-mono">rpcuser</span>/
                <span className="font-mono">rpcpassword</span> private and never expose the RPC port to
                the public internet.
              </p>
            </CardContent>
          </Card>

          {/* CTAs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Button className="w-full gap-2" asChild>
              <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Download WojakCore
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="w-full gap-2" asChild>
              <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
                Source &amp; build docs
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
