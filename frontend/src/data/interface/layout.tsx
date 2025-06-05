// ─── External Dependencies ────────────────────────────────────────────────
import { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────
import { User } from "./login";
import { CartItem } from "./cart";

// ─── Layout ──────────────────────────────────────────────────────────────

export interface LayoutProps {
  cartItems: CartItem[];
  calculateTotal: () => string;
  children: ReactNode;
  handleCheckout: () => void;
  handleRemoveItem: (id: number) => void;
  isOpenCart: () => void;
  showCart: boolean;
  isOpenLoginModal: () => void;
  showLoginModal: boolean;
  user?: User;
  handleLogout: () => void;
}