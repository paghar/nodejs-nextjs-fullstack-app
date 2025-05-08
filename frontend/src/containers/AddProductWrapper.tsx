import { useState } from "react";
import AddProduct from "@components/AddProduct";

export interface Product {
  title: string;
  image: string;
  price: string;
  description: string;
}

export default function AddProductWrapper() {
  const [products, setProducts] = useState<Product[]>([
    {
      title: "Sample Product",
      image: "https://via.placeholder.com/50",
      price: "19.99",
      description: "This is a sample product.",
    },
  ]);

  const [form, setForm] = useState<Product>({
    title: "",
    image: "",
    price: "",
    description: "",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (!form.title || !form.image || !form.price || !form.description) return;
    setProducts((prev) => [...prev, { ...form }]);
    setForm({ title: "", image: "", price: "", description: "" });
  };

  const handleEditProduct = (product: Product, index: number) => {
    setForm(product);
    setEditingIndex(index);
  };

  const handleUpdateProduct = () => {
    if (editingIndex === null) return;

    const updatedProducts = [...products];
    updatedProducts[editingIndex] = form;
    setProducts(updatedProducts);

    setEditingIndex(null);
    setForm({ title: "", image: "", price: "", description: "" });
  };

  const handleDelete = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    // Reset form if deleting the one being edited
    if (editingIndex === index) {
      setEditingIndex(null);
      setForm({ title: "", image: "", price: "", description: "" });
    }
  };

  return (
    <AddProduct
      products={products}
      form={form}
      onChange={handleChange}
      onAdd={handleAddProduct}
      onUpdate={handleUpdateProduct}
      onEdit={handleEditProduct}
      onDelete={handleDelete}
      isEditing={editingIndex !== null}
    />
  );
}
