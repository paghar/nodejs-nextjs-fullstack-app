import { useState } from "react";
import AddProduct from "@components/adminPanel/AddProduct";
import { ProductType } from "@data/interface/product";
import {
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "@utils/api/productApi";

export default function AddProductWrapper({ initialProducts }: { initialProducts: ProductType[] }) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);

  const [form, setForm] = useState<ProductType>({
    id: -1,
    title: "",
    image: "",
    price: "",
    description: "",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    if (!form.title || !form.image || !form.price || !form.description) return;

    const newProduct = await createProductAPI({
      title: form.title,
      image_url: form.image,
      price: parseFloat(form.price),
      description: form.description,
      stock_quantity: 10, // or dynamic
    });

    setProducts((prev) => [...prev, newProduct]);
    setForm({ id: -1, title: "", image: "", price: "", description: "" });
  };

  const handleEditProduct = (product: ProductType, index: number) => {
    setForm(product);
    setEditingIndex(index);
  };

  const handleUpdateProduct = async () => {
    if (editingIndex === null) return;

    const updated = await updateProductAPI(form.id, {
      ...form,
      image_url: form.image,
      price: parseFloat(form.price),
    });

    const updatedProducts = [...products];
    updatedProducts[editingIndex] = updated;
    setProducts(updatedProducts);

    setEditingIndex(null);
    setForm({ id: -1, title: "", image: "", price: "", description: "" });
  };

  const handleDelete = async (index: number) => {
    const id = products[index].id;
    await deleteProductAPI(id);
    setProducts((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setForm({ id: -1, title: "", image: "", price: "", description: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
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
      handleFileChange={handleFileChange}
    />
  );
}
