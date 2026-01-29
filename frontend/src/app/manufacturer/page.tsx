"use client";

import { useState } from "react";
import QRGenerator from "@/components/QRGenerator";
import { Copy, PackagePlus } from "lucide-react";
import { createProduct } from "@/lib/web3";

export default function ManufacturerDashboard() {
  const [productName, setProductName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<{ id: string; name: string } | null>(null);
  const [status, setStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setCreatedProduct(null);

    try {
        const result = await createProduct(productName, manufacturer);
        // ID is currently "PENDING" in our simplified flow, or random fallback if we kept it.
        // But since we removed fallback, if this succeeds, it's real.
        setCreatedProduct({ id: result.id, name: productName });
        setStatus({ type: 'success', msg: "Minted successfully! Please wait for confirmation." });
        setProductName("");
        setManufacturer("");
    } catch (error) {
        console.error(error);
        setStatus({ type: 'error', msg: "Minting failed. Check console." });
    } finally {
        setLoading(false);
    }
  };

  const productUrl = createdProduct && createdProduct.id !== "PENDING"
    ? `${window.location.origin}/product/${createdProduct.id}` 
    : "";

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center space-x-3 text-teal-900">
          <PackagePlus className="w-8 h-8 text-teal-600" />
          <span>Manufacturer Dashboard</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-xl border border-teal-100 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-teal-800">Register New Product</h2>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-teal-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-teal-900 placeholder-teal-400"
                  placeholder="e.g. Luxury Handbag"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-teal-700 mb-1">Manufacturer Name</label>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-teal-900 placeholder-teal-400"
                  placeholder="e.g. Gucci"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold transition-all shadow-lg text-white ${loading ? 'bg-teal-400 cursor-wait' : 'bg-teal-600 hover:bg-teal-700 hover:shadow-teal-500/30'}`}
              >
                {loading ? "Minting..." : "Mint NFT & Generate QR"}
              </button>
            </form>
            {status && (
                <div className={`mt-4 p-3 rounded-lg text-sm text-center ${status.type === 'success' ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'}`}>
                    {status.msg}
                </div>
            )}
          </div>

          {/* Result */}
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-teal-100 shadow-sm">
            {createdProduct ? (
              <div className="animate-fade-in text-center">
                <h3 className="text-lg font-semibold mb-4 text-teal-700">Product Registered!</h3>
                {createdProduct.id !== "PENDING" ? (
                    <>
                        <QRGenerator value={productUrl} />
                        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-teal-600 bg-teal-50 p-2 rounded-lg border border-teal-100">
                        <span className="truncate max-w-[200px]">{productUrl}</span>
                        <Copy className="w-4 h-4 cursor-pointer hover:text-teal-800" onClick={() => navigator.clipboard.writeText(productUrl)} />
                        </div>
                    </>
                ) : (
                    <div className="p-8 bg-teal-50 rounded-full animate-pulse text-teal-600">
                        Processing Transaction...
                    </div>
                )}
              </div>
            ) : (
              <div className="text-teal-400/50 text-center">
                <PackagePlus className="w-16 h-16 mx-auto mb-4" />
                <p className="text-teal-600/70">Register a product to verify its provenance.</p>
              </div>
            )}
          </div>
      </div>
    </div>
    </div>
  );
}
