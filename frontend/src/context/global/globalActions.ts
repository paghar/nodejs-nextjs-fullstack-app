// ─── Imports ────────────────────────────────────────────────────────────────
import { Dispatch } from "react";
import { GlobalAction } from "./globalTypes";
import { getCurrentUser, logoutUser } from "@utils/api/AuthApi";
import { getCartItems } from "@utils/api/cartApi";
import { User } from "@data/interface/login";
import { CartItem } from "@data/interface/cart";
import { ProductType } from "@data/interface/product";
import { SortOption } from "@data/interface/product";

// ─── User Actions ───────────────────────────────────────────────────────────
export const loadUser = async (dispatch: Dispatch<GlobalAction>) => {
  try {
    const user = await getCurrentUser();

    if (user?.email) {
      dispatch({ type: "SET_USER", payload: user });

      const cart = await getCartItems();
      dispatch({ type: "SET_CART", payload: cart });
    } else {
      dispatch({ type: "LOGOUT_USER" });
    }
  } catch {
    dispatch({ type: "LOGOUT_USER" });
  }
};

export const logout = async (dispatch: Dispatch<GlobalAction>) => {
  try {
    await logoutUser();
  } finally {
    dispatch({ type: "LOGOUT_USER" });
  }
};

export const setCurrentUser = (dispatch: Dispatch<GlobalAction>, user: User) => {
  dispatch({ type: "SET_USER", payload: user });
};

// ─── Modal Actions ──────────────────────────────────────────────────────────
export const toggleLoginModal = (dispatch: Dispatch<GlobalAction>) => {
  dispatch({ type: "TOGGLE_LOGIN_MODAL" });
};

export const toggleCartModal = (dispatch: Dispatch<GlobalAction>) => {
  dispatch({ type: "TOGGLE_CART_MODAL" });
};

// ─── Cart Actions ───────────────────────────────────────────────────────────
export const setCartItems = (dispatch: Dispatch<GlobalAction>, cartItems: CartItem[]) => {
  dispatch({ type: "SET_CART", payload: cartItems });
};

export const clearCart = (dispatch: Dispatch<GlobalAction>) => {
  dispatch({ type: "CLEAR_CART" });
};

// ─── Product Actions ────────────────────────────────────────────────────────
export const setProducts = (dispatch: Dispatch<GlobalAction>, products: ProductType[]) => {
  dispatch({ type: "SET_PRODUCTS", payload: products });
};

export const setTotalPages = (dispatch: Dispatch<GlobalAction>, totalPages: number) => {
  dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
};

export const setSearch = (dispatch: Dispatch<GlobalAction>, search: string) => {
  dispatch({ type: "SET_SEARCH", payload: search });
};

export const setSort = (dispatch: Dispatch<GlobalAction>, sort: SortOption) => {
  dispatch({ type: "SET_SORT", payload: sort });
};

export const setCurrentPage = (dispatch: Dispatch<GlobalAction>, currentPage: number) => {
  dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage });
};

export const setIsLoading = (dispatch: Dispatch<GlobalAction>, isLoading: boolean) => {
  dispatch({ type: "SET_IS_LOADING", payload: isLoading });
};
