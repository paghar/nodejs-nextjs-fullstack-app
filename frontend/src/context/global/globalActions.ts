import { Dispatch } from "react";
import { Action } from "./globalTypes";
import { getCurrentUser, logoutUser } from "@utils/api/AuthApi";
import { getCartItems } from "@utils/api/cartApi";

// Load current user and cart (if logged in)
export const loadUser = async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "SET_LOADING", payload: true });

  try {
    const user = await getCurrentUser();

    if (user && user.email) {
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

// Log out user
export const logout = async (dispatch: Dispatch<Action>) => {
  try {
    await logoutUser();
  } finally {
    dispatch({ type: "LOGOUT_USER" });
  }
};

// Toggle login modal
export const toggleLoginModal = (dispatch: Dispatch<Action>) => {
  dispatch({ type: "TOGGLE_LOGIN_MODAL" });
};

// Toggle cart modal
export const toggleCartModal = (dispatch: Dispatch<Action>) => {
  dispatch({ type: "TOGGLE_CART_MODAL" });
};

// Set current user manually (after login)
export const setCurrentUser = (dispatch: Dispatch<Action>, user: any) => {
  dispatch({ type: "SET_USER", payload: user });
};

// Set cart items manually (optional use)
export const setCartItems = (dispatch: Dispatch<Action>, cartItems: any) => {
  dispatch({ type: "SET_CART", payload: cartItems });
};

// Clear cart
export const clearCart = (dispatch: Dispatch<Action>) => {
  dispatch({ type: "CLEAR_CART" });
};
