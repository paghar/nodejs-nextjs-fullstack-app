"use client";

import Image from "next/image";
import Button from "@components/ui/Button";
import { ProductTableProps } from "@data/interface/product";
import { productTableBtn, productTableHeader } from "@data/constants/product";
import { API_BASE_URL } from "@data/constants/public";

// ─── Component ──────────────────────────────────────────────────────────────
export default function ProductTable({
  products,
  onDelete,
  onEdit,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        {/* ── Table Head ───────────────────────────────────────────────────── */}
        <thead>
          <tr className="bg-gray-100 text-[#e6005c]">
            <th className="py-2 px-4 border border-gray-300">
              {productTableHeader.title}
            </th>
            <th className="py-2 px-4 border border-gray-300">
              {productTableHeader.image}
            </th>
            <th className="py-2 px-4 border border-gray-300">
              {productTableHeader.price}
            </th>
            <th className="py-2 px-4 border border-gray-300">
              {productTableHeader.description}
            </th>
            <th className="py-2 px-4 border border-gray-300">
              {productTableHeader.actions}
            </th>
          </tr>
        </thead>

        {/* ── Table Body ───────────────────────────────────────────────────── */}
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center">
              {/* ── Name ───────────────────────────────────────────── */}
              <td className="py-2 px-4 border border-gray-300">
                {product.name}
              </td>

              {/* ── Image ──────────────────────────────────────────── */}
              <td className="py-2 px-4 border border-gray-300">
                <div className="mx-auto h-10 w-10 relative">
                  <Image
                    src={`${API_BASE_URL}${product.image_url}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              </td>

              {/* ── Price ──────────────────────────────────────────── */}
              <td className="py-2 px-4 border border-gray-300">
                ${product.price}
              </td>

              {/* ── Description ────────────────────────────────────── */}
              <td className="py-2 px-4 border border-gray-300">
                {product.description}
              </td>

              {/* ── Actions ────────────────────────────────────────── */}
              <td className="py-2 px-4 border border-gray-300 space-x-2">
                <Button
                  className="mb-2"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product, product.id)}
                >
                  {productTableBtn.btnEdit}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                >
                  {productTableBtn.btnDelete}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
