import Image from "next/image";
import Cart from "@components/cart/Cart";
import { LayoutProps } from "@data/interface/layout";
import Button from "@components/ui/Button";
import LinkComponent from "@components/ui/LinkComponent";
import { layoutBtn } from "@data/constants/layout";
import { footer } from "@data/constants/layout";

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
          <Button onClick={isOpenCart}>{layoutBtn.cart}</Button>

          {/* Cart Component */}
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
      <nav className="bg-[#e6005c] text-white px-6 py-3 shadow flex gap-6">
        <LinkComponent href="/">{layoutBtn.productCatalog}</LinkComponent>
        <LinkComponent href="/AdminPage">{layoutBtn.adminPanel}</LinkComponent>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm p-4 mt-8">
        {footer}
      </footer>
    </div>
  );
}
