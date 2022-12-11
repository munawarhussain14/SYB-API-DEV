import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../layout/common/Input";
import Textarea from "../../layout/common/Textarea";
import Country from "../partials/country";
import SelectInput from "../../layout/common/Select";
import Features from "./features";
import { newPackage } from "../../../actions/packageActions";
import { NEW_PACKAGE_RESET } from "../../../constants/packageConstants";
import DateInput from "../lists/sub_component/Date";

const AddPackage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
    console.log(formData);
  };
  const [daysDisabled, setDaysDisabled] = useState(false);

  const {
    loading,
    isCreated,
    package: packageData,
    error,
  } = useSelector((state) => {
    return state.packageDetail;
  });

  useEffect(() => {
    if (error) {
      alert.error("Some error occur");
      return;
    }
    if (isCreated) {
      alert.success("Package added successfully");
      dispatch({ type: NEW_PACKAGE_RESET });
      navigate("/packages");
    }
  }, [error, packageData]);

  const setDate = (name) => (value) => handleChange({ name, value });

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(formData);
    dispatch(newPackage(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Add Package"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="">
              {/* <h1>Update List</h1> */}
              {loading ? (
                <Loader />
              ) : (
                <Fragment>
                  <div className="row">
                    <div className="col-12">
                      <div className="container">
                        <div className="card">
                          <div className="card-header">
                            <h4>New Package</h4>
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
                                <div className="col-4">
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
                                    disabled={daysDisabled}
                                    value={formData.duration || ""}
                                    onChange={handleChange}
                                    required={true}
                                  />
                                </div>
                                <div className="col-2">
                                  <div className="form-check">
                                    <label htmlFor="untilSold">
                                      Until Sold
                                    </label>
                                    <div style={{ paddingLeft: "20px" }}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={formData.untilSold}
                                        id="untilSold"
                                        checked={formData.untilSold}
                                        onChange={(e) => {
                                          let temp = e.target.checked
                                            ? true
                                            : false;
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
                                    onChange={handleChange}
                                    required={true}
                                  />
                                </div>
                                <div className="col-6">
                                  <SelectInput
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
                                <Features handleChange={handleChange} />
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
                                  <label
                                    className="form-check-label"
                                    htmlFor="special"
                                  >
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
                                  <label
                                    className="form-check-label"
                                    htmlFor="enable"
                                  >
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
                                Save
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddPackage;
