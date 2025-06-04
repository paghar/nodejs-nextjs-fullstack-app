"use client";

import { useEffect } from "react";
import ProductPage from "@components/product/ProductPage";
import { fetchPaginatedProducts } from "@utils/api/productApi";
import { PaginatedProducts, ProductType } from "@data/interface/product";
import { getCsrfToken } from "@utils/api/AuthApi";
import { addToCart } from "@utils/api/cartApi";
import { useCart } from "@hooks/useCart";
import {
  useGlobalDispatch,
  useGlobalState,
} from "@context/global/globalContext";
import {
  setCurrentPage,
  setIsLoading,
  setProducts,
  setSearch,
  setSort,
  setTotalPages,
  toggleCartModal,
  toggleLoginModal,
} from "@context/global/globalActions";
import { paginationLimit } from "@data/constants/product";

// ─── Component ─────────────────────────────────────────────────────────────
export default function ProductPageWrapper(initialData: PaginatedProducts) {
  const dispatch = useGlobalDispatch();
  const {
    user,
    products,
    totalPages,
    search,
    sort,
    currentPage,
    isLoading,
  } = useGlobalState();

  const { fetchCart } = useCart(); 
   
  // ─── Init Products from Initial Data ──────────────────────────────────────
  useEffect(() => {
    if (initialData?.products?.length) {
      setProducts(dispatch, initialData.products);     
      setTotalPages(dispatch,Math.ceil(initialData.total / paginationLimit));
    }
  }, [dispatch, initialData]);

  // ─── Fetch Paginated Products ─────────────────────────────────────────────
  useEffect(() => {
    if (search || sort || currentPage !== 1) {
      const fetchData = async () => {
        try {
          setIsLoading(dispatch, true);
          const data = await fetchPaginatedProducts({
            search,
            sort,
            page: currentPage,
            limit: paginationLimit,
          });
          setProducts(dispatch, data.products);
          setTotalPages(dispatch, Math.ceil(data.total / paginationLimit));
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Failed to fetch products:", err);
        } finally {
          setIsLoading(dispatch, false);
        }
      };
      
      fetchData();
    }
  }, [search, sort, currentPage, dispatch]);

  // ─── Add to Cart Handler ──────────────────────────────────────────────────
  const handleAddToCart = async (product: ProductType) => {
    try {
      if (!user?.email) {
        toggleLoginModal(dispatch);
        return;
      }

      const csrfToken = await getCsrfToken();
      if (!csrfToken) throw new Error("CSRF token missing");

      const res = await addToCart(product.id, 1, csrfToken);

      if (res.success) {
        await fetchCart();
        toggleCartModal(dispatch);
      }
    } catch (err) {
      alert(`Failed to add to cart. ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <ProductPage
      products={products}
      search={search}
      sort={sort}
      currentPage={currentPage}
      totalPages={totalPages}
      loading={isLoading}
      onSearch={(value) => setSearch(dispatch, value)}
      onSort={(value) => setSort(dispatch, value)}
      onPageChange={(page) => setCurrentPage(dispatch, page)}
      onAddToCart={handleAddToCart}
    />
  );
}
