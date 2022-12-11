import React from "react";

const Input = ({ label, name, value, onChange, type = "input", ...state }) => {
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
      <input
        type={type}
        id={name}
        name={name}
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target)}
        {...state}
      />
    </div>
  );
};

export default Input;
