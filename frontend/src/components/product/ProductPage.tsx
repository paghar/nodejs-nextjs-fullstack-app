import TextBox from "@components/ui/TextBox";
import SelectBox from "@components/ui/SelectBox";
import ProductGrid from "@components/product/ProductGrid";
import Pagination from "@components/product/Pagination";
import { ProductPageProps } from "@data/interface/product";

export default function ProductPage({
  products,
  search,
  sort,
  currentPage,
  totalPages,
  onSearch,
  onSort,
  onPageChange,
}: ProductPageProps) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#e6005c]">Product Catalog</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <TextBox
          value={search}
          onChange={(e) => {
            onSearch(e.target.value);
            onPageChange(1);
          }}
          placeholder="Search products..."
          className="w-full md:w-1/3"
        />
        <SelectBox
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          options={[
            { label: "Sort by Title", value: "title" },
            { label: "Sort by Price (Low to High)", value: "price-asc" },
            { label: "Sort by Price (High to Low)", value: "price-desc" },
          ]}
          className="w-full md:w-1/4"
        />
      </div>

      <ProductGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
