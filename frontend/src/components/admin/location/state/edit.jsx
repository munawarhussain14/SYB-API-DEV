import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../../layout/MetaData";
import Loader from "../../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../layout/common/Input";
import {
  getState,
  updateState,
  getCountriesList,
} from "../../../../actions/locationActions";
import SelectInput from "../../../layout/common/Select";

const EditState = () => {
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [formData, setFormData] = useState({});
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    getCountries();
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    let data = await getState(params.id);
    setFormData({ ...data.state });
    setCountry({ label: data.state.country.name, value: data.state.country._id });
    setEnable(data.state.enable);
    setLoading(false);
  };

  const getCountries = async (field, name) => {
    let temp = await getCountriesList();
    setCountries(temp.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.enable) {
      formData.enable = false;
    }
    let data = await updateState(params.id,formData);
    if (data.success) {
      setLoading(false);
      alert.success("State created");
      navigate("/location/states");
    }
  };

  return (
    <Fragment>
      <MetaData title={"New State"} />
      <div className="container-fluid">
        <div className="row">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>New State</h4>
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
                            label="State Name"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-6">
                          <SelectInput
                            label="Country"
                            name="country"
                            value={country}
                            handleChange={(e) => {
                              handleChange({
                                name: "country",
                                value: e.value,
                              });
                              setCountry({ label: e.label, value: e.value });
                            }}
                            options={countries}
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

export default EditState;
