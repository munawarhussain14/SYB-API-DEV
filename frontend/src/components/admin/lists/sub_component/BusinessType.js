import React, { useState, useEffect } from "react";
import SelectInput from "../../../layout/common/Select";

const BusinessType = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState({ value, label: value });

  const options = [
    { value: "Mainland", label: "Mainland" },
    { value: "Offshore", label: "Offshore" },
    { value: "Freezone", label: "Freezone" },
  ];

  useEffect(() => {
    const temp = options.filter((v) => v.value === value);
    setSelectedValue(temp);
  }, [value]);

  const setValue = (option) => {
    setSelectedValue(option);
    onChange({ name: "business_type", value: option.value });
  };

  return (
    <SelectInput
      label="Business Type"
      name="business_type"
      value={selectedValue}
      handleChange={setValue}
      options={options}
      specifier="value"
      text="label"
    />
  );
};

export default BusinessType;
