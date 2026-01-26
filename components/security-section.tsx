import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function SecuritySection() {
  const securityFeatures = [
    "Fair Launch - 0% Premine",
    "Time Warp Attack Prevention",
    "Hash Rate Manipulation Resistance",
    "Money Supply Overflow Protection",
    "Centralized Alert System Removed",
    "Advanced Difficulty Adjustment (DGW-style)",
    "Enhanced Timestamp Validation",
    "Money Supply Validation",
  ]

  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">{"Security First"}</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            {
              "WojakCoin has been completely modernized with enhanced security features and a clean relaunch. No backward compatibility with the old chain means a fresh start with modern standards. The original 2017 chain had a 5% premine, but the 2025 revival features a completely fair launch with 0% premine."
            }
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-2">
          <CardContent className="pt-8">
            <div className="grid gap-4 md:grid-cols-2">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
