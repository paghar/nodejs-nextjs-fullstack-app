// components/Pagination.tsx
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <div className="flex justify-center mt-8 items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-400 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Prev
        </button>
  
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === idx + 1 ? "bg-[#e6005c] text-white" : "border-gray-400 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {idx + 1}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-400 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    );
  }
  