export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">{"WojakCoin"}</h3>
            <p className="text-sm text-muted-foreground">
              {"A peer to peer meme currency serving the internet community created 2017 revived 2025 ."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">{"Resources"}</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://bitcointalk.org/index.php?topic=2089941"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {"Original Announcement (2017)"}
                </a>
              </li>
              <li>
                <a
                  href="https://bitcointalk.org/index.php?topic=5567071.msg66117858#msg66117858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {"Revival Announcement (2025)"}
                </a>
              </li>
              <li>
                <a
                  href="https://miningpoolstats.stream/wojakcoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {"Pool Statistics"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"Mining Guide"}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">{"Community"}</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a href="https://x.com/wojakcoin2017" className="hover:text-foreground transition-colors">
                  {" "}
                  {/* Added official X profile link */}
                  {"X"}
                </a>
              </li>
              <li>
                <a href="https://t.me/wojakcoin2017" className="hover:text-foreground transition-colors">
                  {"Telegram"}
                </a>
              </li>
              <li>
                <a href="https://discord.gg/TKQFCwGDgU" className="hover:text-foreground transition-colors">
                  {"Discord"}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">{"Developers"}</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/WojakCoinProj/wojakcore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {"GitHub"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>{"© 2017-2025 WojakCoin. Built with ❤️ by the wojak community."}</p>
        </div>
      </div>
    </footer>
  )
}
