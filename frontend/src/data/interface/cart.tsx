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