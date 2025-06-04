import { Dispatch } from "react";
import { Action } from "./globalTypes";
import { getCurrentUser, logoutUser } from "@utils/api/AuthApi";
import { getCartItems } from "@utils/api/cartApi";
import { User } from "@data/interface/login";
import { CartItem } from "@data/interface/cart";

// ─── Load Current User and Cart ──────────────────────────────────────────────
export const loadUser = async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "SET_LOADING", payload: true });

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

// ─── Log Out User ─────────────────────────────────────────────────────────────
export const logout = async (dispatch: Dispatch<Action>) => {
  try {
    await logoutUser();
  } finally {
    dispatch({ type: "LOGOUT_USER" });
  }
};

// ─── Toggle Modals ────────────────────────────────────────────────────────────
export const toggleLoginModal = (dispatch: Dispatch<Action>) => {
  dispatch({ type: "TOGGLE_LOGIN_MODAL" });
};

export const toggleCartModal = (dispatch: Dispatch<Action>) => {
  dispatch({ type: "TOGGLE_CART_MODAL" });
};

// ─── Set State Manually ───────────────────────────────────────────────────────
export const setCurrentUser = (dispatch: Dispatch<Action>, user: User) => {
  dispatch({ type: "SET_USER", payload: user });
};

export const setCartItems = (dispatch: Dispatch<Action>, cartItems: CartItem[]) => {
  dispatch({ type: "SET_CART", payload: cartItems });
};

// ─── Clear Cart ───────────────────────────────────────────────────────────────
export const clearCart = (dispatch: Dispatch<Action>) => {
  dispatch({ type: "CLEAR_CART" });
};
