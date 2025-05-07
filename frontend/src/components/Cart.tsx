import React from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  handleCheckout: () => void;
  calculateTotal: () => string;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, handleCheckout,calculateTotal }) => {
  

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl z-10 p-4">
      <h4 className="font-semibold text-[#e6005c] mb-3 text-lg">Cart Items</h4>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border border-gray-300 rounded-md p-3 shadow-sm"
              >
                <div className="flex-1">
                  <h5 className="text-sm font-semibold text-[#e6005c]">
                    {item.title}
                  </h5>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 className="m-4 font-semibold">Total: ${calculateTotal()}</h3>

          <button
            className="w-full bg-[#e6005c] text-white py-2 rounded hover:bg-[#cc0052] font-semibold transition"
            onClick={handleCheckout}
          >
            Process Checkout
          </button>
        </>
      )}

      
    </div>
  );
};

export default Cart;