import MetaData from "../../layout/MetaData";
import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminLists as getLists } from "../../../actions/listActions";
import { useAlert } from "react-alert";
import Table from "../../layout/common/table";

const Lists = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const [condition, setCondition] = useState([]);

  const { loading, lists, error, listsCount, resPerPage } = useSelector(
    (state) => state.lists
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    if (!loading)
      dispatch(getLists(params.status, keyword, currentPage, condition));
  }, [dispatch, alert, error, currentPage, keyword, params.status, condition]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const searchHandler = (keyword) => {
    setKeyword(keyword);
  };

  const columns = [
    {
      label: "List ID",
      field: "list_id",
      sort: "asc",
    },
    {
      label: "Area",
      pre: {
        field: "city",
        subField: "name",
      },
      field: "state",
      subField: "name",
      sort: "asc",
    },
    {
      label: "Title",
      field: "title",
      sort: "asc",
    },
    {
      label: "Company Name",
      field: "company_name",
      sort: "asc",
    },
    {
      label: "User",
      field: "user",
      subField: "name",
      type: "link",
      link: "user",
      sort: "asc",
    },
    // {
    //   label: "CreatedAt",
    //   field: "createdAt",
    //   sort: "asc",
    //   type: "date",
    // },
    {
      label: "Actions",
      field: "actions",
    },
  ];

  const deleteHandler = (id) => {};

  return (
    <Fragment>
      <div className="container-fluid">
        <MetaData title={"Businesses"} />

        <Table
          title={"All"}
          loading={loading}
          total={listsCount}
          perPage={resPerPage}
          columns={columns}
          data={lists}
          onChangePage={setCurrentPageNo}
          onSearch={searchHandler}
          link="list/show"
          editLink="list"
        />
      </div>
    </Fragment>
  );
};

export default Lists;
