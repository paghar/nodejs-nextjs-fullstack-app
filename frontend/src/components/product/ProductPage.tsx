import TextBox from "@components/ui/TextBox";
import SelectBox from "@components/ui/SelectBox";
import ProductGrid from "@components/product/ProductGrid";
import Pagination from "@components/product/Pagination";
import { ProductPageProps, SortOption, ProductType } from "@data/interface/product";
import { productCatalog } from "@data/constants/product";

export default function ProductPage({
  products,
  search,
  sort,
  currentPage,
  totalPages,
  onSearch,
  onSort,
  onPageChange,
  loading,
  onAddToCart,
}: ProductPageProps & { onAddToCart: (product: ProductType) => void }) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#e6005c]">{productCatalog.title}</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <TextBox
          value={search}
          onChange={(e) => {
            onSearch(e.target.value);
            onPageChange(1);
          }}
          placeholder={productCatalog.searchPlaceholder}
          className="w-full md:w-1/3"
        />
        <SelectBox
          value={sort}
          onChange={(e) => onSort(e.target.value as SortOption)}
          options={productCatalog.sortOptions}
          className="w-full md:w-1/4"
        />
      </div>

      {loading ? (
        <div className="text-center text-lg text-gray-500 py-20">{productCatalog.loading}</div>
      ) : (
        <>         
          <ProductGrid products={products} onAddToCart={onAddToCart} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}
