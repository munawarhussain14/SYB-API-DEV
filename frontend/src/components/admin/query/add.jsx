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
import { newPackage } from "../../../actions/packageActions";
import { NEW_PACKAGE_RESET } from "../../../constants/packageConstants";

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
    console.log(formData);
    //dispatch(newPackage(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Add Package"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

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
                                  name="duration"
                                  type="number"
                                  value={formData.duration || ""}
                                  onChange={handleChange}
                                  required={true}
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
    </Fragment>
  );
};

export default AddPackage;
