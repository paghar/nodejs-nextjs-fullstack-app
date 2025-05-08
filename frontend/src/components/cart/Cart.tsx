import React from "react";
import Button from "@components/ui/Button";
import { cartText } from "@data/constants/cart";
import { CartProps } from "@data/interface/cart";

const Cart: React.FC<CartProps> = ({
  items,
  onRemove,
  handleCheckout,
  calculateTotal,
}) => {
  const isEmpty = items.length === 0;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl z-10 p-4">
      <h4 className="text-lg font-semibold text-[#e6005c] mb-3">
        {cartText.cartItems}
      </h4>

      {isEmpty ? (
        <p>{cartText.empty}</p>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto space-y-3 mb-4">
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

                <Button variant="link" onClick={() => onRemove(item.id)}>
                  {cartText.removeBtn}
                </Button>
              </div>
            ))}
          </div>

          <h3 className="m-4 font-semibold">
            {cartText.Total}: ${calculateTotal()}
          </h3>

          <Button size="sm" onClick={handleCheckout}>
            {cartText.processCheckout}
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
