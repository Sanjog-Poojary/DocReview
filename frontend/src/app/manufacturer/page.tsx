"use client";

import { useState } from "react";
import QRGenerator from "@/components/QRGenerator";
import { Copy, PackagePlus } from "lucide-react";

export default function ManufacturerDashboard() {
  const [productName, setProductName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [createdProduct, setCreatedProduct] = useState<{ id: string; name: string } | null>(null);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call Smart Contract here
    // const tx = await contract.createProduct(productName, manufacturer, "ipfs://...");
    
    // Simulate creation for now
    const mockId = Math.floor(Math.random() * 10000).toString();
    setCreatedProduct({ id: mockId, name: productName });
    alert(`Product created! ID: ${mockId}`);
  };

  const productUrl = createdProduct 
    ? `${window.location.origin}/product/${createdProduct.id}` 
    : "";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center space-x-3">
          <PackagePlus className="w-8 h-8 text-blue-500" />
          <span>Manufacturer Dashboard</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-6">Register New Product</h2>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-500"
                  placeholder="e.g. Luxury Handbag"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Manufacturer Name</label>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-500"
                  placeholder="e.g. Gucci"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-all shadow-lg"
              >
                Mint NFT & Generate QR
              </button>
            </form>
          </div>

          {/* Result */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl border border-gray-700">
            {createdProduct ? (
              <div className="animate-fade-in text-center">
                <h3 className="text-lg font-semibold mb-4 text-green-400">Product Registered!</h3>
                <QRGenerator value={productUrl} />
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400 bg-gray-900 p-2 rounded-lg">
                  <span className="truncate max-w-[200px]">{productUrl}</span>
                  <Copy className="w-4 h-4 cursor-pointer hover:text-white" onClick={() => navigator.clipboard.writeText(productUrl)} />
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                <PackagePlus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Register a product to verify its provenance.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
