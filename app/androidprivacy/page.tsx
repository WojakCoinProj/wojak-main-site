import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"
import { PageStructuredData } from "@/components/json-ld"

export const metadata = pageMetadata({
  path: "/androidprivacy",
  title: "Android Wallet Privacy Policy",
  description:
    "Privacy policy for the WojakCoin (WJK) Android wallet. A non-custodial wallet that stores your keys on your device and collects no personal data.",
})

const EFFECTIVE_DATE = "June 24, 2026"

export default function AndroidPrivacyPage() {
  return (
    <main className="min-h-screen">
      <PageStructuredData
        path={"/androidprivacy"}
        title={"Android Wallet Privacy Policy"}
        description={"Privacy policy for the WojakCoin (WJK) Android wallet. A non-custodial wallet that stores your keys on your device and collects no personal data."}
      />
      <Header />
      <div className="pt-24 xl:pt-28">
        <article className="container mx-auto px-4 max-w-3xl py-12">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy — WojakCoin Android Wallet</h1>
          <p className="text-sm text-muted-foreground mb-10">Effective date: {EFFECTIVE_DATE}</p>

          <div className="space-y-8 leading-relaxed text-muted-foreground">
            <section>
              <p>
                This Privacy Policy describes how the <strong className="text-foreground">WojakCoin Wallet</strong> Android
                application (package <code className="text-foreground">cash.wojakcoin.wallet</code>, the &quot;App&quot;) handles
                information. The App is a <strong className="text-foreground">non-custodial</strong> cryptocurrency wallet for
                the WojakCoin (WJK) network. We do not operate servers that hold your funds, and we do not require an account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">No personal data collected</h2>
              <p>
                The App does not collect, store, or transmit any personally identifiable information. There is no sign-up, no
                login, and no user account. We do not ask for your name, email, phone number, or any other personal identifier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Keys and wallet data stay on your device</h2>
              <p>
                Your private keys, recovery (seed) phrase, addresses, and wallet settings are generated and stored
                <strong className="text-foreground"> locally on your device only</strong>. They are never sent to us or to any
                third party. Device backup of the App&apos;s data is disabled, so your keys are not copied to cloud backups or
                transferred to other devices through the operating system. You are solely responsible for safeguarding your
                recovery phrase; if you lose it, neither we nor anyone else can recover your funds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Camera</h2>
              <p>
                The App requests camera access for a single purpose: scanning QR codes (for example, payment addresses or bridge
                data). Camera frames are processed <strong className="text-foreground">on your device in real time</strong> to
                read the code. No images or video are stored, uploaded, or shared. You can decline the camera permission and
                still enter information manually.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Network and blockchain data</h2>
              <p>
                To show balances and fees and to broadcast transactions, the App connects to public WojakCoin network nodes and
                public blockchain services (such as block explorers and price endpoints). When the App makes these requests,
                those servers may see your IP address and the public addresses or transactions you look up, as is inherent to
                using any blockchain network. Information recorded on the WojakCoin blockchain — such as addresses, balances, and
                transactions — is <strong className="text-foreground">public by design</strong> and is not controlled by us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">No analytics, ads, or tracking</h2>
              <p>
                The App does not include third-party analytics, advertising, or tracking SDKs. We do not profile you, sell data,
                or share data with third parties for advertising. The App requests only the permissions it needs to function:
                Internet access and (optionally) Camera for QR scanning.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Children</h2>
              <p>
                The App is intended for adults and is not directed to children under 18. We do not knowingly collect information
                from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Security</h2>
              <p>
                Because the App is non-custodial, your security depends on keeping your device and recovery phrase safe. Keys
                never leave the device, and operating-system backup of wallet data is disabled to reduce the risk of key
                exposure. No method of storage is perfectly secure; please use device encryption, a screen lock, and store your
                recovery phrase offline.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be reflected by updating the effective
                date above and posting the revised policy at this URL.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Contact</h2>
              <p>
                Questions about this policy can be sent to{" "}
                <a href="mailto:wojakcoin2017@gmail.com" className="text-primary hover:underline">
                  wojakcoin2017@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  )
}
