import { ReactNode } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  handleCheckout: () => void;
  calculateTotal: () => string;
}

export interface LayoutProps {
  cartItems: any[];
  calculateTotal: () => string;
  children: ReactNode;
  handleCheckout: () => void;
  handleRemoveItem: (id: number) => void;
  isOpenCart: () => void;
  showCart: boolean;
}