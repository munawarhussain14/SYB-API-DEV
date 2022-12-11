import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../layout/common/Input";
import { create, fetch, update } from "../../../actions/adClassActions";
import { NEW_ADCLASS_RESET } from "../../../constants/adClassConstants";
import SelectInput from "../../layout/common/Select";

const AdClass = () => {
  const pageName = "AdClass";
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [platform, setPlatform] = useState({});

  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const { loading, isCreated, adClass, error } = useSelector((state) => {
    return state.adClass;
  });

  useEffect(() => {
    if (params.id) {
      dispatch(fetch(params.id));
    } else {
      dispatch({ type: NEW_ADCLASS_RESET });
    }
  }, []);

  useEffect(() => {
    if (adClass) {
      setFormData(adClass);
      setPlatform({ value: adClass.platform, label: adClass.platform });
    }
  }, [adClass]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    if (isCreated) {
      alert.success(`${pageName} added successfully`);
      dispatch({ type: NEW_ADCLASS_RESET });
      navigate("/adClasses");
    }
  }, [error, adClass]);

  const setDate = (name) => (value) => handleChange({ name, value });

  const submitHandler = (e) => {
    e.preventDefault();
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
                                  <Input
                                    label="Name"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                    required={true}
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    label="Class Slug"
                                    name="slug"
                                    value={formData.slug || ""}
                                    onChange={handleChange}
                                    required={true}
                                  />
                                </div>
                                <div className="col-12">
                                  <SelectInput
                                    label="Platform"
                                    value={platform}
                                    handleChange={(e) => {
                                      setPlatform({
                                        value: e.value,
                                        label: e.value,
                                      });
                                      handleChange({
                                        name: "platform",
                                        value: e.value,
                                      });
                                    }}
                                    name="platform"
                                    required={true}
                                    options={[
                                      {
                                        name: "Mobile",
                                        _id: "Mobile",
                                      },
                                      {
                                        name: "Web",
                                        _id: "Web",
                                      },
                                      {
                                        name: "Both",
                                        _id: "Both",
                                      },
                                    ]}
                                  />
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

export default AdClass;
