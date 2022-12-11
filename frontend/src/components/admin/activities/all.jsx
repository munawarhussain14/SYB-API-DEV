import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActivity as getAll,
  remove,
  clearErrors,
} from "../../../actions/activityActions";
import { ALL_ACTIVITY_RESET } from "../../../constants/businessActivityConstants";
import Table from "../../layout/common/table";

const Activities = () => {
  const pageName = "Activities";
  const singleName = "Activity";
  const route = "activities";
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { loading, error, activities, count, total, resPerPage } = useSelector(
    (state) => state.activities
  );
  const { isDeleted } = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getAll(keyword, 10, currentPage));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [keyword, currentPage]);

  useEffect(() => {
    //dispatch(getAll());
    dispatch({ type: ALL_ACTIVITY_RESET });

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
      label: "Actions",
      field: "actions",
    },
  ];

  return (
    <Fragment>
      <div className="container-fluid">
        <MetaData title={"All Activities"} />
        <Table
          title="Activities"
          loading={loading}
          total={total}
          perPage={resPerPage}
          columns={columns}
          data={activities}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          // link={route}
          addLink="new"
          editLink="activities/edit"
          onDelete={deleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default Activities;
