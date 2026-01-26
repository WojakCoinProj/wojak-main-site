"use client"

import { useState } from "react"
import { AboutSection } from "./about-section"
import { SpecsSection } from "./specs-section"
import { SecuritySection } from "./security-section"
import { LogoSection } from "./logo-section"
import { MiningPoolsSection } from "./mining-pools-section"
import { CommunitySection } from "./community-section"
import { DevDonationsSection } from "./dev-donations-section"

const tabs = [
  { id: "about", label: "About", component: AboutSection },
  { id: "specs", label: "Specs", component: SpecsSection },
  { id: "security", label: "Security", component: SecuritySection },
  { id: "logo", label: "Logo", component: LogoSection },
  { id: "pools", label: "Mining Pools", component: MiningPoolsSection },
  { id: "community", label: "Community", component: CommunitySection },
  { id: "donations", label: "Dev Donations", component: DevDonationsSection },
]

export function TabbedSections() {
  const [activeTab, setActiveTab] = useState("about")

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || AboutSection

  return (
    <section className="container px-4 py-12 mx-auto max-w-7xl">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card text-muted-foreground hover:bg-card-foreground/10 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300 flex items-center justify-center">
        <ActiveComponent />
      </div>
    </section>
  )
}
