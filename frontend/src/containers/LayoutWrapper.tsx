import Layout from "@components/layout/Layout";
import { cartItems } from "@data/constants/cart";
import { ReactNode, useEffect, useState } from "react";
import { useGlobalDispatch } from "@context/global/globalContext";
import { loadUser } from "@context/global/globalActions";


export default function LayoutWrapper({ children }: { children: ReactNode }) {
    
  const [showCart, setShowCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    loadUser(dispatch); 
  }, [dispatch]);


  const isOpenCart = () => {  
    setShowCart((prev) => !prev);
  };

  const isOpenLoginModal = () => {
    setShowLoginModal((prev) => !prev);
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
      isOpenLoginModal={isOpenLoginModal}
      showLoginModal={showLoginModal}
    >
      {children}
    </Layout>
  );
}