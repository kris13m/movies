function PageButtons({ page, setPage, totalPages }) {
  return (
    <>
      <div>
        <p>Page {page} </p>
      </div>

      <div>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PageButtons;