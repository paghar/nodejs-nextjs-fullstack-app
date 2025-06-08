export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://nodejs-nextjs-fullstack-app.onrender.com";

export const API_PRODUCT = `${API_BASE_URL}/api/products`;
export const API_PRODUCT_PAGINATE = `${API_BASE_URL}/api/products/paginated?`;
