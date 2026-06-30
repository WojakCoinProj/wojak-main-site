'use client';

import { useState, type ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'viem/chains';
import { wagmiConfig } from './wagmi';

function ConfigNeeded() {
  return (
    <div className="config-needed">
      <h1>Almost there 👇</h1>
      <p>
        Set <code>NEXT_PUBLIC_PRIVY_APP_ID</code> in <code>.env.local</code> and
        restart the dev server. Create a free app at{' '}
        <a href="https://dashboard.privy.io" target="_blank" rel="noreferrer">
          dashboard.privy.io
        </a>
        .
      </p>
      <p>
        You&apos;ll also need a free <code>ZEROX_API_KEY</code> from{' '}
        <a href="https://dashboard.0x.org" target="_blank" rel="noreferrer">
          dashboard.0x.org
        </a>{' '}
        for swaps to quote.
      </p>
    </div>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) return <ConfigNeeded />;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#22c55e',
          logo: undefined,
        },
        defaultChain: base,
        supportedChains: [base],
        // External wallets only — no email/embedded wallet login.
        loginMethods: ['wallet'],
        embeddedWallets: {
          createOnLogin: 'off',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
