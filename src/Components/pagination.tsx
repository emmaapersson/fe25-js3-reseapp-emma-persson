interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void;
}

function Pagination ({
    currentPage,
    totalPages,
    onPageChange
}: PaginationProps) {
    return (
        <nav className="pagination" aria-label="Country pages">
            <button 
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
                Previous
            </button>

            <span aria-live="polite">
                Page {currentPage} of {totalPages}
            </span>

            <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            >
                Next
            </button>
        </nav>
    )
}
export default Pagination