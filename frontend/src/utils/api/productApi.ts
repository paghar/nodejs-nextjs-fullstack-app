import axios from "axios";
import { FetchProductParams, ProductType, SortOption } from "@data/interface/product";
import { API_PRODUCT,API_PRODUCT_PAGINATE } from "@data/constants/public";


export const fetchProducts = async (): Promise<ProductType[]> => {
  const res = await axios.get(API_PRODUCT);
  return res.data;
};

export const createProductAPI = async (data: any) => {
  const res = await axios.post(API_PRODUCT, data);  
  return res.data;
};

export const updateProductAPI = async (id: number, data: any) => {
  const res = await axios.put(`${API_PRODUCT}/${id}`, data);
  return res.data;
};

export const deleteProductAPI = async (id: number) => {
  const res = await axios.delete(`${API_PRODUCT}/${id}`);
  return res.data;
};

export async function fetchPaginatedProducts({
  search = "",
  sort = SortOption.PriceAsc,
  page = 1,
  limit = 9,
}: FetchProductParams) {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (sort) params.append("sort", sort);
  params.append("page", String(page));
  params.append("limit", String(limit));

  const response = await axios.get(`${API_PRODUCT_PAGINATE}${params}`);
  return response.data;
}