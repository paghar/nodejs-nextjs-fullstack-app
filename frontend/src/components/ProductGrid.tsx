// components/ProductGrid.tsx
interface Product {
    id: number;
    title: string;
    image: string;
    price: string;
    description: string;
  }
  
  interface ProductGridProps {
    products: Product[];
  }
  
  export default function ProductGrid({ products }: ProductGridProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col justify-between">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold text-[#e6005c] mb-1">{product.title}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <p className="text-sm text-gray-600 flex-1">{product.description}</p>
            <div className="mt-4 flex justify-between gap-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">Details</button>
              <button className="bg-[#e6005c] text-white px-4 py-2 rounded hover:bg-[#cc0052]">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  