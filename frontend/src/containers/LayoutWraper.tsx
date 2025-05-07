import Layout from "@components/Layout";
import { ReactNode, useState } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
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
      
  const [showCart, setShowCart] = useState(false);


  const isOpenCart = () => {  
    setShowCart((prev) => !prev);
  };

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

  return(
    <Layout
      showCart={showCart}
      cartItems={cartItems}
      handleRemoveItem={handleRemoveItem}
      handleCheckout={handleCheckout}
      calculateTotal={calculateTotal}
      isOpenCart={isOpenCart}
    >
      {children}
    </Layout>
           
   
  );
}
