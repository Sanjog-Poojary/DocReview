"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Clock, MapPin, Truck } from "lucide-react";

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
    // TODO: Fetch from blockchain using `id`
    // const p = await contract.getProduct(id);
    // const h = await contract.getProductHistory(id);

    // Mock data
    if (id) {
      setProduct({
        id: id,
        name: "Luxury Handbag",
        manufacturer: "Gucci",
        manufactureDate: "2023-10-15",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Kelley_Blue_Book_logo.svg/1200px-Kelley_Blue_Book_logo.svg.png" // Placeholder
      });

      setHistory([
        { from: "0x000...000", to: "0xMan...Fac", timestamp: "2023-10-15", location: "Florence, Italy (Factory)" },
        { from: "0xMan...Fac", to: "0xDis...Cen", timestamp: "2023-10-20", location: "Milan Distribution Center" },
        { from: "0xDis...Cen", to: "0xSto...NYC", timestamp: "2023-10-25", location: "New York Flagship Store" },
      ]);
    }
  }, [id]);

  if (!product) return <div className="p-10 text-center text-white">Loading provenance...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <div className="flex justify-center items-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-mono">Authenticated by Blockchain</span>
            </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Product Details</h3>
                    <div className="space-y-3">
                        <div>
                            <span className="block text-xs text-gray-500">Manufacturer</span>
                            <span className="font-semibold">{product.manufacturer}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500">Production Date</span>
                            <span className="font-semibold">{product.manufactureDate}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500">Token ID</span>
                            <span className="font-mono text-sm">{product.id}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-2">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-6 flex items-center">
                        <Truck className="w-4 h-4 mr-2" />
                        Provenance Journey
                    </h3>
                    
                    <div className="relative border-l-2 border-gray-700 ml-4 space-y-8 pl-8 pb-4">
                        {history.map((step, idx) => (
                            <div key={idx} className="relative">
                                {/* Dot */}
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-blue-900 border-2 border-blue-500 md:flex items-center justify-center hidden">
                                    <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                </div>
                                
                                <div className="space-y-1">
                                    <div className="flex items-center text-blue-400 text-sm font-semibold">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {step.location}
                                    </div>
                                    <div className="text-gray-300 font-mono text-sm px-2 py-1 bg-gray-900 rounded inline-block">
                                        {step.from.slice(0, 6)}... -> {step.to.slice(0, 6)}...
                                    </div>
                                    <div className="flex items-center text-gray-500 text-xs mt-1">
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
