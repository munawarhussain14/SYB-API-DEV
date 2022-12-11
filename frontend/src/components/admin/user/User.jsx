import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { getAdminLists } from "../../../actions/listActions";

import { useDispatch, useSelector } from "react-redux";
import { loadDetail } from "../../../actions/userActions";
import Loader from "../../layout/Loader";
import { useAlert } from "react-alert";
import List from "../lists/sub_component/list";

const User = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { loading, userDetail, error } = useSelector((state) => state.user);
  const {
    loading: listLoading,
    lists,
    error: listError,
    listsCount,
    resPerPage,
  } = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(loadDetail(params.id));
    dispatch(getAdminLists("all", keyword, currentPage, { user: params.id }));
    console.log(userDetail);
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, alert, error, params]);

  return (
    <Fragment>
      <MetaData title={"User Detail"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {loading ? (
              <Loader />
            ) : userDetail ? (
              <Fragment>
                <h1>User Details</h1>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">Head</div>
                      <div className="card-body">
                        <div style={{ margin: "0 20px" }}>
                          <div className="row">
                            <div className="col-4">
                              <div className="form-group">
                                <label>Name</label>
                                <span className="form-control">
                                  {userDetail.name || "None"}
                                </span>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="form-group">
                                <label>Email</label>
                                <span className="form-control">
                                  {userDetail.email || "None"}
                                </span>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="form-group">
                                <label>Phone Number</label>
                                <span className="form-control">
                                  {userDetail.phonenumber || "None"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12" style={{ marginTop: "20px" }}>
                    <div className="card">
                      <div className="card-header">
                        Businesses ({lists.length})
                      </div>
                      <div className="card-body">
                        <div className="row" style={{ margin: "0 20px" }}>
                          {loading ? (
                            <div className="col-12">Loading Data...</div>
                          ) : (
                            lists && lists.map((list) => <List list={list} />)
                          )}
                        </div>
                      </div>
                      <div className="card-footer">
                        {/* <div className="d-flex justify-content-center mt-5">
                          {resPerPage <= listsCount && (
                            <Pagination
                              activePage={currentPage}
                              itemsCountPerPage={resPerPage}
                              totalItemsCount={listsCount}
                              onChange={setCurrentPage}
                              nextPageText={">"}
                              prevPageText={"<"}
                              firstPageText={"First"}
                              lastPageText={"Last"}
                              itemClass="page-item"
                              linkClass="page-link"
                            />
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              "Loading"
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default User;
