import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getList, updateList } from "../../../actions/listActions";
import { sendMail } from "../../../actions/mailActions";
import Loader from "../../layout/Loader";
import { useAlert } from "react-alert";
import { DateFormat } from "../../layout/common/date";
import { Button, Modal } from "react-bootstrap";
import Accordian from "./sub_component/Accordion ";
import UserDetail from "./sub_component/User";
import MarkAsPaid from "./sub_component/models/MarkAsPaid";
var parse = require("html-react-parser");

const ListDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [issuesList, setIssuesList] = useState(null);
  const [modelIssues, setModelIssues] = useState(null);
  const [emailIssues, setEmailIssues] = useState(null);

  const { isUpdated, loading, list, error } = useSelector((state) => {
    return state.listDetails;
  });

  const {
    loading: mailLoading,
    data,
    error: mailError,
  } = useSelector((state) => {
    return state.sendEmail;
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getList(params.id));

  }, [dispatch, alert, error, params]);

  const fetchIssues = async () => {
    await fetch("dist/data/issues.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setIssuesList(data);
      });
  };

  const [show, setShow] = useState(false);
  const [paidShow, setPaidShow] = useState(false);
  const [showEmail, setshowEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    if (mailError) {
      return alert.error(mailError);
    }
    if (data && data.message) {
      alert.success(data.message);
      setshowEmail(false);
    }
  }, [mailError, data]);

  const sendEmail = () => {
    if (!mailLoading) {
      const data = {
        user_id: list.user,
        list_id: list._id,
        message: emailIssues,
      };
      dispatch(sendMail(data));
    }
  };
  
  const handleEmailShow = async (field, name) => {
    if (!emailIssues) {
      return alert.info("No Issue");
    }

    let message = "<div style='text-align:left'>";
    for (var key in emailIssues) {
      message += `<h2>${emailIssues[key].name}</h2>\n`;
      if (emailIssues[key].issues && emailIssues[key].issues.length > 0) {
        message += `<h4>Issues</h4>\n`;
        message += `<ul>`;
        emailIssues[key].issues.map((e) => {
          message += `<li>${e}</li>`;
        });
        message += `</ul>`;
      }
      if (emailIssues[key].comment) {
        message += `<h4>Special Comment</h4>\n`;
        message += `<p>${emailIssues[key].comment}</p>`;
      }
      message += "</hr>";
    }
    setEmailMessage(message);
    setshowEmail(true);
  };

  const handleClose = () => {
    setShow(false);
    setshowEmail(false);
    setPaidShow(false);
  };

  const handleShow = async (field, name) => {
    if (!issuesList) {
      await fetchIssues();
    }

    if (issuesList[field].issues)
      setModelIssues({ name, field, issues: issuesList[field].issues });
    setShow(true);
  };

  const handlePaid = ()=>{
    setPaidShow(true);
  }

  const handleApproved = (status) => {
    dispatch(updateList(list._id, { status: status }));
  };

  const handleBlock = (status) => {
    dispatch(updateList(list._id, { sold: status }));
  };

  const handleSold = (status) => {
    dispatch(updateList(list._id, { block: status }));
  };
  
  const submitPaid = async (paymentPackage)=>{
    dispatch(updateList(list._id, { paymentPackage,"request":"MarkAsPaid" }));
    setPaidShow(false);
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <MetaData title={"Business Detail"} />

        <div className="row">
          <div className="col-12 col-md-12">
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="container">
                  <Link
                    to={`/list/proposal/${list._id}`}
                    className="btn btn-success"
                  >
                    Proposal
                  </Link>{" "}
                  <button onClick={handleEmailShow} className="btn btn-primary">
                    View Email
                  </button>{" "}
                  {list && list.status ? (
                    <button
                      // onClick={() => handleApproved(true)}
                      className="btn btn-success"
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApproved(true)}
                      className="btn btn-primary"
                    >
                      Approve
                    </button>
                  )}{" "}
                  {list && list.block ? (
                    <button
                      onClick={() => handleBlock(false)}
                      className="btn btn-danger"
                    >
                      Un-Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(true)}
                      className="btn btn-danger"
                    >
                      Block
                    </button>
                  )}{" "}
                  {list && list.block ? (
                    <button
                      // onClick={() => handleSold(true)}
                      className="btn btn-success"
                    >
                      Sold
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSold(true)}
                      className="btn btn-warning"
                    >
                      Mark as Sold
                    </button>
                  )}{" "}
                  <Link to={`/list/${list._id}`} className="btn btn-success">
                    Edit
                  </Link>
                </div>
                <br></br>
                <div className="card">
                  <div className="card-header">
                    <h4>User Detail</h4>
                  </div>
                  <div className="card-body">
                    <UserDetail user_id={list.user} />
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-6">
                        <h4>Package Detail</h4>
                      </div>
                      <div className="col-6 text-right">
                        <button
                          hidden={list.package&&list.package.verified}
                          onClick={() => {
                            handlePaid();
                          }}
                          className="btn btn-primary"
                        >
                          Mark as Paid
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {list.package ? (
                        <Fragment>
                          <div className="col-md-3">
                            <label>Package Title</label>
                            <p>{list.package.package_title || "None"}</p>
                          </div>
                          <div className="col-md-3">
                            <label>Package Price</label>
                            <p>
                              {list.package.package_price &&
                              list.package.currency
                                ? list.package.package_price +
                                  " " +
                                  list.package.currency
                                : "None"}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <label>Until Sold</label>
                            <p>{list.package.untilSold ? "Yes" : "No"}</p>
                          </div>
                          <div className="col-md-3">
                            <label>Payment Source</label>
                            <p>{list.package.payment_source}</p>
                          </div>
                        </Fragment>
                      ) : (
                        <div className="col-12 text-center">No Package</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4>Listing Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <table className="table bordered">
                        <tr>
                          <td>
                            <b>Listing ID</b>
                            <br></br>
                            {list.list_id}
                          </td>
                          <td>
                            <b>Create At</b>
                            <br></br>
                            {DateFormat(list.createdAt)}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Title</b>
                            <br></br>
                            <p>{list.title}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow("title", "Listing Title")
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Company Name</b>
                            <br></br>
                            <p>{list.company_name}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow("company_name", "Company Name")
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Business Name</b>
                            <br></br>
                            <p>{list.business_name}</p>
                          </td>
                          <td className="border">
                            <button
                              className="btn btn-warning"
                              onClick={() =>
                                handleShow("business_name", "Business Name")
                              }
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                  <div className="card-body">
                    <table className="table bordered">
                      <tr>
                        <td>
                          <b>Asking Price</b>
                          <br></br>
                          <p>{list.asking_price || "None"}</p>
                          <b>Minimum Price</b>
                          <br></br>
                          <p>{list.min_asking_price || "None"}</p>
                          <b>Company Asking Price (Topup - Frontend)</b>
                          <br></br>
                          <p>{list.company_asking_price || "None"}</p>
                        </td>
                        <td className="border">
                          <button
                            onClick={() =>
                              handleShow("asking_price", "Asking Price")
                            }
                            className="btn btn-warning"
                          >
                            Issue
                          </button>
                        </td>
                        <td>
                          <b>License Expiry Date</b>
                          <br></br>
                          <p>{DateFormat(list.license_expiry_date)}</p>
                        </td>
                        <td className="border">
                          <button
                            onClick={() =>
                              handleShow(
                                "license_expiry_date",
                                "License Expiry Date"
                              )
                            }
                            className="btn btn-warning"
                          >
                            Issue
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Business Type</b>
                          <br></br>
                          <p>
                            {list.business_type ? list.business_type : "None"}
                          </p>
                        </td>
                        <td className="border">
                          <button
                            onClick={() =>
                              handleShow("business_type", "Business Type")
                            }
                            className="btn btn-warning"
                          >
                            Issue
                          </button>
                        </td>
                        <td>
                          <b>Business Establishment Date</b>
                          <br></br>
                          <p>{DateFormat(list.business_establish_date)}</p>
                        </td>
                        <td className="border">
                          <button
                            onClick={() =>
                              handleShow(
                                "business_establish_date",
                                "Business Establish Date"
                              )
                            }
                            className="btn btn-warning"
                          >
                            Issue
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Main Category</b>
                          <br></br>
                          <p>{list.category ? list.category.name : "None"}</p>
                        </td>
                        <td className="border">
                          <button
                            onClick={() =>
                              handleShow("category", "Main Category")
                            }
                            className="btn btn-warning"
                          >
                            Issue
                          </button>
                        </td>
                        <td>
                          <b>Sub Category</b>
                          <br></br>
                          <p>
                            {list.sub_category
                              ? list.sub_category.name
                              : "None"}
                          </p>
                        </td>
                        <td className="border">
                          <button
                            onClick={() =>
                              handleShow("sub_category", "Sub Category")
                            }
                            className="btn btn-warning"
                          >
                            Issue
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <b>Business Activity</b>
                          <br></br>
                          <p>
                            {list.business_activities
                              ? list.business_activities.map(
                                  (e) => e.name + ","
                                )
                              : "None"}
                          </p>
                        </td>
                        <td className="border">
                          <button
                            onClick={() =>
                              handleShow(
                                "business_activities",
                                "Business Activities"
                              )
                            }
                            className="btn btn-warning"
                          >
                            Issue
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <b>Business Overview</b>
                          <br></br>
                          <p>
                            {list.business_overview
                              ? list.business_overview
                              : "None"}
                          </p>
                        </td>
                        <td className="border">
                          <button
                            onClick={() =>
                              handleShow(
                                "business_overview",
                                "Business Overview"
                              )
                            }
                            className="btn btn-warning"
                          >
                            Issue
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4>Location Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <table className="table bordered">
                        <tr>
                          <td>
                            <b>Country</b>
                            <br></br>
                            <p>{list.country ? list.country.name : "None"}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() => handleShow("country", "Country")}
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                          <td>
                            <b>State</b>
                            <br></br>
                            <p>{list.state ? list.state.name : "None"}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() => handleShow("state", "State")}
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>City</b>
                            <br></br>
                            <p>{list.city ? list.city.name : "None"}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() => handleShow("city", "City")}
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                          <td>
                            <b>Website</b>
                            <br></br>
                            <p>{list.website ? list.website : "None"}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() => handleShow("website", "Website")}
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <b>Business Address</b>
                            <br></br>
                            <p>
                              {list.business_address
                                ? list.business_address
                                : "None"}
                            </p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow(
                                  "business_address",
                                  "Business Address"
                                )
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <b>Company Address</b>
                            <br></br>
                            <p>
                              {list.company_address
                                ? list.company_address
                                : "None"}
                            </p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow("company_address", "Company Address")
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4>Real Estate Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <table className="table bordered">
                        <tr>
                          <td>
                            <b>Real Estate</b>
                            <br></br>
                            <p>
                              {list.real_estate ? list.real_estate : "None"}
                            </p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow("real_estate", "Real Estate")
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                          <td>
                            <b>Lease Expiry Date</b>
                            <br></br>
                            <p>{DateFormat(list.lease_expiry_date)}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow(
                                  "lease_expiry_date",
                                  "Lease Expiry Date"
                                )
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Size of Premises</b>
                            <br></br>
                            <p>
                              {list.size_of_premises
                                ? list.size_of_premises
                                : "None"}
                            </p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow(
                                  "size_of_premises",
                                  "Size of Premises"
                                )
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                          <td>
                            <b>Annual Lease</b>
                            <br></br>
                            <p>
                              {list.annual_lease ? list.annual_lease : "None"}
                            </p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow("annual_lease", "Annual Lease")
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Lease Term</b>
                            <br></br>
                            <p>{list.lease_term ? list.lease_term : "None"}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() =>
                                handleShow("lease_term", "Lease Term")
                              }
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                          <td>
                            <b>Featured</b>
                            <br></br>
                            <p>{list.featured ? "Yes" : "No"}</p>
                          </td>
                          <td className="border">
                            <button
                              onClick={() => handleShow("featured", "Featured")}
                              className="btn btn-warning"
                            >
                              Issue
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4>
                      Financial Information{" "}
                      <button
                        onClick={() =>
                          handleShow("finance", "Finanacial Information")
                        }
                        className="btn btn-warning"
                      >
                        Issue
                      </button>
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <table className="table bordered">
                        <tr>
                          <th>Year</th>
                          <th>Revenue</th>
                          <th>Profit</th>
                        </tr>
                        {list.finance ? (
                          list.finance.map((e) => (
                            <tr>
                              <td>{e.year}</td>
                              <td>{e.revenue}</td>
                              <td>{e.profit}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3}>No Data</td>
                          </tr>
                        )}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4>
                      Images{" "}
                      <button
                        onClick={() => handleShow("images", "Listing Images")}
                        className="btn btn-warning"
                      >
                        Issue
                      </button>
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {list.images ? (
                        list.images.map((e) => (
                          <div className="image-container">
                            <img src={e.url} width="100%" />
                          </div>
                        ))
                      ) : (
                        <center>No Image</center>
                      )}
                    </div>
                  </div>
                </div>
                <Accordian issues={list.issues} />
                <MarkAsPaid
                  paidShow={paidShow}
                  handleClose={handleClose}
                  submitPaid={submitPaid}
                />
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {modelIssues ? modelIssues.name : ""} Issues
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-12">
                        {modelIssues
                          ? modelIssues.issues.map((e) => (
                              <div className="form-group form-check">
                                <input
                                  type="checkbox"
                                  defaultChecked={
                                    emailIssues &&
                                    emailIssues[modelIssues.field]
                                      ? emailIssues[
                                          modelIssues.field
                                        ].issues.includes(e)
                                      : false
                                  }
                                  onClick={(event) => {
                                    let temp = { ...emailIssues };
                                    if (!temp[modelIssues.field]) {
                                      temp[modelIssues.field] = {
                                        name: modelIssues.name,
                                        issues: [],
                                      };
                                    }
                                    if (
                                      !temp[modelIssues.field].issues.includes(
                                        e
                                      )
                                    ) {
                                      temp[modelIssues.field].issues.push(e);
                                    } else {
                                      temp[modelIssues.field].issues = temp[
                                        modelIssues.field
                                      ].issues.filter((v) => {
                                        return v != e;
                                      });
                                    }
                                    setEmailIssues(temp);
                                    console.log(temp);
                                  }}
                                  className="form-check-input"
                                />
                                <label className="form-check-label">{e}</label>
                              </div>
                            ))
                          : "None"}
                        <div className="form-group">
                          <label>Special Comment</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            value={
                              emailIssues && emailIssues[modelIssues.field]
                                ? emailIssues[modelIssues.field]["comment"]
                                : ""
                            }
                            onChange={(e) => {
                              let temp = { ...emailIssues };
                              if (!temp[modelIssues.field]) {
                                temp[modelIssues.field] = {
                                  name: modelIssues.name,
                                  issues: [],
                                };
                              }
                              temp[modelIssues.field]["comment"] =
                                e.target.value;
                              setEmailIssues(temp);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button> */}
                    <Button variant="primary" onClick={handleClose}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={showEmail} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Email</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-12">{parse(emailMessage)}</div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      disabled={mailLoading}
                      onClick={sendEmail}
                    >
                      {mailLoading ? "Sending Email...." : "Send Email"}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListDetails;
