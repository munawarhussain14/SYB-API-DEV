import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getQueries,
  deleteQuery,
  clearErrors,
} from "../../../actions/queryActions";
import { ALL_QUERIES_RESET } from "../../../constants/queryConstants";
import Table from "../../layout/common/table";

const Queries = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, queries, count, resPerPage } = useSelector(
    (state) => state.queries
  );
  const { isDeleted } = useSelector((state) => state.queries);

  useEffect(() => {
    dispatch(getQueries());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, []);

  useEffect(() => {
    //dispatch(getQueries());
    dispatch({ type: ALL_QUERIES_RESET });

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Query deleted successfully");
      navigate("/queries");
    }
  }, [dispatch, alert, error, isDeleted, navigate, params]);

  const deleteHandler = (id) => {
    dispatch(deleteQuery(id));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const searchHandler = (keyword) => {
    setKeyword(keyword);
  };

  const columns = [
    // {
    //   label: "Query ID",
    //   field: "_id",
    //   sort: "asc",
    // },
    {
      label: "Client",
      field: "name",
      sort: "asc",
    },
    {
      label: "Business",
      field: "list",
      subField: "title",
      sort: "asc",
    },
    {
      label: "Actions",
      field: "actions",
    },
  ];

  return (
    <Fragment>
      <div className="container-fluid">
        <MetaData title={"All Queries"} />
        <Table
          title="Queries"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={queries}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link="queries"
        />
      </div>
    </Fragment>
  );
};

export default Queries;
