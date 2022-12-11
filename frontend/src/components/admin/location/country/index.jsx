import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../layout/common/table";
import MetaData from "../../../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../../../actions/locationActions";

const Countries = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { loading, error, countries, total, resPerPage } = useSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(getCountries(keyword, currentPage));
    
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
      label: "Currency",
      field: "currency",
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
        <MetaData title={"All Countries"} />
        <Table
          title="Countries"
          loading={loading}
          total={total}
          perPage={resPerPage}
          columns={columns}
          data={countries}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          // link="location/countries"
          addLink="new"
          editLink="location/countries/edit"
        />
      </div>
    </Fragment>
  );
};

export default Countries;
