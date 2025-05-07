import Image from "next/image";
import { ReactNode } from "react";

import Cart from "./Cart";

interface LayoutProps {
  cartItems: any[];
  calculateTotal: () => string;
  children: ReactNode;
  handleCheckout: () => void;
  handleRemoveItem: (id: number) => void;
  isOpenCart: () => void;
  showCart: boolean;
}

export default function Layout({
  showCart,
  cartItems,
  handleRemoveItem,
  handleCheckout,
  calculateTotal,
  children,
  isOpenCart,
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src="/globe.svg" alt="Next.js" width={32} height={32} />
        </div>
        <div className="relative">
          <button
            onClick={isOpenCart}
            className="bg-[#e6005c] text-white px-4 py-2 rounded hover:bg-[#cc0052]"
          >
            Cart
          </button>
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

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm p-4 mt-8">
        © {new Date().getFullYear()} Product Store. All rights reserved.
      </footer>
    </div>
  );
}
