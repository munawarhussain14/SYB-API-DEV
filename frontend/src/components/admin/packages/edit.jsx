import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import Input from "../../layout/common/Input";
import Textarea from "../../layout/common/Textarea";
import Country from "../partials/country";
import SelectInput from "../../layout/common/Select";
import Features from "./features";
import { updatePackage, getPackage } from "../../../actions/packageActions";
import DateInput from "../lists/sub_component/Date";

const EditPackage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [daysDisabled, setDaysDisabled] = useState(false);

  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
    console.log(formData);
  };

  const {
    loading,
    isLoaded,
    package: packageData,
    error,
    isUpdated,
  } = useSelector((state) => {
    return state.packageDetail;
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    if (isUpdated) {
      alert.success("Package Update Successfuly");
    }
  }, [error, isUpdated]);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(getPackage(params.id));
    } else {
      setFormData({ ...packageData });
      setDaysDisabled(packageData["untilSold"]);
    }
  }, [isLoaded]);

  const setDate = (name) => (value) => handleChange({ name, value });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!daysDisabled && !formData["duration"]) {
      alert.error("Please provide days");
      return;
    }

    dispatch(updatePackage(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Add Package"} />
      <div className="container-fluid">
        <div className="row">
          {/* <h1>Update List</h1> */}
          {loading ? (
            <div className="col-12 col-md-12">
              <Loader />
            </div>
          ) : (
            <Fragment>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>{params.id ? "Update Package" : "New Package"}</h4>
                  </div>
                  <div className="card-body">
                    <form
                      style={{ padding: "20px" }}
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-12">
                          <Input
                            label="Package Title"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-12">
                          <Input
                            label="Package Slug"
                            name="slug"
                            value={formData.slug || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-4">
                          <Input
                            label="Days"
                            name="duration"
                            type="number"
                            required={!daysDisabled}
                            disabled={daysDisabled}
                            value={formData.duration || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-2">
                          <div className="form-check">
                            <label htmlFor="untilSold">Until Sold</label>
                            <div style={{ paddingLeft: "20px" }}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={formData.untilSold}
                                id="untilSold"
                                checked={formData.untilSold}
                                onChange={(e) => {
                                  let temp = e.target.checked ? true : false;
                                  setDaysDisabled(temp);
                                  formData["duration"] = "";
                                  handleChange({
                                    name: "untilSold",
                                    value: temp,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="col-6">
                          <Input
                            label="Discount"
                            name="discount"
                            type="number"
                            value={formData.discount || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <DateInput
                            label="Discount End Date"
                            name="discount"
                            onChange={(e) =>
                              handleChange({
                                name: "discount_end_date",
                                value: e,
                              })
                            }
                            value={formData.discount_end_date || ""}
                          />
                        </div>
                        <div className="col-12">
                          <Textarea
                            label="Detail"
                            name="detail"
                            value={formData.detail || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <Country
                            country={formData.country || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-6">
                          <SelectInput
                            value={
                              formData.type
                                ? {
                                    value: formData.type,
                                    label: formData.type,
                                  }
                                : null
                            }
                            label="Type"
                            handleChange={(e) => {
                              handleChange({
                                name: "type",
                                value: e.value,
                              });
                            }}
                            name="type"
                            required={true}
                            options={[
                              { name: "Business", _id: "Business" },
                              {
                                name: "Real Estate",
                                _id: "Real Estate",
                              },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <Features
                          values={formData.features || null}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={formData.featured}
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => {
                              handleChange({
                                name: "featured",
                                value: e.target.checked ? true : false,
                              });
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="featured"
                          >
                            Featured
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={formData.special}
                            id="special"
                            checked={formData.special}
                            onChange={(e) => {
                              handleChange({
                                name: "special",
                                value: e.target.checked ? true : false,
                              });
                            }}
                          />
                          <label className="form-check-label" htmlFor="special">
                            Special
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={formData.enable}
                            id="enable"
                            checked={formData.enable}
                            onChange={(e) => {
                              handleChange({
                                name: "enable",
                                value: e.target.checked ? true : false,
                              });
                            }}
                          />
                          <label className="form-check-label" htmlFor="enable">
                            Enable
                          </label>
                        </div>
                      </div>

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
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default EditPackage;
