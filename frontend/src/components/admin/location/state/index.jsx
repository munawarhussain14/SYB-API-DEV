import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../layout/common/table";
import MetaData from "../../../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getStates } from "../../../../actions/locationActions";

const States = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { loading, error, states, total, resPerPage } = useSelector(
    (state) => state.states
  );

  useEffect(() => {
    dispatch(getStates(0,keyword, currentPage));
    
    if (error) {
      alert.error(error);
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
      label: "Country",
      field: "country",
      subField:"name",
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
        <MetaData title={"All States"} />
        <Table
          title="States"
          loading={loading}
          total={total}
          perPage={resPerPage}
          columns={columns}
          data={states}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          // link="location/countries"
          addLink="new"
          editLink="location/states/edit"
        />
      </div>
    </Fragment>
  );
};

export default States;
