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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 border-2 border-purple-500 mb-6 animate-pulse-slow">
              <ScanLine className="w-10 h-10 text-purple-400" />
           </div>
           <h1 className="text-3xl font-bold">Verify Product</h1>
           <p className="text-gray-400 mt-2">
             Enter the Product ID or Token ID manually to check its authenticity and provenance.
           </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-lg placeholder-gray-500 transition-all shadow-lg"
            placeholder="Search Product ID..."
            required
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]"
          >
            Check Authenticity
          </button>
        </form>

        <p className="text-xs text-gray-600">
          Tip: You can also scan the QR code directly with your mobile camera.
        </p>
      </div>
    </div>
  );
}
