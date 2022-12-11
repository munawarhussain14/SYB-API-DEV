import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../layout/common/table";
import MetaData from "../../../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../../../actions/locationActions";

export default () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { loading, error, cities, total, resPerPage } = useSelector(
    (state) => state.cities
  );

  useEffect(() => {
    dispatch(getCities(0, keyword, currentPage));

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
      label: "State",
      field: "state",
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
        <MetaData title={"All Cities"} />
        <Table
          title="Cities"
          loading={loading}
          total={total}
          perPage={resPerPage}
          columns={columns}
          data={cities}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          // link="location/countries"
          addLink="new"
          editLink="location/cities/edit"
        />
      </div>
    </Fragment>
  );
};
