import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../../layout/MetaData";
import Loader from "../../../layout/Loader";

import { useAlert } from "react-alert";
import Input from "../../../layout/common/Input";
import {
  newCity,
  getCountriesList,
  getStatesList,
  getCity,
  getState,
} from "../../../../actions/locationActions";
import SelectInput from "../../../layout/common/Select";

export default () => {
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);
  const [country, setCountry] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [state, setState] = useState({});
  const [formData, setFormData] = useState({});
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  useEffect(async () => {
    await getCountries();
    let data = await getCity(params.id);
    handleChange({name:"name",value:data.city.name});
    await getCountries();
    let tempState = await getStates(data.city.state.country._id);
    setState({ label: data.city.state.name, value: data.city.state._id });
    setCountry({
      label: data.city.state.country.name,
      value: data.city.state.country._id,
    });
  }, []);

  const getCountries = async () => {
    let temp = await getCountriesList();
    setCountries(temp.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.enable) {
      formData.enable = false;
    }
    let data = await newCity(formData);
    if (data.success) {
      setLoading(false);
      alert.success("City created");
      navigate("/location/cities");
    }
  };

  const getStates = async (country) => {
    let temp = await getStatesList(country);
    setStates(temp.data);
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
                    <h4>New City</h4>
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
                            label="City Name"
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
                              getStates(e.value);
                            }}
                            options={countries}
                          />
                        </div>
                        <div className="col-6">
                          <SelectInput
                            label="State"
                            name="state"
                            value={state}
                            handleChange={(e) => {
                              handleChange({
                                name: "state",
                                value: e.value,
                              });
                              setState({ label: e.label, value: e.value });
                            }}
                            options={states}
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
