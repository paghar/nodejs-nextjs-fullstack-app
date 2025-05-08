import Button from "@components/ui/Button";
import { PaginationProps } from "@data/interface/product";
import { paginationBtn } from "@data/constants/product";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Previous Button */}
      <Button
        variant="pagination"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        {paginationBtn.btnPrev}
      </Button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, idx) => {
        const page = idx + 1;
        const isActive = currentPage === page;

        return (
          <Button
            key={page}
            variant="pagination"
            onClick={() => onPageChange(page)}
            className={isActive ? "bg-[#e6005c] text-white" : ""}
          >
            {page}
          </Button>
        );
      })}

      {/* Next Button */}
      <Button
        variant="pagination"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        {paginationBtn.btnNext}
      </Button>
    </div>
  );
}
