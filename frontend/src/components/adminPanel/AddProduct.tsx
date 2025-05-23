import TextBox from "@components/ui/TextBox";
import Button from "@components/ui/Button";
import ProductTable from "./ProductTable";
import { AddProductProps } from "@data/interface/product";
import FileUpload from "@components/ui/FileUpload";
import { API_BASE_URL } from "@data/constants/public";
import { productBtn } from "@data/constants/product";

export default function AddProduct({
  products,
  form,
  file,
  onChange,
  onAdd,
  onUpdate,
  onEdit,
  onDelete,
  isEditing,  
  handleFileChange
}: AddProductProps) {

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#e6005c]">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>

      {/* Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <TextBox
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Product Title"
        />       
        <TextBox
          type="number"
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="Price"
        />  
        <TextBox
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Enter description"
          multiline
          rows={5}
        />
        <FileUpload
          label="product image"
          accept="image/*"
          onChange={handleFileChange}
          imageUrl={form.image_url ? `${API_BASE_URL}${form.image_url}` : null}
          name={`image_${form.name}`}
          file={file}
        />  
        <div className="col-span-1 md:col-span-2">
          {isEditing ? (
            <Button onClick={onUpdate}>{productBtn.btnEditProduct}</Button>
          ) : (
            <Button onClick={onAdd}>{productBtn.btnAddProduct}</Button>
          )}
        </div>
      </div>

      {/* Product Table */}
      <ProductTable products={products} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}
