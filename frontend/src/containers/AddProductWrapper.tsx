import { useState } from "react";
import AddProduct from "@components/adminPanel/AddProduct";
import {
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "@utils/api/productApi";
import { ProductType } from "@data/interface/product";

interface Props {
  initialProducts: ProductType[];
}

export default function AddProductWrapper({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({
    id: 0,
    name: "",
    price: "",
    image:"",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setForm({
      id: 0,
      name: "",
      image:"",
      price: "",
      description: "",
    });
    setFile(null);
    setIsEditing(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const onAdd = async () => {
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("image", file);

    const newProduct = await createProductAPI(formData);
    setProducts([...products, newProduct]);
    resetForm();
  };

  const onUpdate = async () => {
    if (!form.id) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (file) {
      formData.append("image", file); // optional for updates
    }

    const updatedProduct = await updateProductAPI(form.id, formData);
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    resetForm();
  };

  const onEdit = (product: ProductType) => {
    setForm({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      description: product.description || "",
      image: product.image || "",
    });
    setIsEditing(true);
  };

  const onDelete = async (id: number) => {
    await deleteProductAPI(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  

  return (
    <AddProduct
      products={products}
      form={form}
      onChange={onChange}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onEdit={onEdit}
      onDelete={onDelete}
      isEditing={isEditing}
      handleFileChange={handleFileChange}
    />
  );
}
