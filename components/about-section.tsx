import { Card, CardContent } from "@/components/ui/card"
import { Users, Rocket, Shield, Zap } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by the community, for the community. Join thousands of wojak enthusiasts.",
    },
    {
      icon: Rocket,
      title: "Noob Friendly",
      description: "Easy-to-use and accessible for newcomers to the cryptocurrency revolution.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Advanced DGW-style difficulty adjustment with multiple security protections.",
    },
    {
      icon: Zap,
      title: "Fast Transactions",
      description: "2-minute block times for quick confirmations and efficient transfers.",
    },
  ]

  return (
    <section className="w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">{"What is WojakCoin?"}</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            "Originally launched in 2017 and completely relaunched in 2025, WojakCoin is a peer-to-peer meme currency
            serving the internet community. This clean relaunch features a fair launch with zero premine (the old chain
            had a 5% premine), modern security standards, and advanced difficulty adjustment. We bring cryptocurrency
            awareness through a noob-friendly way to send wojaks across social media."
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto justify-center">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 flex flex-col gap-4 items-center text-center">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
