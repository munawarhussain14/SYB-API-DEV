import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAll, remove, clearErrors } from "../../../actions/pageActions";
import { ALL_PAGE_RESET } from "../../../constants/pageConstants";
import Table from "../../layout/common/table";

const Pages = () => {
  const pageName = "Pages";
  const singleName = "Page";
  const route = "pages";
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, pages, count, resPerPage } = useSelector(
    (state) => state.pages
  );
  const { isDeleted } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(getAll());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, []);

  useEffect(() => {
    //dispatch(getAll());
    dispatch({ type: ALL_PAGE_RESET });

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(`${singleName} deleted successfully`);
      navigate(`/${route}`);
    }
  }, [dispatch, alert, error, isDeleted, navigate, params]);

  const deleteHandler = (id) => {
    dispatch(remove(id));
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
    {
      label: "ID",
      field: "_id",
      sort: "asc",
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Platform",
      field: "platform",
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
        <MetaData title={"All Pages"} />
        <Table
          title="All Pages"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={pages}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link="pages"
          addLink="new"
          onDelete={deleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default Pages;
