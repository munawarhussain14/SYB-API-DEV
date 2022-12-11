import React, { useEffect, useState } from "react";

const Pagination = ({
  total = 1,
  perPage = 1,
  currentPage = 1,
  handleChange,
}) => {
  const [pageList, setPageList] = useState([]);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    if (total && perPage) {
      let totalPages = Math.ceil(total / perPage);
      console.log(`${total} / ${perPage}`,totalPages);
      setPages(totalPages);
      let pages = [];
      let i = 1;
      let j = currentPage;
      if (currentPage == 1) {
        j = 1;
      } else if (j >= totalPages || totalPages <= 5) {
        j = 1;
      }
      let limit = j + 2;
      setPageList([]);
      for (i = j; i <= (totalPages < 5 ? totalPages : limit); i++) {
        pages.push({ label: i, no: i });
      }
      if (totalPages >= 5) {
        pages.push({ label: "...", no: 0 });
        pages.push({ label: totalPages, no: totalPages });
      }
      setPageList(pages);
      console.log(pages);
    }
  }, [total, perPage]);

  useEffect(() => {}, [currentPage]);

  return pages > 1 ? (
    <ul className="pagination pagination-sm m-0 float-right">
      <li
        onClick={() => {
          handleChange(1);
        }}
        className="page-item"
        style={{ cursor: "pointer" }}
      >
        <a className="page-link">First</a>
      </li>
      <li
        key="0"
        onClick={() => {
          if (currentPage - 1 >= 1) handleChange(currentPage - 1);
        }}
        className={currentPage == 1 ? "page-item disabled" : "page-item"}
        style={{ cursor: "pointer" }}
      >
        <a className="page-link">«</a>
      </li>
      {pageList.map((p) => {
        return (
          <li
            key={p.no}
            style={{ cursor: "pointer" }}
            className={currentPage == p.no ? "page-item active" : "page-item"}
            onClick={() => {
              if (p.no != 0) handleChange(p.no);
            }}
          >
            <a className="page-link">{p.label}</a>
          </li>
        );
      })}
      <li
        key="9999"
        onClick={() => {
          if (currentPage + 1 <= pages) handleChange(currentPage + 1);
        }}
        className={currentPage == total ? "page-item disabled" : "page-item"}
        style={{ cursor: "pointer" }}
      >
        <a className="page-link">»</a>
      </li>
      <li
        key="0099999"
        onClick={() => {
          handleChange(pages);
        }}
        className="page-item"
        style={{ cursor: "pointer" }}
      >
        <a className="page-link">Last</a>
      </li>
    </ul>
  ) : (
    ""
  );
};

export default Pagination;
