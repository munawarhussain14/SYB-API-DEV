import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import {
  getQuery,
  updateQuery,
  approveQuery,
} from "../../../actions/buyerQueryActions";

const BuyerQuery = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [contacts, setContacts] = useState(0);

  useEffect(async () => {
    if (params.id) {
      setLoading(true);
      let response = await getQuery(params.id);
      setData(response.data);
      setContacts(response.contact);
      setLoading(false);
      //console.log(response);
    } else {
      navigate("buyer-queires");
    }
  }, []);

  const onStatusChange = async (status)=>{
    setLoading(true);
    let data = {"status":status};
    if(status=="private"||status=="publish"){
      data = { publish: status };
    }
     
    const response = await updateQuery(params.id, data);
    if(response.success){
      let temp = response.data;
      temp["status"] = response.data.status;
      setData(temp);
      if (status == "private" || status == "publish") {
        alert.info("Publish status change!");
      }
    }else{
      alert.error("Some error occur!");
    }
    setLoading(false);
  }

  return (
    <Fragment>
      <MetaData title={"Buyer Query"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="col-12 p-3">
              <label>Status:</label> <span>{data.status}</span>
              <hr></hr>
              {data.publish == "private" ? (
                <button
                  hidden={data.status != "approved"}
                  className="btn btn-success"
                  onClick={() => onStatusChange("publish")}
                >
                  Publish
                </button>
              ) : (
                <button
                  hidden={data.status != "approved"}
                  className="btn btn-warning"
                  onClick={() => onStatusChange("private")}
                >
                  Private
                </button>
              )}{" "}
              <button
                hidden={
                  data.status == "approved" ||
                  data.status == "closed" ||
                  data.status == "rejected"
                }
                className="btn btn-primary"
                onClick={() => onStatusChange("approved")}
              >
                <i className="fa fa-check"></i> Approve
              </button>{" "}
              <button
                hidden={
                  data.status == "rejected" ||
                  data.status == "closed" ||
                  data.status == "approved"
                }
                className="btn btn-danger"
                onClick={() => onStatusChange("rejected")}
              >
                <i className="fas fa-times"></i> Reject
              </button>{" "}
              <button
                hidden={
                  data.status == "closed" ||
                  data.status == "rejected" ||
                  data.status == "pending"
                }
                className="btn btn-info"
                onClick={() => onStatusChange("closed")}
              >
                <i className="fas fa-store-slash"></i> Close
              </button>{" "}
              <Link
                to={`/buyer-queries/edit/${params.id}`}
                className="btn btn-default"
              >
                <i className="far fa-edit"></i> Edit
              </Link>{" "}
              <Link
                to={`/buyer-queries-contacts/all/${params.id}`}
                className="btn btn-default"
              >
                <span class="badge badge-info">{contacts}</span>{" "}View Seller
                Query
              </Link>
            </div>
            <div className="col-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Query</h5>
                </div>
                <div className="card-body">
                  <div style={{ padding: "20px", paddingTop: 0 }}>
                    <div className="row">
                      <div className="col-12">
                        <label>Question</label>
                        <div className="form-control">
                          {data.question || "None"}
                        </div>
                      </div>
                      <div className="col-12">
                        <label>Detail</label>
                        <div
                          className="form-control"
                          style={{ height: "auto" }}
                        >
                          {data.detail || "None"}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label>Publish At</label>
                        <div className="form-control">
                          {data.publishAt || "None"}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label>Created At</label>
                        <div className="form-control">
                          {data.createdAt || "None"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Area of Interest</h5>
                </div>
                <div className="card-body">
                  <div style={{ padding: "20px", paddingTop: 0 }}>
                    <div className="row">
                      <div className="col-6">
                        <label>Expected Price Min</label>
                        <div className="form-control">
                          {data.expected_price.min || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Expected Price Max</label>
                        <div className="form-control">
                          {data.expected_price.max || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Business Category</label>
                        <div className="form-control">
                          {data.category.name || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Business Sub Category</label>
                        <div className="form-control">
                          {data.sub_category.name || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Country</label>
                        <div className="form-control">
                          {data.country.name || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>State</label>
                        <div className="form-control">
                          {data.state.name || "None"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Client Detail</h5>
                </div>
                <div className="card-body">
                  <div style={{ padding: "20px", paddingTop: 0 }}>
                    <div className="row">
                      <div className="col-12">
                        <label>Client Name</label>
                        <div className="form-control">
                          {data.name || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Email</label>
                        <div className="form-control">
                          {data.email || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Phone</label>
                        <div className="form-control">
                          {data.phone_no || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>User Type</label>
                        <div className="form-control">
                          {data.user ? (
                            <Link to={`/user/${data.user._id}`}>
                              {data.user.name}
                            </Link>
                          ) : (
                            "Guest"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default BuyerQuery;
