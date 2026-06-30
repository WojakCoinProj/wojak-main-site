'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';
import { shortAddress } from './lib/format';

export function ConnectButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { address } = useAccount();

  if (!ready) {
    return (
      <button className="btn btn-ghost btn-connect" disabled>
        …
      </button>
    );
  }

  if (!authenticated) {
    return (
      <button className="btn btn-accent btn-connect" onClick={login}>
        Connect Wallet
      </button>
    );
  }

  return (
    <button
      className="btn-pill"
      onClick={logout}
      title="Click to disconnect"
    >
      <span className="addr-dot" />
      {address ? shortAddress(address) : 'Connected'}
    </button>
  );
}
