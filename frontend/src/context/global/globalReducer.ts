// ─── Types ────────────────────────────────────────────────────────────────
import { GlobalState, Action } from "./globalTypes";

// ─── Initial State ─────────────────────────────────────────────────────────
export const initialState: GlobalState = {
  user: null,
  loading: false,
  showLoginModal: false,
  showCart: false,
  cartItems: [],
};

// ─── Reducer ───────────────────────────────────────────────────────────────
export function globalReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
  case "SET_USER":
    return { ...state, user: action.payload, loading: false };

  case "LOGOUT_USER":
    return { ...state, user: null, loading: false, cartItems: [] };

  case "SET_LOADING":
    return { ...state, loading: action.payload };

  case "TOGGLE_LOGIN_MODAL":
    return { ...state, showLoginModal: !state.showLoginModal };

  case "TOGGLE_CART_MODAL":
    return { ...state, showCart: !state.showCart };

  case "SET_CART":
    return { ...state, cartItems: action.payload };

  case "CLEAR_CART":
    return { ...state, cartItems: [] };

  default:
    return state;
  }
}