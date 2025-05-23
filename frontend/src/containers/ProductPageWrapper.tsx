import { useEffect, useState } from "react";
import ProductPage from "@components/product/ProductPage";
import { fetchPaginatedProducts } from "@utils/api/productApi";
import { paginatedProducts, SortOption } from "@data/interface/product";

const totalPage = (total: number, limit: number) => {
  return Math.ceil(total / limit);
};

export default function ProductPageWrapper( initialData : paginatedProducts) {
  const [products, setProducts] = useState(initialData.products || []);
  const [totalPages, setTotalPages] = useState(totalPage(initialData.total,initialData.limit) || 1);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>(SortOption.PriceAsc);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 9;

  useEffect(() => {   
    if (search || sort || currentPage !== 1) {
      setIsLoading(true);
      const fetchData = async () => {
        const data = await fetchPaginatedProducts({
          search,
          sort: sort,
          page: currentPage,
          limit,
        });

        setProducts(data.products);
        setTotalPages(totalPage(data.total,limit));
        setIsLoading(false);
      };

      fetchData();
    }
  }, [search, sort, currentPage]);

  return (
    <ProductPage
      products={products}
      search={search}
      sort={sort}
      currentPage={currentPage}
      totalPages={totalPages}
      onSearch={setSearch}
      onSort={setSort}
      onPageChange={setCurrentPage}
      loading={isLoading}
    />
  );
}
