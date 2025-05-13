import AddProductWrapper from "@containers/AddProductWrapper";
import { fetchProducts } from "@utils/api/productApi";
import { ProductType } from "@data/interface/product";

export default function AdminPage({ initialProducts }: { initialProducts: ProductType[] }) {
  return <AddProductWrapper initialProducts={initialProducts} />;
}

export const getServerSideProps = async () => {
  try {
    const products = await fetchProducts();
    return {
      props: {
        initialProducts: products,
      },
    };
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return {
      props: {
        initialProducts: [],
      },
    };
  }
};
