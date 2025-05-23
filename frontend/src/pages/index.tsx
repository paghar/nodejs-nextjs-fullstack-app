import ProductPageWrapper from "@containers/ProductPageWrapper";
import { HomeProps } from "@data/interface";
import { fetchPaginatedProducts } from "@utils/api/productApi";


export default function Home({ initialData }: HomeProps) { 
  return <ProductPageWrapper {...initialData} />;
}

export async function getServerSideProps() {
  const initialData = await fetchPaginatedProducts({
    page: 1,
    limit: 9,
  }); 

  return {
    props: {
      initialData,
    },
  };
}