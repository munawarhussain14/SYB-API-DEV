import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import { getQuery } from "../../../actions/queryActions";

const AddQuery = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const {
    loading,
    query: queryData,
    error,
  } = useSelector((state) => {
    return state.queryDetail;
  });

  useEffect(() => {
    if (params.id) {
      dispatch(getQuery(params.id));
    }
  }, []);

  return (
    <Fragment>
      <MetaData title={"Query"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="">
              {/* <h1>Update List</h1> */}
              <Fragment>
                <div className="row">
                  <div className="col-12">
                    <div className="container">
                      <div className="card">
                        <div className="card-header">
                          <h4>Query</h4>
                        </div>
                        <div className="card-body">
                          <div style={{ padding: "20px" }}>
                            {loading ? (
                              <Loader />
                            ) : (
                              <div className="row">
                                <div className="col-12">
                                  <label>Client Name</label>
                                  <div className="form-control">
                                    {queryData.name || "None"}
                                  </div>
                                </div>
                                <div className="col-6">
                                  <label>Email</label>
                                  <div className="form-control">
                                    {queryData.email || "None"}
                                  </div>
                                </div>
                                <div className="col-6">
                                  <label>Phone</label>
                                  <div className="form-control">
                                    {queryData.phone || "None"}
                                  </div>
                                </div>
                                <div className="col-12">
                                  <label>Message</label>
                                  <div className="form-control">
                                    {queryData.message || "None"}
                                  </div>
                                </div>
                                <div className="col-6">
                                  <label>Business Name </label>
                                  <div className="form-control">
                                    {queryData.list ? (
                                      <Link to={`/list/${queryData.list._id}`}>
                                        {queryData.list.title}
                                      </Link>
                                    ) : (
                                      "None"
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddQuery;
