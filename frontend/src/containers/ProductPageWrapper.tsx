// containers/ProductPageWrapper.tsx
import { useState, useEffect, useMemo } from "react";
import ProductPage from "../components/ProductPage";

export default function ProductPageWrapper() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      image: "https://via.placeholder.com/150",
      price: (Math.random() * 100 + 10).toFixed(2),
      description: "This is a sample product description.",
    }));
    setProducts(generated);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "title":
      default:
        result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, search, sort]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginated = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <ProductPage
      products={paginated}
      search={search}
      sort={sort}
      currentPage={currentPage}
      totalPages={totalPages}
      onSearch={setSearch}
      onSort={setSort}
      onPageChange={setCurrentPage}
    />
  );
}
