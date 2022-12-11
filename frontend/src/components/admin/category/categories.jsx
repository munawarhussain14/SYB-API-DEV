import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../layout/common/table";
import MetaData from "../../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, clearErrors } from "../../../actions/categoryActions";
import {
  ALL_CATEGORY_RESET,
  NEW_CATEGORY_RESET,
  GET_CATEGORY_RESET,
} from "../../../constants/categoryConstants";

const Categories = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { loading, error, options, total, count, resPerPage } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch({ type: NEW_CATEGORY_RESET });
    dispatch(getCategories(keyword, currentPage));
    dispatch({ type: GET_CATEGORY_RESET });
    dispatch({ type: ALL_CATEGORY_RESET });

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, navigate, params, keyword, currentPage]);

  const deleteHandler = (id) => {
    //dispatch(deleteQuery(id));
  };

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const searchHandler = (keyword) => {
    setKeyword(keyword);
  };

  const columns = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Icon",
      field: "icon",
      sort: "asc",
    },
    {
      label: "Parent",
      field: "parent",
      subField: "name",
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
        <MetaData title={"All Categories"} />
        <Table
          title="Categories"
          loading={loading}
          total={total}
          perPage={resPerPage}
          columns={columns}
          data={options}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          // link="categories"
          addLink="new"
          editLink="categories/edit"
        />
      </div>
    </Fragment>
  );
};

export default Categories;
