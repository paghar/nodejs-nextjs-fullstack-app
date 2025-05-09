import Image from "next/image";
import Button from "@components/ui/Button";
import { ProductTableProps } from "@data/interface/product";
import { productTableBtn, productTableHeader } from "@data/constants/product";

export default function ProductTable({
  products,
  onDelete,
  onEdit,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
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

        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border border-gray-300">
                {product.title}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <div className="mx-auto h-10 w-10 relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${product.price}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {product.description}
              </td>
              <td className="py-2 px-4 border border-gray-300 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product, index)}
                >
                  {productTableBtn.btnEdit}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(index)}
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
