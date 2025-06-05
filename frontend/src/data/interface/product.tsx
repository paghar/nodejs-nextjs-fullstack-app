// ─── Types ────────────────────────────────────────────────────────────────

export interface ProductType {
  id: number;
  name: string;
  price: string;
  description: string;
  image_url: string;
}

export enum SortOption {
  PriceAsc = "price_asc",
  PriceDesc = "price_desc",
}

// ─── Props ────────────────────────────────────────────────────────────────

export interface ProductPageProps {
  products: ProductType[];
  search: string;
  sort: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onSearch: (value: string) => void;
  onSort: (value: SortOption) => void;
  onPageChange: (page: number) => void;
  onAddToCart: (product: ProductType,quantity:number) => void
}

export interface ProductGridProps {
  products: ProductType[];
  onAddToCart: (product: ProductType,quantity:number) => void
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface AddProductProps {
  products: ProductType[];
  form: ProductType;
  file: File | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAdd: () => void;
  onUpdate: () => void;
  onEdit: (product: ProductType, index: number) => void;
  onDelete: (index: number) => void;
  isEditing: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProductTableProps {
  products: ProductType[];
  onDelete: (index: number) => void;
  onEdit: (product: ProductType, index: number) => void;
}

// ─── API Parameters & Responses ──────────────────────────────────────────

export interface FetchProductParams {
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  products: ProductType[];
  total: number;
  page: number;
  limit: number;
}