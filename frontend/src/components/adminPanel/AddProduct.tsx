import TextBox from "@components/ui/TextBox";
import Button from "@components/ui/Button";
import ProductTable from "./ProductTable";
import { AddProductProps } from "../../data/interface/product";

export default function AddProduct({
  products,
  form,
  onChange,
  onAdd,
  onUpdate,
  onEdit,
  onDelete,
  isEditing,
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
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Product Title"
        />
        <TextBox
          type="text"
          name="image"
          value={form.image}
          onChange={onChange}
          placeholder="Image URL"
        />
        <TextBox
          type="number"
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="Price"
        />
        <TextBox
          type="text"
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Description"
        />

        <div className="col-span-1 md:col-span-2">
          {isEditing ? (
            <Button onClick={onUpdate}>Update Product</Button>
          ) : (
            <Button onClick={onAdd}>Add Product</Button>
          )}
        </div>
      </div>

      {/* Product Table */}
      <ProductTable products={products} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}
