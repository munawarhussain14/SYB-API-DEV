import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../actions/buyerQueryActions";
import Table from "../../layout/common/table";

const BuyerQueries = () => {
  const pageName = "Buyer Queries";
  const singleName = "Buyer Query";
  const route = "buyer-queries/show";
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [resPerPage, setResPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  // const { loading, error, adClasses, count, resPerPage } = useSelector(
  //   (state) => state.adClasses
  // );
  // const { isDeleted } = useSelector((state) => state.adClass);

  useEffect(async () => {
    setLoading(true);
    let requestParmas = {
      keyword,
      status: params.status,
      currentPage,
    };

    if(params.query){
      requestParmas = { query: params.query, ...requestParmas };
    }
    
    let response = await getAll(requestParmas);
    setCount(response.count);
    setResPerPage(response.resPerPage);
    setData(response.data);
    setLoading(false);
  }, [params.status, keyword, currentPage]);

  useEffect(
    () => {
      if (false) {
        alert.success(`${singleName} deleted successfully`);
        navigate(`/${route}`);
      }
    },
    [
      // error, isDeleted
    ]
  );

  const deleteHandler = (id) => {
    // dispatch(remove(id));
  };

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const searchHandler = (keyword) => {
    setKeyword(keyword);
  };
  const columns = [
    {
      label: "ID",
      field: "query_id",
      sort: "asc",
    },
    {
      label: "Question",
      field: "question",
      sort: "asc",
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Contact",
      field: "phone_no",
      sort: "asc",
    },
    {
      label: "Email",
      field: "email",
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
          title="All Buyer Queries"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={data}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link={route}
          // addLink="new"
          editLink="buyer-queries/edit"
          // onDelete={deleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default BuyerQueries;
