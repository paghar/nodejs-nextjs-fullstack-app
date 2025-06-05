// ─── External Dependencies ────────────────────────────────────────────────
import { GetServerSideProps } from "next";

// ─── Components ───────────────────────────────────────────────────────────
import ProductPageWrapper from "@containers/ProductPageWrapper";

// ─── Types ────────────────────────────────────────────────────────────────
import { HomeProps } from "@data/interface";

// ─── Internal Utilities & Context ─────────────────────────────────────────
import { fetchPaginatedProducts } from "@utils/api/productApi";

// ─── Component ────────────────────────────────────────────────────────────
export default function Home({ initialData }: HomeProps) {
  return <ProductPageWrapper {...initialData} />;
}

// ─── Server-Side Rendering ────────────────────────────────────────────────
export const getServerSideProps: GetServerSideProps = async () => {
  const initialData = await fetchPaginatedProducts({
    page: 1,
    limit: 9,
  });

  return {
    props: {
      initialData,
    },
  };
};
