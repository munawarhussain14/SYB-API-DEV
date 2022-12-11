import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAll, remove, clearErrors } from "../../../actions/adPackageActions";
import {
  ALL_ADPACKAGES_RESET,
  NEW_ADPACKAGE_RESET,
} from "../../../constants/adPackageConstants";
import Table from "../../layout/common/table";

const AdPackages = () => {
  const pageName = "Ad Packages";
  const singleName = "Package";
  const route = "adpackages";
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, packages, count, resPerPage } = useSelector(
    (state) => state.adPackages
  );
  const { isDeleted } = useSelector((state) => state.adPackages);

  useEffect(() => {
    dispatch({ type: NEW_ADPACKAGE_RESET });
  }, []);

  useEffect(() => {
    dispatch(getAll());
    dispatch({ type: ALL_ADPACKAGES_RESET });

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
    // {
    //   label: "ID",
    //   field: "_id",
    //   sort: "asc",
    // },
    {
      label: "Ad Class",
      field: "adClass",
      subField: "name",
      sort: "asc",
    },
    {
      label: "Ad Type",
      field: "adType",
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
        <MetaData title={"All Ad Packages"} />
        <Table
          title="Ad Packages"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={packages}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link="adPackages"
          addLink="new"
          onDelete={deleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default AdPackages;
