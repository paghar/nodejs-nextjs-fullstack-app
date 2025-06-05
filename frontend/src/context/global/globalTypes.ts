import { User } from "@data/interface/login";
import { CartItem } from "@data/interface/cart";
import { ProductType, SortOption } from "@data/interface/product";

// ─── Global State ──────────────────────────────────────────────────────────
export interface GlobalState {
  user: User | null;
  loading: boolean;
  showLoginModal: boolean;
  showCart: boolean;
  cartItems: CartItem[];
  products: ProductType[];
  totalPages: number;
  search: string;
  sort: SortOption;
  currentPage: number;
  isLoading: boolean;
  adminProducts: ProductType[];
  file: File | null;
  isEditing: boolean;
}

// ─── Actions ────────────────────────────────────────────────────────────────

// Login modal toggle
export type LoginAction = 
  | { type: "TOGGLE_LOGIN_MODAL" }

// User authentication
export type UserAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT_USER" }  

// Cart management
export type CartAction =
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART_MODAL" }

// Product list and UI state
export type ProductAction =
  | { type: "SET_PRODUCTS"; payload: ProductType[] }
  | { type: "SET_TOTAL_PAGES"; payload: number }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: SortOption }   
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_IS_LOADING"; payload: boolean }

// Product management actions for admin
export type addProductAction =
  | { type: "UPDATE_PRODUCT_Admin"; payload: ProductType[] }
  | { type: "FILE"; payload: File | null }
  | { type:"EDIT_MODE"; payload: boolean }

// Combined global action type
export type GlobalAction = LoginAction | UserAction | CartAction | ProductAction | addProductAction;
