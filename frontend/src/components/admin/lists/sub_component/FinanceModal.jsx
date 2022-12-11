import React, { useState } from "react";
import Input from "../../../layout/common/Input";
import SelectInput from "../../../layout/common/Select";
import { updateList } from "../../../../actions/listActions";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const FinanceModal = ({ data, list_id }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [year, setYear] = useState(null);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const options = [
    { label: 2021, value: 2021 },
    { label: 2020, value: 2020 },
    { label: 2019, value: 2019 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = "";
    if (!year) {
      message = "Year";
    } else {
      let temp = data.filter((v) => v.year === year.value);
      if (temp.length > 0) {
        alert.error("Record for the Year already added");
        return false;
      }
    }

    if (!revenue) {
      if (message != "") message += ", ";
      message += "Revenue";
    }

    if (!profit) {
      if (message != "") message += ", ";
      message += "Profit";
    }
    if (message != "") alert.info("Please mention " + message);
    const listData = {
      finance: [{ year: year.value, revenue, profit }, ...data],
    };
    dispatch(updateList(list_id, listData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-3">
          <SelectInput
            label="Year"
            name="year"
            value={year}
            options={options}
            specifier="value"
            text="label"
            onChange={setYear}
          />
        </div>
        <div className="col-3">
          <Input
            label="Revenue"
            name="revenue"
            value={revenue}
            onChange={(e) => setRevenue(e.value)}
            type="number"
          />
        </div>
        <div className="col-3">
          <Input
            label="Profit"
            name="profit"
            value={profit}
            onChange={(e) => setProfit(e.value)}
            type="number"
          />
        </div>
        <div className="col-3">
          <br />
          <button type="input" className="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default FinanceModal;
