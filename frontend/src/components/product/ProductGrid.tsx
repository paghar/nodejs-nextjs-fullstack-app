import Image from "next/image";
import Button from "@components/ui/Button";
import { ProductGridProps } from "@data/interface/product";
import { productGridBtn } from "@data/constants/product";
import { API_BASE_URL } from "@data/constants/public";
import Quantity from "@components/ui/Quantity";
import { useState } from "react";

// ─── Component ──────────────────────────────────────────────────────────────
export default function ProductGrid({
  products,
  onAddToCart
}: ProductGridProps ) {

  const [quantity, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (productId: number, qty: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };
  
  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-between border border-gray-300 rounded-lg shadow-md p-4"
        >
          {/* ── Product Image ─────────────────────────────────────────────── */}
          <Image
            src={`${API_BASE_URL}/${product.image_url}`}
            alt={product.name}
            width={300}
            height={160}
            className="w-full h-40 object-cover mb-4 rounded"
          />

          {/* ── Product Info ──────────────────────────────────────────────── */}
          <h2 className="text-xl font-semibold text-[#e6005c] mb-1">
            {product.name}
          </h2>
          <p className="text-gray-700 mb-2">${product.price}</p>
          <p className="text-sm text-gray-600 flex-1">
            {product.description}
          </p>

          {/* ── Action Buttons ────────────────────────────────────────────── */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <Quantity value={quantity[product.id] ?? 1} onChange={(val) => handleQuantityChange(product.id, val)} />
            <Button size="sm" onClick={() => onAddToCart(product, quantity[product.id] ?? 1)}>
              {productGridBtn.btnAddToCart}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
