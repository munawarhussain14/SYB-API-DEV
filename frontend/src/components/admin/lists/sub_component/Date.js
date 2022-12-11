import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";

const DateInput = ({ value, name, label, onChange: handleChange }) => {
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (value) setDate(new Date(value));
  }, [value]);

  const onChangeDate = (v) => {
    setDate(v);
    if (v) handleChange(v.toString());
    else handleChange(null);
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <br />
      <DatePicker name={name} onChange={onChangeDate} value={date || ""} />
    </div>
  );
};

export default DateInput;
