import { Card, CardContent } from "@/components/ui/card"
import { Users, Rocket, Shield, Zap, History, Sparkles } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: History,
      title: "Revived & Relaunched",
      description: "Originally launched in August 2017, WojakCoin has been completely relaunched in 2025 with a fair launch and modern standards.",
    },
    {
      icon: Shield,
      title: "Fair Launch",
      description: "Zero premine (the original had 5% premine) - truly fair distribution for the community.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by the community, for the community. Join thousands of wojak enthusiasts worldwide.",
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
          <h2 className="text-3xl md:text-5xl font-bold text-balance">What is WojakCoin?</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            WojakCoin is a peer-to-peer meme currency that serves the internet community and all those who identify with wojak.
          </p>
        </div>

        {/* Revival Story */}
        <Card className="max-w-4xl mx-auto border-2 mb-8 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">The Revival Story</h3>
                <p className="text-muted-foreground mb-4">
                  WojakCoin was originally launched on <strong>August 14, 2017</strong> with a vision to bring cryptocurrency 
                  awareness through a noob-friendly way to send wojaks across social media platforms. The original project 
                  featured tipping extensions, marketplace ideas, and social media integration concepts that were ahead of their time.
                </p>
                <p className="text-muted-foreground mb-4">
                  In <strong>2025</strong>, we've completely relaunched WojakCoin with a clean slate - a true fair launch with 
                  <strong> zero premine</strong> (the original had a 5% premine), modern security standards, and advanced difficulty 
                  adjustment. We're fulfilling the original roadmap with modern utilities and builds.
                </p>
                <p className="text-muted-foreground">
                  This is more than a revival - it's a complete reimagining of what WojakCoin can be, built on the foundation 
                  of the original vision while embracing today's blockchain technology.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Improvements */}
        <Card className="max-w-4xl mx-auto border-2 mb-8">
          <CardContent className="pt-6">
            <h3 className="text-2xl font-bold text-center mb-6">What's New in the Relaunch?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">Original (2017)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 5% premine</li>
                  <li>• Basic difficulty adjustment</li>
                  <li>• Limited exchange listings</li>
                  <li>• Roadmap items not fully realized</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-semibold mb-2">Relaunch (2025)</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>0% premine</strong> - True fair launch</li>
                  <li>• <strong>DGW-style difficulty adjustment</strong> - Enhanced security</li>
                  <li>• <strong>Multiple exchange listings</strong> - Growing liquidity</li>
                  <li>• <strong>Modern roadmap</strong> - Ordinals, web wallet, extensions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto justify-center">
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

        {/* Mission Statement */}
        <Card className="max-w-4xl mx-auto border-2 border-primary/30 mt-12">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-2">
              We aim to bring awareness to cryptocurrency through a noob-friendly way to send wojaks on various 
              social media sites and bring new people into the cryptocurrency revolution.
            </p>
            <p className="text-muted-foreground">
              Join us in building the future of meme currency - where community, technology, and good vibes come together.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
