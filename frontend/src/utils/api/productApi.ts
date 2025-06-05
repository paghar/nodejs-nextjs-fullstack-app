import axios from "axios";
import { FetchProductParams, ProductType, SortOption } from "@data/interface/product";
import { API_PRODUCT, API_PRODUCT_PAGINATE } from "@data/constants/public";

// ─── GET: Fetch all products ────────────────────────────────────────────────
export const fetchProducts = async (): Promise<ProductType[]> => {
  const res = await axios.get(API_PRODUCT);
  return res.data;
};

// ─── POST: Create a new product ─────────────────────────────────────────────
export const createProductAPI = async (
  formData: FormData,
  csrfToken: string
): Promise<{ success: boolean; message: string; product?: any }> => {
  try {
    const res = await axios.post(API_PRODUCT, formData, {
      withCredentials: true,
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    return {
      success: true,
      message: `Product created: ${res.data.name}`,
      product: res.data,
    };
  } catch (err: any) {
    const errorMsg = err?.response?.data?.message || "Failed to create product";
    return { success: false, message: errorMsg };
  }
};

// ─── PUT: Update existing product ───────────────────────────────────────────
export const updateProductAPI = async (
  id: number,
  data: FormData,
  csrfToken: string
): Promise<{ success: boolean; message: string; product?: any }> => {
  try {
    const res = await axios.put(`${API_PRODUCT}/${id}`, data, {
      withCredentials: true,
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    return {
      success: true,
      message: `Updated: ${res.data.name}`,
      product: res.data,
    };
  } catch (err: any) {
    const errorMsg = err?.response?.data?.message || "Update failed";
    return { success: false, message: errorMsg };
  }
};

// ─── DELETE: Delete a product ───────────────────────────────────────────────
export const deleteProductAPI = async (
  id: number,
  csrfToken: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await axios.delete(`${API_PRODUCT}/${id}`, {
      withCredentials: true,
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    return {
      success: true,
      message: `Deleted product with ID ${id}`,
    };
  } catch (err: any) {
    const errorMsg = err?.response?.data?.message || "Deletion failed";
    return { success: false, message: errorMsg };
  }
};

// ─── GET: Fetch paginated products with search and sort ─────────────────────
export async function fetchPaginatedProducts({
  search = "",
  sort = SortOption.PriceAsc,
  page = 1,
  limit = 9,
}: FetchProductParams): Promise<any> {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (sort) params.append("sort", sort);
  params.append("page", String(page));
  params.append("limit", String(limit));

  const response = await axios.get(`${API_PRODUCT_PAGINATE}?${params.toString()}`);
  return response.data;
}
