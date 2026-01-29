"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ScanLine } from "lucide-react";

export default function ConsumerPage() {
  const router = useRouter();
  const [tokenId, setTokenId] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenId) {
      router.push(`/product/${tokenId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border-2 border-teal-500 mb-6 animate-pulse-slow shadow-lg shadow-teal-100">
              <ScanLine className="w-10 h-10 text-teal-600" />
           </div>
           <h1 className="text-3xl font-bold text-teal-900">Verify Product</h1>
           <p className="text-teal-700/70 mt-2">
             Enter the Product ID or Token ID manually to check its authenticity and provenance.
           </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-lg text-teal-900 placeholder-teal-300 transition-all shadow-lg hover:shadow-teal-500/10"
            placeholder="Search Product ID..."
            required
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 w-6 h-6" />
          
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-all shadow-[0_4px_14px_0_rgba(20,184,166,0.39)]"
          >
            Check Authenticity
          </button>
        </form>

        <p className="text-xs text-teal-600/50">
          Tip: You can also scan the QR code directly with your mobile camera.
        </p>
      </div>
    </div>
  );
}
