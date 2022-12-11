import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { fetch, update } from "../../../actions/advertisementActions";
import {
  CLEAR_ERRORS,
  GET_ADVERTISEMENT_SUCCESS,
} from "../../../constants/advertisementConstants";

const ViewAdvertisement = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const { loading, advertisement, error } = useSelector((state) => {
    return state.advertisement;
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    console.log(loading);
    console.log(advertisement);
  });

  useEffect(() => {
    if (params.id) {
      dispatch(fetch(params.id));
    }
  }, []);

  const onApprove = () => {
    const data = new FormData();
    data.append("approved", true);
    data.append("status", "Payment Pending");
    dispatch(update(params.id, data));
  };

  const onPublish = () => {
    let temp = { ...advertisement };
    let today = new Date();
    let expiry = new Date();
    const data = new FormData();
    data.append("status", "Published");
    data.append("enable", true);
    data.append("publishAt", today);
    data.append("expireAt", expiry.setDate(today.getDate() + temp.days));

    dispatch(update(params.id, data));
  };

  const onStatusChange = (enable) => {
    const data = new FormData();
    data.append("enable", enable);
    dispatch(update(params.id, data));
  };

  const getData = (d) => {
    const temp = new Date(d);
    return temp.toDateString();
  };

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(
    `${process.env.PUBLIC_URL}/images/noimage.png`
  );
  const onChange = (e) => {
    if (e.target.name === "file") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    } else {
      //setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!image) {
      alert.info("Select Image");
      return false;
    }

    const formData = new FormData();
    formData.append("image", image);

    dispatch(update(params.id, formData));
  };

  return (
    <Fragment>
      <MetaData title={"Advertisement"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="">
              <Fragment>
                <div className="row">
                  <div className="col-12">
                    <div className="container">
                      <div className="card">
                        <div className="card-header">
                          <h4>Advertisement</h4>
                        </div>
                        <div className="card-body">
                          <div style={{ padding: "20px" }}>
                            {loading ? (
                              <Loader />
                            ) : advertisement ? (
                              <Fragment>
                                <div className="row">
                                  <div className="col-6">
                                    <h4>Advertisement</h4>
                                  </div>
                                  <div className="col-6 text-right">
                                    {advertisement.approved ? (
                                      <a
                                        style={{ color: "white" }}
                                        className="btn btn-success"
                                      >
                                        Approved
                                      </a>
                                    ) : (
                                      <a
                                        className="btn btn-primary"
                                        onClick={onApprove}
                                        style={{ color: "white" }}
                                      >
                                        Approve It
                                      </a>
                                    )}
                                    &nbsp;
                                    {advertisement.enable ? (
                                      <a
                                        className="btn btn-danger"
                                        onClick={() => {
                                          onStatusChange(false);
                                        }}
                                        style={{ color: "white" }}
                                      >
                                        Disable it
                                      </a>
                                    ) : (
                                      <a
                                        className="btn btn-success"
                                        onClick={() => {
                                          onStatusChange(true);
                                        }}
                                        style={{ color: "white" }}
                                      >
                                        Enable it
                                      </a>
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <label>Email</label>
                                    <div className="form-control">
                                      {advertisement.user.email || "None"}
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <label>Name</label>
                                    <div className="form-control">
                                      {advertisement.user.name || "None"}
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <label>Phone</label>
                                    <div className="form-control">
                                      {advertisement.user.phone || "None"}
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <label>Redirect</label>
                                    <div className="form-control">
                                      {advertisement.redirect || "None"}
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <label>Title</label>
                                    <div className="form-control">
                                      {advertisement.title || "None"}
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <label>Content</label>
                                    <div className="form-control">
                                      {advertisement.content || "None"}
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <label>Country</label>
                                    <div className="form-control">
                                      {advertisement.adPackage.country.name ||
                                        "None"}
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <label>Category</label>
                                    <div className="form-control">
                                      {advertisement.category
                                        ? advertisement.category.name
                                        : "None"}
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <label>Package</label>
                                    <div className="form-control">
                                      {advertisement.adPackage.title || "None"},{" "}
                                      {advertisement.adPackage.price || "None"}{" "}
                                      {advertisement.adPackage.country
                                        .currency || "None"}
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <label>Status</label>
                                    <div className="form-control">
                                      {advertisement.status || "None"}
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <label>Payment Status</label>
                                    <div className="form-control">
                                      {advertisement.payment_status || "None"}
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <label>Published At</label>
                                    <div className="form-control">
                                      {advertisement.publishAt
                                        ? getData(advertisement.publishAt)
                                        : "None"}
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <label>Expire At</label>
                                    <div className="form-control">
                                      {advertisement.expireAt
                                        ? getData(advertisement.expireAt)
                                        : "None"}
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <label>Request Design</label>
                                    <div className="form-control">
                                      {advertisement.requestDesign
                                        ? "Yes"
                                        : "None"}
                                    </div>
                                  </div>

                                  <div className="col-12">
                                    {advertisement.image ? (
                                      <img src={advertisement.image.url} />
                                    ) : (
                                      <Fragment>
                                        <hr></hr>
                                        <h4>Upload Design</h4>
                                        <form
                                          onSubmit={submitHandler}
                                          encType="multipart/form-data"
                                        >
                                          <div className="row">
                                            <div className="col-8">
                                              <div className="form-group">
                                                <div className="d-flex align-items-center">
                                                  <div>
                                                    <figure className="avatar mr-3 item-rtl">
                                                      <img
                                                        src={imagePreview}
                                                        className="rounded-circle"
                                                        alt="Image Preview"
                                                      />
                                                    </figure>
                                                  </div>
                                                  <div className="custom-file">
                                                    <input
                                                      type="file"
                                                      name="file"
                                                      className="custom-file-input"
                                                      id="customFile"
                                                      accept="image/*"
                                                      onChange={onChange}
                                                    />
                                                    <label
                                                      className="custom-file-label"
                                                      htmlFor="customFile"
                                                    >
                                                      Choose Image
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-4">
                                              <button
                                                className="btn btn-primary"
                                                disabled={
                                                  loading ? true : false
                                                }
                                              >
                                                <i className="fa fa-upload"></i>
                                              </button>
                                            </div>
                                          </div>
                                        </form>
                                      </Fragment>
                                    )}
                                  </div>
                                </div>
                              </Fragment>
                            ) : (
                              "Loading"
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

export default ViewAdvertisement;
