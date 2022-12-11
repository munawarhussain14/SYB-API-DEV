import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAll, remove } from "../../../actions/advertisementActions";
import {
  ALL_ADVERTISEMENTS_RESET,
  NEW_ADVERTISEMENT_RESET,
} from "../../../constants/advertisementConstants";
import Table from "../../layout/common/table";

const Advertisements = () => {
  const pageName = "Advertisements";
  const singleName = "Advertsiement";
  const route = "advertisements";
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, advertisements, count, resPerPage } = useSelector(
    (state) => state.advertisements
  );
  const { isDeleted } = useSelector((state) => state.advertisements);

  useEffect(() => {
    dispatch(getAll());
    dispatch({ type: NEW_ADVERTISEMENT_RESET });
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    dispatch({ type: ALL_ADVERTISEMENTS_RESET });

    if (isDeleted) {
      alert.success(`${singleName} deleted successfully`);
      //navigate(`/${route}`);
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
      label: "Package",
      field: "adPackage",
      subField: "title",
      sort: "asc",
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
    },
    {
      label: "Clicked",
      field: "clicked",
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
        <MetaData title={"All Advertisement"} />
        <Table
          title="All Advertisements"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={advertisements}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link="advertisements"
          addLink="new"
          // editLink="advertisements/edit"
          onDelete={deleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default Advertisements;
