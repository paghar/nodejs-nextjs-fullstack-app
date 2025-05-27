import Layout from "@components/layout/Layout";
import { cartItems } from "@data/constants/cart";
import { ReactNode, useEffect } from "react";
import { useGlobalDispatch,useGlobalState } from "@context/global/globalContext";
import { loadUser,toggleLoginModal,toggleCartModal } from "@context/global/globalActions";


export default function LayoutWrapper({ children }: { children: ReactNode }) {
   
  const { showLoginModal,showCart }= useGlobalState();
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    loadUser(dispatch); 
  }, [dispatch]);


  const isOpenCart = () => {  
    toggleCartModal(dispatch);    
  };

  const isOpenLoginModal = () => {
    toggleLoginModal(dispatch);  
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