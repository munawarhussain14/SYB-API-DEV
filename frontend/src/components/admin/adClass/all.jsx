import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAll, remove, clearErrors } from "../../../actions/adClassActions";
import { ALL_ADCLASS_RESET } from "../../../constants/adClassConstants";
import Table from "../../layout/common/table";

const AdClasses = () => {
  const pageName = "Ad Classes";
  const singleName = "Ad Class";
  const route = "adClasses";
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, adClasses, count, resPerPage } = useSelector(
    (state) => state.adClasses
  );
  const { isDeleted } = useSelector((state) => state.adClass);

  useEffect(() => {
    dispatch(getAll());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, []);

  useEffect(() => {
    //dispatch(getAll());
    dispatch({ type: ALL_ADCLASS_RESET });

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(`${singleName} deleted successfully`);
      navigate(`/${route}`);
    }
  }, [error, isDeleted]);

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
    // {
    //   label: "ID",
    //   field: "_id",
    //   sort: "asc",
    // },
    {
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Slug",
      field: "slug",
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
        <MetaData title={"All Ad Classes"} />
        <Table
          title="All Classes"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={adClasses}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link={route}
          addLink="new"
          onDelete={deleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default AdClasses;
