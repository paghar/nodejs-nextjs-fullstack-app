export interface User {
  name: string;
  email: string;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface GlobalState {
  user: User | null;
  loading: boolean;
  showLoginModal: boolean;
  showCart: boolean;
  cartItems: CartItem[];
}

export type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT_USER" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "TOGGLE_LOGIN_MODAL" }
  | { type: "TOGGLE_CART_MODAL" }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "CLEAR_CART" };
