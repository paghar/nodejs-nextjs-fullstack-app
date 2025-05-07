import Image from "next/image";
import { useState } from "react";
import Cart from "./Cart";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [showCart, setShowCart] = useState(false);

  const cartItems = [
    {
      id: 1,
      title: "Product 1",
      price: 19.99,
      quantity:3
    },
    {
      id: 2,
      title: "Product 2",
      price: 29.99,
      quantity:5
    },
  ];

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Proceeding to checkout...");     
    }
  };

  const handleRemoveItem = (id:number) => {    
    // eslint-disable-next-line no-console
    console.log(`Removing item with id: ${id}`);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src="/globe.svg" alt="Next.js" width={32} height={32} />          
        </div>
        <div className="relative">
          <button
            onClick={() => setShowCart((prev) => !prev)}
            className="bg-[#e6005c] text-white px-4 py-2 rounded hover:bg-[#cc0052]"
          >
            Cart
          </button>
          {showCart && <Cart items={cartItems} onRemove={handleRemoveItem} handleCheckout={handleCheckout} calculateTotal={calculateTotal} />}
        </div>
      </header>
:
      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm p-4 mt-8">
        © {new Date().getFullYear()} Product Store. All rights reserved.
      </footer>
    </div>
  );
}
