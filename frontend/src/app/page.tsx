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
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight">ProvChain</h1>
        </div>
        <div>
          {account ? (
            <div className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-400 font-mono border border-gray-700 flex items-center space-x-2">
              <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
              <Copy className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Trust, Verified.
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          The decentralized standard for tracking luxury goods and pharmaceuticals. 
          Prevent counterfeits with immutable blockchain provenance.
        </p>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Manufacturer Card */}
          <Link href="/manufacturer" className="group">
            <div className="p-8 rounded-2xl bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] h-full flex flex-col items-center">
              <Box className="w-16 h-16 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Manufacturers</h3>
              <p className="text-gray-400">
                Register new products, mint digital twins (NFTs), and manage your supply chain.
              </p>
            </div>
          </Link>

          {/* Consumer Card */}
          <Link href="/consumer" className="group">
            <div className="p-8 rounded-2xl bg-gray-800 border border-gray-700 hover:border-purple-500 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] h-full flex flex-col items-center">
              <Scan className="w-16 h-16 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Consumers</h3>
              <p className="text-gray-400">
                Scan QR codes to verify authenticity, check ownership history, and report issues.
              </p>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm">
        Powered by Ethereum & Next.js
      </footer>
    </div>
  );
}
