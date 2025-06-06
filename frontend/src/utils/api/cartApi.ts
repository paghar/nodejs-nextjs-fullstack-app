"use client";

import axios from "axios";
import { API_BASE_URL } from "@data/constants/public";
import { getCsrfToken } from "@utils/api/AuthApi";
import { CartItem } from "@data/interface/cart";

// ─── Axios Instance ─────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── GET: Fetch Cart Items ──────────────────────────────────────────────────
export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const res = await api.get("/api/cart");
    return res?.data?.cartItems || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching cart:", error);
    return [];
  }
};

// ─── POST: Add Product to Cart ──────────────────────────────────────────────
export const addToCart = async (
  productId: number,
  quantity: number,
  csrfToken: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await api.post(
      "/api/cart/add",
      { productId, quantity },
      {
        headers: { "X-CSRF-Token": csrfToken },
      }
    );
    return { success: true, message: "Item added" };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error("Add to cart error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to add item",
    };
  }
};

// ─── DELETE: Remove Specific Item ───────────────────────────────────────────
export const removeCartItem = async (
  cartItemId: number
): Promise<{ success: boolean; message: string }> => {
  try {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      return { success: false, message: "CSRF token could not be fetched" };
    }

    await api.delete(`/api/cart/item/${cartItemId}`, {
      headers: { "X-CSRF-Token": csrfToken },
    });

    return { success: true, message: "Item removed successfully" };
  } catch (err: any) {
    const errorMsg = err?.response?.data?.message || "Remove item failed";
    return { success: false, message: errorMsg };
  }
};

// ─── DELETE: Clear Entire Cart ──────────────────────────────────────────────
export const clearCart = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      return { success: false, message: "CSRF token could not be fetched" };
    }

    await api.delete("/api/cart/clear", {
      headers: { "X-CSRF-Token": csrfToken },
    });

    return { success: true, message: "Cart cleared successfully" };
  } catch (err: any) {
    const errorMsg = err?.response?.data?.message || "Clear cart failed";
    return { success: false, message: errorMsg };
  }
};
