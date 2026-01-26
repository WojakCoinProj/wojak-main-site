"use client"

export function DevDonationsSection() {
  const donations = [
    {
      developer: "@danny_utxo",
      currency: "Bitcoin",
      address: "bc1qmfugpjv97v2eqa7lf0g7ue0ccqzczk042qtwfw",
      shortAddress: "bc1q...2qtwfw",
    },
    {
      developer: "@senasgr",
      currency: "Ethereum",
      address: "senasgr.eth",
      shortAddress: "senasgr.eth",
    },
  ]

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Support the Developers</h2>
        <p className="text-muted-foreground">
          If you'd like to support the ongoing development of WojakCoin, contributions are appreciated.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {donations.map((donation) => (
          <div key={donation.developer} className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="mb-3">
              <p className="text-sm text-muted-foreground mb-1">{donation.currency}</p>
              <p className="font-semibold text-lg">{donation.developer}</p>
            </div>
            <div className="bg-background rounded-md p-3 mb-3 border border-border">
              <code className="text-sm break-all">{donation.address}</code>
            </div>
            <button
              onClick={() => copyToClipboard(donation.address)}
              className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors text-sm font-medium"
            >
              Copy Address
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">All contributions are voluntary and help maintain the project.</p>
      </div>
    </div>
  )
}
