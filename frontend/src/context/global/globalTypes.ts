export interface User { 
  name: string;
  email: string;
}

export interface GlobalState {
  user: User | null;
  loading: boolean;
  showLoginModal: boolean;
  showCart: boolean;
}

export type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT_USER" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "TOGGLE_LOGIN_MODAL" }
  | { type: "TOGGLE_CART_MODAL" };