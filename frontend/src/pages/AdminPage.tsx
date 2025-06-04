// ─── External Dependencies ────────────────────────────────────────────────
import { GetServerSideProps } from "next";

// ─── Components ───────────────────────────────────────────────────────────
import AddProductWrapper from "@containers/AddProductWrapper";

// ─── Types ────────────────────────────────────────────────────────────────
import { ProductType } from "@data/interface/product";

// ─── Internal Utilities & Context ─────────────────────────────────────────
import { fetchProducts } from "@utils/api/productApi";

// ─── Component ────────────────────────────────────────────────────────────
export default function AdminPage({
  initialProducts,
}: {
  initialProducts: ProductType[];
}) {
  return <AddProductWrapper initialProducts={initialProducts} />;
}

// ─── Server-Side Rendering ────────────────────────────────────────────────
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const products = await fetchProducts();

    return {
      props: {
        initialProducts: products,
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch products:", err);

    return {
      props: {
        initialProducts: [],
      },
    };
  }
};
