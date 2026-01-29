"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Scan, ShieldCheck, Box } from "lucide-react";
import { connectWallet } from "@/lib/web3";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setAccount(wallet.address);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-teal-100/50 bg-white/50 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-8 h-8 text-teal-600" />
          <h1 className="text-2xl font-bold tracking-tight text-teal-900">ProvChain</h1>
        </div>
        <div>
          {account ? (
            <div className="px-4 py-2 bg-teal-50 rounded-lg text-sm text-teal-700 font-mono border border-teal-200 flex items-center space-x-2">
              <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
              <Copy className="w-4 h-4 cursor-pointer hover:text-teal-900" />
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all shadow-[0_4px_14px_0_rgba(20,184,166,0.39)]"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-teal-900">
          Trust, Verified.
        </h2>
        <p className="text-xl text-teal-700/80 max-w-2xl mb-12 font-medium">
          The decentralized standard for tracking luxury goods and pharmaceuticals. 
          Prevent counterfeits with immutable blockchain provenance.
        </p>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Manufacturer Card */}
          <Link href="/manufacturer" className="group">
            <div className="p-8 rounded-2xl bg-white border border-teal-100 hover:border-teal-500 transition-all hover:shadow-[0_10px_30px_rgba(20,184,166,0.2)] h-full flex flex-col items-center">
              <div className="bg-teal-50 p-4 rounded-full mb-6 group-hover:bg-teal-100 transition-colors">
                 <Box className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-900">Manufacturers</h3>
              <p className="text-teal-700/70">
                Register new products, mint digital twins (NFTs), and manage your supply chain.
              </p>
            </div>
          </Link>

          {/* Consumer Card */}
          <Link href="/consumer" className="group">
            <div className="p-8 rounded-2xl bg-white border border-teal-100 hover:border-teal-500 transition-all hover:shadow-[0_10px_30px_rgba(20,184,166,0.2)] h-full flex flex-col items-center">
              <div className="bg-teal-50 p-4 rounded-full mb-6 group-hover:bg-teal-100 transition-colors">
                  <Scan className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-900">Consumers</h3>
              <p className="text-teal-700/70">
                Scan QR codes to verify authenticity, check ownership history, and report issues.
              </p>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-teal-600/50 text-sm">
        Powered by Ethereum & Next.js
      </footer>
    </div>
  );
}
