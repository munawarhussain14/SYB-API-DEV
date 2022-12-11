import React, { Component } from "react";

const Textarea = ({ label, name, value, onChange, ...state }) => {
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
      <textarea
        onChange={(e) => onChange({ name, value: e.target.value })}
        className="form-control"
        id={name}
        rows="3"
        {...state}
        defaultValue={value}
      ></textarea>
    </div>
  );
};

export default Textarea;
