"use client";

import Button from "@components/ui/Button";
import { cartText } from "@data/constants/cart";
import { CartProps } from "@data/interface/cart";

// ─── Component ──────────────────────────────────────────────────────────────
const Cart: React.FC<CartProps> = ({
  items,
  onRemove,
  handleCheckout,
  calculateTotal,
}) => {
  const isEmpty = items.length === 0;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white border rounded-lg shadow-xl z-50 p-4">
      {/* ── Cart Header ───────────────────────────────────────────────────── */}
      <h4 className="text-lg font-semibold text-[#e6005c] mb-3">
        {cartText.cartItems}
      </h4>

      {/* ── Empty Cart ────────────────────────────────────────────────────── */}
      {isEmpty ? (
        <p>{cartText.empty}</p>
      ) : (
        <>
          {/* ── Cart Items ─────────────────────────────────────────────────── */}
          <div className="max-h-80 overflow-y-auto space-y-3 mb-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col border border-gray-200 rounded-lg p-3 shadow-sm"
              >
                {/* ── Item Header ───────────────────────────────────────── */}
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-semibold text-[#e6005c]">
                      {item.product.name}
                    </h5>
                    <p className="text-sm text-gray-600">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <Button variant="link" onClick={() => onRemove(item.id)}>
                    {cartText.removeBtn}
                  </Button>
                </div>

                {/* ── Quantity and Subtotal ───────────────────────────── */}
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>
                    {cartText.quantity}: {item.quantity}
                  </span>
                  <span>
                    {cartText.subtotal}: ${(
                      item.product.price * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Cart Summary ─────────────────────────────────────────────── */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{cartText.subtotal}:</h3>
            <span className="text-[#e6005c] font-bold text-lg">
              {calculateTotal()}
            </span>
          </div>

          {/* ── Checkout Button ───────────────────────────────────────────── */}
          <Button size="sm" className="w-full" disabled onClick={handleCheckout}>
            {cartText.processCheckout}
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
