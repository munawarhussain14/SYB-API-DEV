import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { debounce, set } from "lodash";
import Pagination from "./pagination";

const Table = ({
  columns = [],
  data = [],
  title,
  loading = false,
  total,
  perPage,
  onChangePage,
  onSearch,
  link,
  addLink,
  onDelete,
  editLink,
  filter = null,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [keywords, setKeywords] = useState("");
  let j = 0;
  let k = 0;
  let l = 0;
  useEffect(() => {
    let tempPages = [];
    if (currentPage + 4 < totalPages) {
      for (var i = currentPage; i <= currentPage + 5; i++) {
        tempPages.push(i);
      }
      setPages(tempPages);
    } else {
    }
  }, [currentPage]);

  useEffect(() => {
    // console.log(data);
  }, []);

  const handleChangePage = (no) => {
    onChangePage(no);
    setCurrentPage(no);
  };

  const getColumn = (row, column) => {
    let value = "";

    if (column.pre) {
      if (column.pre.subField) {
        if (row[column.pre.field])
          value = getColVal(row[column.pre.field][column.pre.subField]);
      } else {
        if (row[column.pre.field]) value = getColVal(row[column.pre.field]);
      }

      if (value != "") {
        value += ", ";
      }
    }

    if (column.subField) {
      if (row[column.field])
        value = getColVal(row[column.field][column.subField]);
    } else {
      if (row[column.field]) value = getColVal(row[column.field]);
    }

    if (column.landing) {
      if (value != "") {
        value += ", ";
      }

      if (column.landing.subField) {
        if (row[column.landing.field])
          value += getColVal(
            row[column.landing.field][column.landing.subField]
          );
      } else {
        if (row[column.landing.field])
          value += getColVal(row[column.landing.field]);
      }
    }

    if (column.type == "link") {
      if (column.subField) {
        if (row[column.field]) {
          return (
            <Link to={"/" + column.link + "/" + row[column.field]["_id"]}>
              {value}
            </Link>
          );
        }
      } else {
        if (row[column.field]) {
          return <Link to={"/" + column.link + "/" + row["_id"]}>{value}</Link>;
        }
      }
    }

    return value == "" ? "None" : value;
  };

  const getColVal = (val) => {
    if (val.length > 30) val = val.substring(0, 20) + "...";
    return val;
  };

  const debouncedSearch = debounce(async (keyword) => {
    onSearch(keyword);
  }, 1000);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {title}
                {"   "}
                {addLink ? (
                  <Link className="btn btn-primary" to={addLink}>
                    <i className="fa fa-plus"></i>
                  </Link>
                ) : (
                  ""
                )}
              </h3>
              {filter ? <filter /> : ""}
              <div className="card-tools">
                <div
                  className="input-group input-group-sm"
                  style={{ width: "150px" }}
                >
                  <input
                    type="text"
                    name="table_search"
                    className="form-control float-right"
                    placeholder="Search"
                    disabled={loading}
                    onChange={async (e) => {
                      setKeywords(e.target.value);
                      //debouncedSearch(e.target.value);
                    }}
                  />

                  <div className="input-group-append">
                    <button
                      onClick={() => {
                        onSearch(keywords);
                      }}
                      className="btn btn-default"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr key="head">
                    {columns.map((element) => (
                      <th
                        key={
                          element.field + (k++)
                        }
                      >
                        {element.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr key="loader">
                      <td colSpan={columns.length}>
                        <Loader />
                      </td>
                    </tr>
                  ) : data.length == 0 ? (
                    <tr key="no_data">
                      <td colSpan={columns.length}>
                        <center>No Data</center>
                      </td>
                    </tr>
                  ) : (
                    data.map((row) => (
                      <tr key={row._id}>
                        {columns.map((column) => {
                          if (column.field == "actions") {
                            return (
                              <td width="10%" key={row._id + column.field+(j++)}>
                                {link ? (
                                  <Link
                                    to={`/${link}/${row._id}`}
                                    className="btn btn-primary py-1 px-2"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                ) : (
                                  ""
                                )}{" "}
                                {editLink ? (
                                  <Link
                                    to={`/${editLink}/${row._id}`}
                                    className="btn btn-success py-1 px-2"
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                ) : (
                                  ""
                                )}{" "}
                                {onDelete ? (
                                  <a
                                    onClick={() => onDelete(row._id)}
                                    className="btn btn-danger py-1 px-2"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </a>
                                ) : (
                                  ""
                                )}
                              </td>
                            );
                          } else {
                            return (
                              <td
                                width={90 / columns.length + "%"}
                                key={
                                  row._id + column.field + (l++)
                                }
                              >
                                {getColumn(row, column)}
                              </td>
                            );
                          }
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="card-footer clearfix">
              {!loading ? (
                <Pagination
                  total={total}
                  perPage={perPage}
                  currentPage={currentPage}
                  link={link}
                  handleChange={handleChangePage}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
