// ─── Types ────────────────────────────────────────────────────────────────
import { SortOption } from "@data/interface/product";
import { GlobalState, GlobalAction } from "./globalTypes";

// ─── Initial State ─────────────────────────────────────────────────────────
export const initialState: GlobalState = {
  user: null,
  loading: false,
  showLoginModal: false,
  showCart: false,
  cartItems: [],
  products: [],
  totalPages: 0,
  search: "",
  sort: SortOption.PriceAsc,
  currentPage: 1,
  isLoading: false,
};

// ─── Reducer ───────────────────────────────────────────────────────────────
export function globalReducer(
  state: GlobalState,
  action: GlobalAction
): GlobalState {
  switch (action.type) {
  case "TOGGLE_LOGIN_MODAL":
    return { ...state, showLoginModal: !state.showLoginModal };

  case "SET_USER":
    return { ...state, user: action.payload, loading: false };

  case "LOGOUT_USER":
    return {
      ...state,
      user: null,
      cartItems: [],
      loading: false,
    };

  case "SET_CART":
    return { ...state, cartItems: action.payload };

  case "CLEAR_CART":
    return { ...state, cartItems: [] };

  case "TOGGLE_CART_MODAL":
    return { ...state, showCart: !state.showCart };

  case "SET_PRODUCTS":
    return { ...state, products: action.payload };

  case "SET_TOTAL_PAGES":
    return { ...state, totalPages: action.payload };

  case "SET_SEARCH":
    return { ...state, search: action.payload, currentPage: 1 };

  case "SET_SORT":
    return { ...state, sort: action.payload, currentPage: 1 };

  case "SET_CURRENT_PAGE":
    return { ...state, currentPage: action.payload };

  case "SET_IS_LOADING":
    return { ...state, isLoading: action.payload };

  default: {    
    return state;
  }
  }
}
