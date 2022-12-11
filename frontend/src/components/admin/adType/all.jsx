import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAll, remove, clearErrors } from "../../../actions/adTypeActions";
import {
  ALL_ADTYPE_RESET,
  NEW_ADTYPE_RESET,
} from "../../../constants/adClassConstants";
import Table from "../../layout/common/table";

const AdTypes = () => {
  const pageName = "Ad Types";
  const singleName = "Type";
  const route = "advertisementTypes";
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, types, count, resPerPage } = useSelector(
    (state) => state.types
  );
  const { isDeleted } = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAll());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch({ type: NEW_ADTYPE_RESET });
  }, []);

  useEffect(() => {
    //dispatch(getAll());
    dispatch({ type: ALL_ADTYPE_RESET });

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
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Width",
      field: "size",
      subField: "width",
      sort: "asc",
    },
    {
      label: "Height",
      field: "size",
      subField: "height",
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
        <MetaData title={"All Types"} />
        <Table
          title="All Types"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={types}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link="advertisementTypes"
          addLink="new"
        />
      </div>
    </Fragment>
  );
};

export default AdTypes;
