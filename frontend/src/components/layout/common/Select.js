import React, { useEffect, useState } from "react";
import Select from "react-select";

const SelectInput = ({
  label,
  name,
  value,
  options,
  handleChange,
  specifier = "_id",
  preText = null,
  preSubField = null,
  text = "name",
  text2 = null,
  text3 = null,
  text3SubField = null,
  fixLabel = null,
  multiple = false,
  ...state
}) => {
  const [selectValue, setSelectValue] = useState({});
  let list_options = [];
  if (options)
    options.map((option) =>
      list_options.push({
        value: option[specifier],
        label:
          (preText
            ? preSubField
              ? option[preText][preSubField] + " - "
              : option[preText] + " - "
            : "") +
          option[text] +
          (text2 ? " - " + option[text2] : "") +
          (text3
            ? text3SubField
              ? " " + option[text3][text3SubField]
              : " " + option[text3]
            : "") +
          (fixLabel ? " " + fixLabel : ""),
      })
    );

  useEffect(() => {
    // setSelectValue({
    //   value: e.value,
    //   label: e.label,
    // });
  }, [value]);

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}{" "}
        {state.required != null && state.required ? (
          <span className="required">*</span>
        ) : (
          ""
        )}
      </label>
      <Select
        value={value}
        onChange={handleChange}
        options={list_options}
        {...state}
      />
    </div>
  );
};

export default SelectInput;
