import Image from "next/image";
import Button from "@components/ui/Button";
import { ProductGridProps } from "@data/interface/product";
import { productGridBtn } from "@data/constants/product";

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-between border border-gray-300 rounded-lg shadow-md p-4"
        >
          {/* <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={160}
            className="w-full h-40 object-cover mb-4 rounded"
          /> */}

          <h2 className="text-xl font-semibold text-[#e6005c] mb-1">
            {product.title}
          </h2>

          <p className="text-gray-700 mb-2">${product.price}</p>

          <p className="text-sm text-gray-600 flex-1">
            {product.description}
          </p>

          <div className="mt-4 flex justify-between gap-2">
            <Button variant="destructive" size="sm">
              {productGridBtn.btnDetails}
            </Button>
            <Button size="sm">
              {productGridBtn.btnAddToCart}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
