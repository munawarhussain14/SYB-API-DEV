import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import Sidebar from "../Sidebar";
import {
  getQuery,
  updateQuery
} from "../../../actions/buyerQueryContactActions";
import Textarea from "../../layout/common/Textarea";
import Input from "../../layout/common/Input";
import { Button, Modal } from "react-bootstrap";

const ShowBuyerQueryContact = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(async () => {
    if (params.id) {
      setLoading(true);
      let response = await getQuery(params.id);
      setData(response.data);
      setLoading(false);
    } else {
      navigate("buyer-queires");
    }
  }, []);

  const onStatusChange = async (status)=>{
    if(!data.quote_price&&!data.remarks){
      alert.info("Please set Quote price or Remarks!");
      return;
    }
    setLoading(true);
    const dataParams = {"status":status};
    const response = await updateQuery(params.id, dataParams);
    if(response.success){
      let temp = response.data;
      temp["status"] = response.data.status;
      setData(temp);
    }else{
      alert.error("Some error occur!");
    }
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData["quoted_price"]){
      setSubmitted(true);
      let res = await updateQuery(params.id,formData);
      setSubmitted(false);
      if(res.success){
        setData(res.data);
        setShow(false);
        alert.success("Qoute Saved!");
      }else{
        alert.error("Some Error Occur!");
      }
    }
    
  };

  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

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
              <p>Status: {data.status}</p>
              <button
                hidden={data.status == "process" || data.status == "closed"}
                className="btn btn-success"
                onClick={() => onStatusChange("process")}
              >
                <i className="fas fa-spinner"></i> In Process
              </button>{" "}
              <button
                hidden={data.status == "closed"}
                className="btn btn-info"
                onClick={() => onStatusChange("closed")}
              >
                <i className="fas fa-store-slash"></i> Close Query
              </button>
            </div>
            <div className="col-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Seller Detail</h5>
                </div>
                <div className="card-body">
                  <div style={{ padding: "20px", paddingTop: 0 }}>
                    <div className="row">
                      <div className="col-sm-4">
                        <label>Name</label>
                        <div className="form-control">
                          {data.seller.name || "None"}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <label>Email</label>
                        <div className="form-control">
                          {data.seller.email || "None"}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <label>Contact</label>
                        <div className="form-control">
                          {data.phone_no || "None"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={show}>
              <Modal.Header closeButton onHide={() => setShow(false)}>
                <Modal.Title>Seller Quote</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    <div className="col-12">
                      <Textarea
                        label="Remarks"
                        name="remarks"
                        value={formData.remarks || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        label="Quoted Price"
                        name="quoted_price"
                        value={formData.quoted_price || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <Button
                        disabled={
                          (!formData["quote_price"] && !formData["remarks"]) ||
                          submitted
                        }
                        className="btn btn-primary"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
            <div className="col-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Seller Quote</div>
                  <div className="card-tools">
                    <Button
                      className="btn btn-primary btn-sm daterange"
                      onClick={() => setShow(true)}
                    >
                      <i className="fa fa-edit"></i>
                    </Button>
                  </div>
                </div>
                <div className="card-body">
                  {data.quote_price || data.remarks ? (
                    <div style={{ padding: "20px", paddingTop: 0 }}>
                      <div className="row">
                        <div className="col-12">
                          <label>Remarks</label>
                          <div className="form-control">
                            {data.remarks || "None"}
                          </div>
                        </div>
                        <div className="col-12">
                          <label>Quoted Price</label>
                          <div className="form-control">
                            {data.quoted_price || "None"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button
                        onClick={() => setShow(true)}
                        className="btn btn-primary"
                      >
                        Add Seller Quote
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Query</h5>
                  <div className="card-tools">{data.query_id}</div>
                </div>
                <div className="card-body">
                  <div style={{ padding: "20px", paddingTop: 0 }}>
                    <div className="row">
                      <div className="col-12">
                        <label>Question</label>
                        <div className="form-control">
                          {data.query.question || "None"}
                        </div>
                      </div>
                      <div className="col-12">
                        <label>Detail</label>
                        <div
                          className="form-control"
                          style={{ height: "auto" }}
                        >
                          {data.query.detail || "None"}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label>Publish At</label>
                        <div className="form-control">
                          {data.query.publishAt || "None"}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label>Created At</label>
                        <div className="form-control">
                          {data.query.createdAt || "None"}
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
                          {data.query.expected_price.min || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Expected Price Max</label>
                        <div className="form-control">
                          {data.query.expected_price.max || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Business Category</label>
                        <div className="form-control">
                          {data.query.category.name || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Business Sub Category</label>
                        <div className="form-control">
                          {data.query.sub_category.name || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Country</label>
                        <div className="form-control">
                          {data.query.country.name || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>State</label>
                        <div className="form-control">
                          {data.query.state.name || "None"}
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
                          {data.query.name || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Email</label>
                        <div className="form-control">
                          {data.query.email || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Phone</label>
                        <div className="form-control">
                          {data.query.phone_no || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>User Type</label>
                        <div className="form-control">
                          {data.query.user ? (
                            <Link to={`/user/${data.query.user._id}`}>
                              {data.query.user.name}
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

export default ShowBuyerQueryContact;
