import { useState } from "react";
import AddProduct from "@components/adminPanel/AddProduct";
import { ProductType } from "@data/interface/product";

export default function AddProductWrapper() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      title: "Sample Product",
      image: "https://loremflickr.com/320/240/dog",
      price: "19.99",
      description: "This is a sample product.",
      id: 0
    },
  ]);

  const [form, setForm] = useState<ProductType>({
    id: -1, // Default id value
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
    setForm({ id: -1, title: "", image: "", price: "", description: "" });
  };

  const handleEditProduct = (product: ProductType, index: number) => {
    setForm(product);
    setEditingIndex(index);
  };

  const handleUpdateProduct = () => {
    if (editingIndex === null) return;

    const updatedProducts = [...products];
    updatedProducts[editingIndex] = form;
    setProducts(updatedProducts);

    setEditingIndex(null);
    setForm({ id: -1, title: "", image: "", price: "", description: "" });
  };

  const handleDelete = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    // Reset form if deleting the one being edited
    if (editingIndex === index) {
      setEditingIndex(null);
      setForm({ id: -1, title: "", image: "", price: "", description: "" });
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
