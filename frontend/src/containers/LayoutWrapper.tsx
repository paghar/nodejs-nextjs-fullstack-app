"use client";

// ─── External Dependencies ───────────────────────────────
import { ReactNode, useEffect, useState } from "react";

// ─── Components ──────────────────────────────────────────
import Layout from "@components/layout/Layout";
import LoginModal from "@components/userLogin/LoginModal";

// ─── Data & Context ──────────────────────────────────────
import {
  useGlobalDispatch,
  useGlobalState,
} from "@context/global/globalContext";
import {
  logout,
  toggleLoginModal,
  toggleCartModal,
  setCurrentUser,
  setCartItems,
} from "@context/global/globalActions";

// ─── Utilities ───────────────────────────────────────────
import { loginUser, getCsrfToken } from "@utils/api/AuthApi";
import { removeCartItem } from "@utils/api/cartApi";
import { useCart } from "@hooks/useCart";

// ─── Component ───────────────────────────────────────────
export default function LayoutWrapper({ children }: { children: ReactNode }) {

  // ─── State & Dispatch ──────────────────────────────────
  const { showLoginModal, showCart, user,cartItems } = useGlobalState();
  const dispatch = useGlobalDispatch(); 
  const { fetchCart, error } = useCart();
  const [apiError, setApiError] = useState<string | null>(null);

  // ─── Effects ────────────────────────────────────────────
  useEffect(() => {
    fetchCart();    
    if (error) {
      setApiError(error);
    } else {
      setApiError(null);
    }
  }, [error, fetchCart]);

  // ─── Event Handlers ─────────────────────────────────────
  const handleLogin = async (data: { email: string; password: string }) => {
    setApiError(null);
    try {
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        setApiError("CSRF token could not be fetched");
        return;
      }

      const result = await loginUser(data, csrfToken);

      if (result.success) {
        setCurrentUser(dispatch, result.user);
        toggleLoginModal(dispatch);
        fetchCart();
      } else {
        setApiError(result.message || "Login failed");
      }
    } catch {
      setApiError("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logout(dispatch);
    setCartItems(dispatch, []);      
  };

  const isOpenCart = () => toggleCartModal(dispatch);
  const isOpenLoginModal = () => toggleLoginModal(dispatch);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Proceeding to checkout...");
    }
  };


  const handleRemoveItem = async (id: number) => {
    setApiError(null); 

    const result = await removeCartItem(id);

    if (result.success) {
      fetchCart(); // refresh cart on success
    } else {
      setApiError(result.message); // show error from API
    }
  };

  const calculateTotal = () =>
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  // ─── Render ─────────────────────────────────────────────
  return (
    <>
      <Layout
        showCart={showCart}
        cartItems={cartItems}
        handleRemoveItem={handleRemoveItem}
        handleCheckout={handleCheckout}
        calculateTotal={calculateTotal}
        isOpenCart={isOpenCart}
        isOpenLoginModal={isOpenLoginModal}
        showLoginModal={showLoginModal}
        user={user ?? { name: "Guest", email: "" }}
        handleLogout={handleLogout}
      >
        {children}
      </Layout>

      {showLoginModal && (
        <LoginModal
          onClose={isOpenLoginModal}
          onSubmit={handleLogin}
          apiError={apiError}
        />
      )}
    </>
  );
}
