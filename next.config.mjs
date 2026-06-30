/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // WalletConnect (pulled in by wagmi/Privy for the WojakSwap tab) ships an
  // optional pino logger whose transports aren't used in the browser. Mark
  // them external so the bundler doesn't try to resolve them.
  webpack: (config) => {
    config.externals.push("pino-pretty", "encoding", "lokijs")
    return config
  },
}

export default nextConfig