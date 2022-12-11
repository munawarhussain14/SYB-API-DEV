import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import Input from "../../layout/common/Input";
import BusinessType from "./sub_component/BusinessType";
import Categories from "./sub_component/Categories";
import Activities from "./sub_component/Activities";
import Textarea from "../../layout/common/Textarea";
import Location from "./sub_component/Location";
import { updateList, getList, clearErrors } from "../../../actions/listActions";
import { UPDATE_LIST_RESET } from "../../../constants/listConstants";
import DateInput from "./sub_component/Date";
import Loader from "../../layout/Loader";
import { useAlert } from "react-alert";
import Images from "./sub_component/Images";
import Finance from "./sub_component/Finance";

const UpdateList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const setDate = (name) => (value) => handleChange({ name, value });

  const { isUpdated, loading, list, error } = useSelector((state) => {
    return state.listDetails;
  });

  const { error: updateError } = useSelector((state) => state.lists);

  useEffect(() => {
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    console.log(isUpdated);
    if (isUpdated) {
      navigate("/listing/all");
      alert.success("List created successfully");
      dispatch({ type: UPDATE_LIST_RESET });
    }
  });

  useEffect(() => {
    dispatch(getList(params.id));
  }, []);

  useEffect(() => {
    setFormData(list);
  }, [list]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateList(formData["_id"], formData));
  };

  const handleApproved = (status) => {
    dispatch(updateList(formData["_id"], { status: status }));
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <MetaData title={"Business"} />
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="row">
              <div className="col-12 text-right" style={{ padding: "5px" }}>
                {formData ? (
                  formData.status ? (
                    <Fragment>
                      <button className="btn btn-success">Approved</button>
                      {/* &nbsp;
                          <button
                            onClick={() => handleApproved(false)}
                            className="btn btn-danger"
                          >
                            Reject
                          </button> */}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button
                        onClick={() => handleApproved(true)}
                        className="btn btn-warning"
                      >
                        Approve
                      </button>
                      &nbsp;
                      <button
                        onClick={() => handleApproved(false)}
                        className="btn btn-danger"
                      >
                        Reject
                      </button>
                    </Fragment>
                  )
                ) : (
                  ""
                )}
                &nbsp;
                <Link to={`/list/show/${list._id}`} className="btn btn-success">
                  View
                </Link>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>
                      Listing Information (create at: {formData.createdAt})
                    </h4>
                  </div>
                  <div className="card-body">
                    <form
                      style={{ padding: "20px" }}
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                    >
                      <Input
                        label="Listing Title"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                      />

                      <Input
                        label="Company Name"
                        name="company_name"
                        value={formData.company_name || ""}
                        onChange={handleChange}
                      />

                      <Input
                        label="Business Name"
                        name="business_name"
                        value={formData.business_name || ""}
                        onChange={handleChange}
                      />

                      <h5>
                        Basic Information
                        <hr />
                      </h5>
                      <div className="row">
                        <div className="col-6">
                          <Input
                            label="Asking Price"
                            name="asking_price"
                            value={formData.asking_price || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Minimum Asking Price"
                            name="min_asking_price"
                            value={formData.min_asking_price || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Company Asking Price (Topup - Frontend)"
                            name="company_asking_price"
                            value={formData.company_asking_price || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <DateInput
                            label="License Expiry Date"
                            name="license_expiry_date"
                            onChange={setDate("license_expiry_date")}
                            value={formData.license_expiry_date}
                          />
                        </div>
                        <div className="col-6">
                          <BusinessType
                            value={formData.business_type}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <DateInput
                            label="Business Establishment Date"
                            name="business_establish_date"
                            onChange={setDate("business_establish_date")}
                            value={formData.business_establish_date}
                          />
                        </div>
                        <Categories
                          category={formData.category || ""}
                          sub_category={formData.sub_category || ""}
                          onChange={handleChange}
                        />
                        <Activities
                          values={formData.business_activities}
                          onChange={handleChange}
                        />
                        <div className="col-12">
                          <Textarea
                            label="Business Overview"
                            name="business_overview"
                            value={formData.business_overview || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12">
                          <Textarea
                            label="Reason for Sale"
                            name="reason_for_sale"
                            value={formData.reason_for_sale || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <h5>
                            Location Information
                            <hr />
                          </h5>
                        </div>
                        <Location
                          country={formData.country}
                          state={formData.state}
                          city={formData.city}
                          onChange={handleChange}
                        />
                        <div className="col-6">
                          <Input
                            label="Website"
                            name="website"
                            value={formData.website || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Business Address"
                            name="business_address"
                            value={formData.business_address || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Company Address"
                            name="company_address"
                            value={formData.company_address || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <h5>
                            Real Estate Information
                            <hr />
                          </h5>
                        </div>
                        <div className="col-6">
                          <Input
                            label="Real Estate"
                            name="real_estate"
                            value={formData.real_estate || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <DateInput
                            label="Lease Expiry Date"
                            name="lease_expiry_date"
                            onChange={setDate("lease_expiry_date")}
                            value={formData.lease_expiry_date}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Size of Premises"
                            name="size_of_premises"
                            value={formData.size_of_premises || ""}
                            onChange={handleChange}
                            type="number"
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Annual Lease"
                            name="annual_lease"
                            value={formData.annual_lease || ""}
                            onChange={handleChange}
                            type="number"
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Lease Term"
                            name="lease_term"
                            value={formData.lease_term || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="yes"
                              id="feature"
                              checked={
                                formData.feature === "yes" ? true : false
                              }
                              onChange={(e) => {
                                handleChange({
                                  name: "feature",
                                  value: e.target.checked ? "yes" : "no",
                                });
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="feature"
                            >
                              Feature
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* <Package package={formData.package} /> */}
                      <button
                        style={{ width: "300px", margin: "auto" }}
                        id="login_button"
                        type="submit"
                        className="btn btn-primary btn-block py-3"
                        disabled={loading ? true : false}
                      >
                        UPDATE
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Finance list_id={formData._id} finance={formData.finance} />
            <Images list_id={formData._id} images={formData.images} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateList;
