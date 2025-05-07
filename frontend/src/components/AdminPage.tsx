import { useState } from "react";
import Image from "next/image";

function Button({ children, onClick, variant = "default", size = "md" }) {
  const baseStyles = "rounded px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-[#e6005c] text-white hover:bg-[#cc0052] focus:ring-[#e6005c]",
    outline: "border border-[#e6005c] text-[#e6005c] hover:bg-gray-100",
    destructive: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
  };
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
}

export default function AdminPage() {
  const [products, setProducts] = useState([
    {
      title: "Sample Product",
      image: "https://via.placeholder.com/50",
      price: "19.99",
      description: "This is a sample product."
    }
  ]);
  const [form, setForm] = useState({ title: "", image: "", price: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddProduct = () => {
    if (!form.title || !form.image || !form.price || !form.description) return;
    setProducts([...products, { ...form }]);
    setForm({ title: "", image: "", price: "", description: "" });
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#e6005c]">Admin - Add Product</h1>

      {/* Add Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          className="border border-gray-400 rounded p-2"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
        />
        <input
          className="border border-gray-400 rounded p-2"
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          className="border border-gray-400 rounded p-2"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          className="border border-gray-400 rounded p-2"
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <div className="col-span-1 md:col-span-2">
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
      </div>

      {/* Product Table */}
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
                <td className="py-2 px-4 border border-gray-300">
                  {/* <Image src="https://picsum.photos/200/300" alt={product.title} width={50} height={50} className="mx-auto" /> */}
                </td>
                <td className="py-2 px-4 border border-gray-300">${product.price}</td>
                <td className="py-2 px-4 border border-gray-300">{product.description}</td>
                <td className="py-2 px-4 border border-gray-300 space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
