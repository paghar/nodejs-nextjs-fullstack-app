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
    <div className="absolute right-0 top-full mt-2 w-96 bg-white border rounded-lg shadow-xl z-50 p-4">
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
                key={item.product.id}
                className="flex flex-col border border-gray-200 rounded-lg p-3 shadow-sm"
              >
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

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{cartText.Total}:</h3>
            <span className="text-[#e6005c] font-bold text-lg">
              {calculateTotal()}
            </span>
          </div>

          <Button size="sm" className="w-full" disabled onClick={handleCheckout}>
            {cartText.processCheckout}
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
