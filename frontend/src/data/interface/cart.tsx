export interface CartItem {
  id: number;
  cart_id: number; 
  product_id: number;
  quantity: number;
  product: {
    id: number;
    image_url: string;
    name: string;
    price: number;   
  }
}

export interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  handleCheckout: () => void;
  calculateTotal: () => string;
}