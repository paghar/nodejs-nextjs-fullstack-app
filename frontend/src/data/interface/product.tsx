export interface ProductType {
  id: number;
  title: string;
  image: string;
  price: string;
  description: string;
}

export interface ProductPageProps {
  products: ProductType[];
  search: string;
  sort: string;
  currentPage: number;
  totalPages: number;
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  onPageChange: (page: number) => void;
}

export interface ProductGridProps {
  products: ProductType[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}