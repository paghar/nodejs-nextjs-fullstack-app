import Button from "./ui/Button";
import { Product } from "./AddProduct";

interface ProductTableProps {
  products: Product[];
  onDelete: (index: number) => void;
  onEdit: (product: Product, index: number) => void;
}

export default function ProductTable({ products, onDelete, onEdit }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-[#e6005c]">
            <th className="py-2 px-4 border border-gray-300">Title</th>
            <th className="py-2 px-4 border border-gray-300">Image</th>
            <th className="py-2 px-4 border border-gray-300">Price</th>
            <th className="py-2 px-4 border border-gray-300">Description</th>
            <th className="py-2 px-4 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border border-gray-300">{product.title}</td>
              <td className="py-2 px-4 border border-gray-300"></td>
              <td className="py-2 px-4 border border-gray-300">${product.price}</td>
              <td className="py-2 px-4 border border-gray-300">{product.description}</td>
              <td className="py-2 px-4 border border-gray-300 space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(product, index)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
