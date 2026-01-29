"use client";
import { useEffect, useState } from "react";

export default function WalletDebug() {
  const [status, setStatus] = useState<any>({
    window: false,
    ethereum: false,
    isMetaMask: false,
    providerCount: 0
  });

  useEffect(() => {
    const check = () => {
        const win = typeof window !== 'undefined' ? window : null;
        const eth = win?.ethereum;
        setStatus({
            window: !!win,
            ethereum: !!eth,
            isMetaMask: eth?.isMetaMask || false,
            providerCount: 0 // Will update if we detect EIP-6963
        });
    };

    check();
    const interval = setInterval(check, 1000); // Poll every second

    // EIP-6963 Listener
    const onAnnounce = (event: any) => {
        console.log("EIP-6963 Provider Announced:", event.detail);
        setStatus((prev: any) => ({ ...prev, providerCount: prev.providerCount + 1 }));
    };
    window.addEventListener("eip6963:announceProvider", onAnnounce);

    return () => {
        clearInterval(interval);
        window.removeEventListener("eip6963:announceProvider", onAnnounce);
    };
  }, []);

  if (status.ethereum) return null; // Hide if working

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-2 text-xs font-mono z-50 flex justify-between px-4">
        <span>DEBUG: Window: {status.window ? 'OK' : 'MISSING'} | Ethereum Object: {status.ethereum ? 'FOUND' : 'MISSING'} | MetaMask Flag: {status.isMetaMask ? 'YES' : 'NO'} | EIP-6963 Providers: {status.providerCount}</span>
        <span className="font-bold">⚠️ Suboptimal Wallet Environment</span>
    </div>
  );
}
