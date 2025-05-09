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

export interface AddProductProps {
  products: ProductType[];
  form: ProductType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onUpdate: () => void;
  onEdit: (product: ProductType, index: number) => void;
  onDelete: (index: number) => void;
  isEditing: boolean;
}

export interface ProductTableProps {
  products: ProductType[];
  onDelete: (index: number) => void;
  onEdit: (product: ProductType, index: number) => void;
}