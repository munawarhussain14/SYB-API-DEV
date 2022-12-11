import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectInput from "../../../layout/common/Select";
import {
  getCountries,
  getStates,
  getCities,
} from "../../../../actions/locationActions";
import {
  GET_STATES_RESET,
  GET_CITIES_RESET,
} from "../../../../constants/locationConstants";

const Location = ({ onChange, country, state, city }) => {
  const dispatch = useDispatch();
  const [selectedCountry, setCountry] = useState(null);
  const [selectedState, setState] = useState(null);
  const [selectedCity, setCity] = useState(null);
  const { countries } = useSelector((state) => state.countries);
  const { states } = useSelector((state) => state.states);
  const { cities } = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (country) {
      setCountry({ label: country.name, value: country._id });
      dispatch(getStates(country._id));
    }
    if (state) {
      setState({ label: state.name, value: state._id });
      dispatch(getCities(state._id));
    }
    if (city) setCity({ label: city.name, value: city._id });
  }, [country, state, city]);

  const handleChangeCountry = (obj) => {
    setCountry(obj);
    setState(null);
    setCity(null);
    let index = countries.findIndex((v) => v._id === obj.value);
    onChange({ name: "country", value: countries[index] });
    dispatch(getStates(obj.value));
    dispatch({ type: GET_CITIES_RESET });
  };

  const handleChangeState = (obj) => {
    setState(obj);
    setCity(null);
    let index = states.findIndex((v) => v._id === obj.value);
    onChange({ name: "state", value: states[index] });
    dispatch(getCities(obj.value));
  };

  return (
    <Fragment>
      <div className="col-6">
        <SelectInput
          label="Country"
          name="country"
          value={selectedCountry}
          handleChange={handleChangeCountry}
          options={countries}
        />
      </div>
      <div className="col-6">
        <SelectInput
          label="State"
          name="state"
          value={selectedState}
          handleChange={handleChangeState}
          options={states}
        />
      </div>
      <div className="col-6">
        <SelectInput
          label="City"
          name="city"
          value={selectedCity}
          handleChange={(e) => {
            setCity(e);
            let index = cities.findIndex((v) => v._id === e.value);
            onChange({ name: "city", value: cities[index] });
          }}
          options={cities}
        />
      </div>
    </Fragment>
  );
};

export default Location;
