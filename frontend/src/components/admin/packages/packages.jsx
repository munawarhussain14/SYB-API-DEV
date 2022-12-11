import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getPackages,
  deletePackage,
  clearErrors,
} from "../../../actions/packageActions";
import { RESET_PACKAGE_REQUEST } from "../../../constants/packageConstants";
import Table from "../../layout/common/table";

const Packages = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, packages, count, resPerPage } = useSelector(
    (state) => state.packages
  );
  const { isDeleted } = useSelector((state) => state.packages);

  useEffect(() => {
    const status = params.status;
    dispatch(getPackages(keyword, currentPage));
    dispatch({ type: RESET_PACKAGE_REQUEST });

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Package deleted successfully");
      navigate("/packages");
      //dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate, params]);

  const deleteHandler = (id) => {
    console.log(id);
    dispatch(deletePackage(id));
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
    //   label: "Package ID",
    //   field: "_id",
    //   sort: "asc",
    // },
    {
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Country",
      field: "country",
      subField: "name",
      sort: "asc",
    },
    {
      label: "Price",
      field: "price",
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
        <MetaData title={"All Packages"} />
        <Table
          title="Packages"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={packages}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link="packages"
          addLink="new"
          editLink="packages/edit"
          onDelete={deleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default Packages;
