"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddProduct from "@components/adminPanel/AddProduct";
import {
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "@utils/api/productApi";
import { getCsrfToken } from "@utils/api/AuthApi";
import { ProductType } from "@data/interface/product";
import {
  useGlobalDispatch,
  useGlobalState,
} from "@context/global/globalContext";
import {
  setAdminProducts,
  setFile,
  setEditMode,
} from "@context/global/globalActions";

// ─── Props ──────────────────────────────────────────────────────────────────
interface Props {
  initialProducts: ProductType[];
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function AddProductWrapper({ initialProducts }: Props) {
  const dispatch = useGlobalDispatch();
  const { adminProducts, file, isEditing } = useGlobalState();

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

  // ─── Init Products from Props ─────────────────────────────────────────────
  useEffect(() => {
    setAdminProducts(dispatch, initialProducts);
  }, [dispatch, initialProducts]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const resetForm = () => {
    reset();
    setFile(dispatch, null);
    setEditMode(dispatch, false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(dispatch, e.target.files?.[0] || null);
  };

  // ─── CRUD Handlers ────────────────────────────────────────────────────────
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

    setAdminProducts(dispatch, [...adminProducts, response.product]);
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

    setAdminProducts(
      dispatch,
      adminProducts.map((p) => (p.id === data.id ? response.product : p))
    );
    resetForm();
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

    setAdminProducts(dispatch, adminProducts.filter((p) => p.id !== id));
  };

  const onEdit = (product: ProductType) => {
    setValue("id", product.id);
    setValue("name", product.name);
    setValue("price", product.price.toString());
    setValue("description", product.description || "");
    setValue("image_url", product.image_url || "");
    setFile(dispatch, null);
    setEditMode(dispatch, true);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <FormProvider {...methods}>
      <AddProduct
        products={adminProducts}
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
