import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectInput from "../../layout/common/Select";
import { getCountries } from "../../../actions/locationActions";

const Country = ({ onChange, country }) => {
  const dispatch = useDispatch();
  const [selectedCountry, setCountry] = useState(null);
  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (country) {
      setCountry({ label: country.name, value: country._id });
    }
  }, [country]);

  const handleChangeCountry = (obj) => {
    setCountry(obj);
    let index = countries.findIndex((v) => v._id === obj.value);
    onChange({ name: "country", value: countries[index] });
  };

  return (
    <Fragment>
      <SelectInput
        label="Country"
        name="country"
        value={selectedCountry}
        handleChange={handleChangeCountry}
        options={countries}
      />
    </Fragment>
  );
};

export default Country;
