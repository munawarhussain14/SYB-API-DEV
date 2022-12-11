import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../actions/buyerQueryContactActions";
import Table from "../../layout/common/table";

const BuyerQueriesContact = () => {
  const pageName = "Buyer Queries Contacts";
  const singleName = "Buyer Query Contact";
  const route = "buyer-queries-contacts/show";
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
    let data = {
      keyword,
      page:currentPage,
    };

    if(params.status!="all"){
      data = { status: params.status, ...data};
    }
    if(params.query){
      data = { query: params.query, ...data};
    }
    console.log("Data",data);
    let response = await getAll(data);
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
      label: "Query",
      field: "query",
      subField: "query_id",
      type: "link",
      link: "buyer-queries/show",
    },
    {
      label: "Seller",
      field: "seller",
      subField: "name",
      type: "link",
      link: "user",
    },
    {
      label: "Contact",
      field: "phone_no",
    },
    {
      label: "Email",
      field: "seller",
      subField: "email",
    },
    {
      label: "Date",
      field: "createdAt",
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
          title="All Buyer Queries Contacts"
          loading={loading}
          total={count}
          perPage={resPerPage}
          columns={columns}
          data={data}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link={route}
          // addLink="new"
          // editLink="buyer-queries-contact/edit"
          // onDelete={deleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default BuyerQueriesContact;
