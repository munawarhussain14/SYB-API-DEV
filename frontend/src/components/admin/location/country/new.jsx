import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../../layout/MetaData";
import Loader from "../../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../layout/common/Input";
import {
  newCountry,
} from "../../../../actions/locationActions";

const NewCountry = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);
  const [formData, setFormData] = useState({});
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!formData.enable){
      formData.enable = false;
    }
    let data = await newCountry(formData);
    if(data.success){
      setLoading(false);
      alert.success("Country created");
      navigate("/location/countries");
    }
  };

  return (
    <Fragment>
      <MetaData title={"New Country"} />
      <div className="container-fluid">
        <div className="row">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>New Country</h4>
                  </div>
                  <div className="card-body">
                    <form
                      style={{ padding: "20px" }}
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-6">
                          <Input
                            label="Country Name"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Currency"
                            name="currency"
                            value={formData.currency || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-6">
                          <div className="form-group form-check">
                            <input
                              type="checkbox"
                              name="enable"
                              checked={enable}
                              onChange={(event) => {
                                setEnable(event.target.checked);
                                handleChange({
                                  name: "enable",
                                  value: event.target.checked,
                                });
                              }}
                              className="form-check-input"
                            />
                            <label className="form-check-label">Enable</label>
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
                        Save
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

export default NewCountry;
