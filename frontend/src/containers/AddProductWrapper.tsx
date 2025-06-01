import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddProduct from "@components/adminPanel/AddProduct";
import {
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "@utils/api/productApi";
import { ProductType } from "@data/interface/product";
import { getCsrfToken } from "@utils/api/AuthApi";

interface Props {
  initialProducts: ProductType[];
}

export default function AddProductWrapper({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: {
      id: 0,
      name: "",
      price: "",
      description: "",
      image_url: "",
    },
  });

  const { reset, setError, setValue } = methods;

  const resetForm = () => {
    reset();
    setFile(null);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const onAdd = async (data: any) => {
    if (!file) {
      setError("root", { type: "manual", message: "Please upload an image." });
      return;
    }

    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      setError("root", { type: "manual", message: "CSRF token is missing." });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("image", file);

    const response = await createProductAPI(formData, csrfToken);
    if (!response.success) {
      setError("root", { type: "manual", message: response.message });
      return;
    }

    setProducts([...products, response.product]);
    resetForm();
  };

  const onUpdate = async (data: any) => {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      setError("root", { type: "manual", message: "CSRF token is missing." });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    if (file) {
      formData.append("image", file);
    }

    const response = await updateProductAPI(data.id, formData, csrfToken);
    if (!response.success) {
      setError("root", { type: "manual", message: response.message });
      return;
    }

    setProducts(products.map((p) => (p.id === response.product.id ? response.product : p)));
    resetForm();
  };

  const onEdit = (product: ProductType) => {
    setValue("id", product.id);
    setValue("name", product.name);
    setValue("price", product.price.toString());
    setValue("description", product.description || "");
    setValue("image_url", product.image_url || "");
    setFile(null);
    setIsEditing(true);
  };

  const onDelete = async (id: number) => {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      setError("root", { type: "manual", message: "CSRF token is missing." });
      return;
    }

    const response = await deleteProductAPI(id, csrfToken);
    if (!response.success) {
      setError("root", { type: "manual", message: response.message });
      return;
    }

    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <FormProvider {...methods}>
      <AddProduct
        products={products}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onEdit={onEdit}
        onDelete={onDelete}
        isEditing={isEditing}
        handleFileChange={handleFileChange}
        file={file}
      />
    </FormProvider>
  );
}
