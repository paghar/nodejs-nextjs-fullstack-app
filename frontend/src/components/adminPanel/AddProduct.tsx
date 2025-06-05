"use client";

import { useFormContext } from "react-hook-form";
import TextBox from "@components/ui/TextBox";
import Button from "@components/ui/Button";
import FileUpload from "@components/ui/FileUpload";
import ProductTable from "./ProductTable";
import { API_BASE_URL } from "@data/constants/public";
import { productBtn } from "@data/constants/product";

// ─── Props ──────────────────────────────────────────────────────────────────
interface Props {
  products: any[];
  onAdd: (data: any) => void;
  onUpdate: (data: any) => void;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function AddProduct({
  products,
  onAdd,
  onUpdate,
  onEdit,
  onDelete,
  isEditing,
  handleFileChange,
  file,
}: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext();

  const image_url = getValues("image_url");

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#e6005c]">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit(isEditing ? onUpdate : onAdd)}>
        {errors.root && (
          <p className="text-red-500 text-xl mb-2">{errors.root.message}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* ── Product Name ─────────────────────────────────────────────── */}
          <div>
            <TextBox
              type="text"
              {...register("name", { required: "Product name is required" })}
              placeholder="Product Title"
            />
            {errors.name?.message && typeof errors.name.message === "string" && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* ── Product Price ────────────────────────────────────────────── */}
          <div>
            <TextBox
              type="number"
              {...register("price", { required: "Price is required" })}
              placeholder="Price"
            />
            {errors.price?.message && typeof errors.price.message === "string" && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* ── Product Description ──────────────────────────────────────── */}
          <div>
            <TextBox
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter description"
              multiline
              rows={5}
            />
            {errors.description?.message && typeof errors.description.message === "string" && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* ── Product Image Upload ─────────────────────────────────────── */}
          <FileUpload
            label="Product Image"
            accept="image/*"
            onChange={handleFileChange}
            imageUrl={image_url ? `${API_BASE_URL}${image_url}` : null}
            name="image_upload"
            file={file}
          />

          {/* ── Submit Button ────────────────────────────────────────────── */}
          <div className="col-span-1 md:col-span-2">
            <Button type="submit">
              {isEditing ? productBtn.btnEditProduct : productBtn.btnAddProduct}
            </Button>
          </div>
        </div>
      </form>

      {/* ── Product Table ───────────────────────────────────────────────── */}
      <ProductTable products={products} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}
