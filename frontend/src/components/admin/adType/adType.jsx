import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../layout/common/Input";
import { create, fetch, update } from "../../../actions/adTypeActions";
import { getAll } from "../../../actions/adClassActions";

import SelectInput from "../../layout/common/Select";

const AdType = () => {
  const pageName = "Ad Type";
  const route = "advertisementTypes";
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const { loading, isCreated, type, error } = useSelector((state) => {
    return state.type;
  });

  useEffect(() => {
    if (params.id) {
      dispatch(fetch(params.id));
    }
    dispatch(getAll());
  }, []);

  useEffect(() => {
    if (type) {
      setFormData(type);
    }
  }, [type]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    if (isCreated) {
      alert.success(`${pageName} added successfully`);
      navigate(`/${route}`);
    }
  }, [error, type]);

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
                                <div className="col-6">
                                  <Input
                                    label="Width"
                                    name="size.width"
                                    type="number"
                                    value={
                                      formData.size ? formData.size.width : ""
                                    }
                                    onChange={(e) => {
                                      let size = { ...formData.size };
                                      size.width = e.value;
                                      handleChange({
                                        name: "size",
                                        value: size,
                                      });
                                    }}
                                    required={true}
                                  />
                                </div>
                                <div className="col-6">
                                  <Input
                                    label="Height"
                                    name="size.height"
                                    type="number"
                                    value={
                                      formData.size ? formData.size.height : ""
                                    }
                                    onChange={(e) => {
                                      let size = { ...formData.size };
                                      size.height = e.value;
                                      handleChange({
                                        name: "size",
                                        value: size,
                                      });
                                    }}
                                    required={true}
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

export default AdType;
