import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  create,
  get as fetch,
  update,
} from "../../../actions/adPackageActions";
import { getAll } from "../../../actions/adClassActions";
import { getAll as fetchAllType } from "../../../actions/adTypeActions";

import SelectInput from "../../layout/common/Select";
import TypePackage from "./partials/typepackage";
import Country from "../partials/country";
import Input from "../../layout/common/Input";
import DateInput from "../lists/sub_component/Date";

const AdPackage = () => {
  const pageName = "Ad Package";
  const route = "adPackages";
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [adClass, setAdClass] = useState({});
  const [type, setType] = useState({});

  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const {
    loading,
    isCreated,
    package: packageData,
    error,
  } = useSelector((state) => {
    return state.adPackage;
  });

  const { adClasses } = useSelector((state) => {
    return state.adClasses;
  });

  const { types } = useSelector((state) => {
    return state.types;
  });

  useEffect(() => {
    if (params.id) {
      dispatch(fetch(params.id));
    }
    dispatch(getAll());
  }, []);

  useEffect(() => {
    if (packageData) {
      setFormData(packageData);
      if (packageData.adClass)
        setAdClass({
          value: packageData.adClass._id,
          label: packageData.adClass.name,
        });
      if (packageData.adType)
        setType({
          value: packageData.adType._id,
          label: packageData.adType.name,
        });
    }
  }, [packageData]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    if (isCreated) {
      alert.success(`${pageName} added successfully`);
      navigate(`/${route}`);
    }
  }, [error, packageData]);

  const setDate = (name) => (value) => handleChange({ name, value });

  const submitHandler = (e) => {
    e.preventDefault();
    formData["module"] = "Business";
    if (params.id) {
      dispatch(update(params.id, formData));
    } else {
      dispatch(create(formData));
    }
  };

  return (
    <Fragment>
      <MetaData title={params.id ? `Update ${pageName}` : `New ${pageName}`} />
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
                            <h4>
                              {params.id
                                ? `Update ${pageName}`
                                : `New ${pageName}`}
                            </h4>
                          </div>
                          <div className="card-body">
                            <form
                              style={{ padding: "20px" }}
                              onSubmit={submitHandler}
                              encType="multipart/form-data"
                            >
                              <div className="row">
                                <div className="col-12">
                                  <SelectInput
                                    label="Ad Class"
                                    value={adClass}
                                    handleChange={(e) => {
                                      setAdClass({
                                        value: e.value,
                                        label: e.label,
                                      });
                                      handleChange({
                                        name: "adClass",
                                        value: e.value,
                                      });
                                    }}
                                    name="adClass"
                                    required={true}
                                    options={adClasses}
                                  />
                                </div>
                                <div className="col-12">
                                  <SelectInput
                                    label="Ad Type"
                                    value={type}
                                    handleChange={(e) => {
                                      setType({
                                        value: e.value,
                                        label: e.label,
                                      });
                                      handleChange({
                                        name: "adType",
                                        value: e.value,
                                      });
                                    }}
                                    name="adType"
                                    required={true}
                                    options={types}
                                  />
                                  <div className="com-lg-12">
                                    <Country
                                      country={formData.country || ""}
                                      onChange={handleChange}
                                      required={true}
                                    />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <Input
                                    label="Package Title"
                                    name="title"
                                    value={formData.title || ""}
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
                                <div className="col-6">
                                  <Input
                                    label="Days"
                                    name="days"
                                    type="number"
                                    value={formData.days || ""}
                                    onChange={handleChange}
                                    required={true}
                                  />
                                </div>
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
                                <div className="col-6">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={formData.required_cat}
                                      id="enable"
                                      checked={formData.required_cat}
                                      onChange={(e) => {
                                        handleChange({
                                          name: "required_cat",
                                          value: e.target.checked
                                            ? true
                                            : false,
                                        });
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="enable"
                                    >
                                      Required Category
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <button
                                style={{ width: "300px", margin: "auto" }}
                                id="login_button"
                                type="submit"
                                className="btn btn-primary btn-block py-3"
                                disabled={loading ? true : false}
                              >
                                {params.id ? "Update" : "Save"}
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

export default AdPackage;
