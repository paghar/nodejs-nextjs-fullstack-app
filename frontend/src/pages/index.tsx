import AdminPage from "@components/AdminPage";
import ProductPage from "@components/ProductPage";
import LayoutWrapper from "@containers/LayoutWraper";

export default function Home() {
 
  return (
    <LayoutWrapper>
      <ProductPage />
    </LayoutWrapper>
 
  //  <AdminPage/>
  );
}