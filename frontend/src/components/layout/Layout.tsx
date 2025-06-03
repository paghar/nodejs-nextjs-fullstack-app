"use client";

import Image from "next/image";
import Cart from "@components/cart/Cart";
import Button from "@components/ui/Button";
import LinkComponent from "@components/ui/LinkComponent";

import { layoutBtn, footer } from "@data/constants/layout";
import { LayoutProps } from "@data/interface/layout";

export default function Layout({
  showCart,
  cartItems,
  handleRemoveItem,
  handleCheckout,
  calculateTotal,
  children,
  isOpenCart,
  isOpenLoginModal,
  user,
  handleLogout
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-100 p-4 shadow">
        <div className="flex items-center space-x-4">
          <Image src="/globe.svg" alt="Logo" width={32} height={32} />
        </div>

        <div className="relative flex items-center gap-3">
          {user?.name !== "Guest" ? (
            <>
              <span className="text-pink-600 font-semibold text-md drop-shadow-sm">
                {user?.name}
              </span>
              <Button onClick={handleLogout}>{layoutBtn.Logout}</Button>
            </>
          ) : (
            <Button onClick={isOpenLoginModal}>{layoutBtn.login}</Button>
          )}

          <Button onClick={isOpenCart}>{layoutBtn.cart}</Button>

          {showCart && (
            <Cart
              items={cartItems}
              onRemove={handleRemoveItem}
              handleCheckout={handleCheckout}
              calculateTotal={calculateTotal}
            />
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex gap-6 bg-[#e6005c] px-6 py-3 text-white shadow">
        <LinkComponent href="/">{layoutBtn.productCatalog}</LinkComponent>
        <LinkComponent href="/AdminPage">{layoutBtn.adminPanel}</LinkComponent>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="mt-8 bg-gray-100 p-4 text-center text-sm">
        {footer}
      </footer>
    </div>
  );
}
