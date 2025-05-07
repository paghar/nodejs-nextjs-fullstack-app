import { useState, useEffect, useMemo } from "react";

export default function ProductPage() {
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
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#e6005c]">Product Catalog</h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-400 p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border border-gray-400 p-2 rounded w-full md:w-1/4"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="price-asc">Sort by Price (Low to High)</option>
          <option value="price-desc">Sort by Price (High to Low)</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold text-[#e6005c] mb-1">
              {product.title}
            </h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <p className="text-sm text-gray-600 flex-1">{product.description}</p>
            <div className="mt-4 flex justify-between gap-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
                Details
              </button>
              <button className="bg-[#e6005c] text-white px-4 py-2 rounded hover:bg-[#cc0052]">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination with Prev/Next */}
      <div className="flex justify-center mt-8 items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-400 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === idx + 1
                ? "bg-[#e6005c] text-white"
                : "border-gray-400 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-400 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
