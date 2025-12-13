const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages } = pagination;

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
