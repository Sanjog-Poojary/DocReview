"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Clock, MapPin, Truck } from "lucide-react";
import { getProduct, getProductHistory } from "@/lib/web3";

interface HistoryItem {
  from: string;
  to: string;
  timestamp: string;
  location: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (id) {
        setProduct(undefined); // Set loading
        getProduct(id as string).then((p: any) => {
            if (p) {
                setProduct(p);
                getProductHistory(id as string).then(setHistory);
            } else {
                setProduct(null); // Not found or error
            }
        }).catch(() => setProduct(null));
    }
  }, [id]);

  if (product === undefined) return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-teal-800 font-medium">Verifying on Blockchain...</p>
      </div>
  );

  if (product === null) return (
      <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 bg-red-50 rounded-xl border border-red-100">
              <h1 className="text-2xl font-bold text-red-800 mb-2">Product Not Found</h1>
              <p className="text-red-600 mb-4">This ID does not exist on the blockchain registry.</p>
              <a href="/consumer" className="text-teal-600 hover:underline">Scan another product</a>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-2 text-teal-900">{product.name}</h1>
            <div className="flex justify-center items-center space-x-2 text-teal-600 bg-teal-50 px-4 py-2 rounded-full inline-flex border border-teal-100">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span className="font-mono font-bold text-teal-800 uppercase tracking-widest text-sm">Authenticated</span>
            </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-teal-100 shadow-sm">
                    <h3 className="text-teal-500 text-sm uppercase tracking-wider mb-4 font-semibold">Product Details</h3>
                    <div className="space-y-3">
                        <div>
                            <span className="block text-xs text-teal-400">Manufacturer</span>
                            <span className="font-semibold text-teal-900">{product.manufacturer}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-teal-400">Production Date</span>
                            <span className="font-semibold text-teal-900">{product.manufactureDate}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-teal-400">Token ID</span>
                            <span className="font-mono text-sm text-teal-600 bg-teal-50 px-2 py-1 rounded inline-block">{product.id}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-xl border border-teal-100 shadow-sm">
                    <h3 className="text-teal-500 text-sm uppercase tracking-wider mb-6 flex items-center font-semibold">
                        <Truck className="w-4 h-4 mr-2" />
                        Provenance Journey
                    </h3>
                    
                    <div className="relative border-l-2 border-teal-100 ml-4 space-y-8 pl-8 pb-4">
                        {history.map((step, idx) => (
                            <div key={idx} className="relative">
                                {/* Dot */}
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-teal-50 border-2 border-teal-500 md:flex items-center justify-center hidden">
                                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                </div>
                                
                                <div className="space-y-1">
                                    <div className="flex items-center text-teal-700 text-sm font-bold">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {step.location}
                                    </div>
                                    <div className="text-teal-600 font-mono text-sm px-2 py-1 bg-teal-50 rounded inline-block border border-teal-100">
                                        {step.from.slice(0, 6)}... -&gt; {step.to.slice(0, 6)}...
                                    </div>
                                    <div className="flex items-center text-teal-400 text-xs mt-1">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {step.timestamp}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
