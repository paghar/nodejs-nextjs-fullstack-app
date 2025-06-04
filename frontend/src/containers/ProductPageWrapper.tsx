"use client";

import { useEffect, useState } from "react";
import ProductPage from "@components/product/ProductPage";
import { fetchPaginatedProducts } from "@utils/api/productApi";
import { PaginatedProducts, SortOption, ProductType } from "@data/interface/product";
import { getCsrfToken } from "@utils/api/AuthApi";
import { addToCart } from "@utils/api/cartApi";
import { useCart } from "@hooks/useCart";
import {
  useGlobalDispatch,
  useGlobalState,  
} from "@context/global/globalContext";
import { toggleCartModal, toggleLoginModal } from "@context/global/globalActions";

const totalPage = (total: number, limit: number) => Math.ceil(total / limit);

export default function ProductPageWrapper(initialData: PaginatedProducts) {
  const [products, setProducts] = useState(initialData.products || []);
  const [totalPages, setTotalPages] = useState(totalPage(initialData.total, initialData.limit));
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>(SortOption.PriceAsc);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchCart } = useCart();  
  const { user } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const isOpenCart = () => toggleCartModal(dispatch);

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
        setTotalPages(totalPage(data.total, limit));
        setIsLoading(false);
      };

      fetchData();
    }
  }, [search, sort, currentPage]);

  const handleAddToCart = async (product: ProductType) => {
    try {
      if (!user || !user.email) {      
        toggleLoginModal(dispatch);
        return;
      }

      const csrfToken = await getCsrfToken();
      if (!csrfToken) throw new Error("CSRF token missing");

      const res = await addToCart(product.id, 1, csrfToken);     
      if (res.success) {
        fetchCart();
        isOpenCart();
      }

    } catch (err) {
      alert(`Failed to add to cart. ${  err instanceof Error ? err.message : String(err)}`);
    }
  };

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
      onAddToCart={handleAddToCart}
    />
  );
}
