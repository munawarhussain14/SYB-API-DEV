import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectInput from "../../../layout/common/Select";
import { getAllActivity } from "../../../../actions/activityActions";

const Activities = ({ values, onChange }) => {
  const dispatch = useDispatch();
  const { loading, activities } = useSelector((state) => state.activities);
  const [selectedActivities, setSelected] = useState([]);
  useEffect(() => {
    dispatch(getAllActivity({ resPerPage: 500 }));
  }, []);

  useEffect(() => {
    if (values) {
      console.log("change in Activity Values");
      let temp = values.map((v) => {
        return { label: v.name, value: v._id };
      });
      setSelected(temp);
    }
  }, [values]);

  const handleChangeActvity = (v) => {
    //setSelected(v);
    let temp = v.map((i) => {
      return { _id: i.value, name: i.label };
    });
    temp = temp.filter((item, pos) => temp.indexOf(item) === pos);
    onChange({ name: "business_activities", value: temp });
  };

  return (
    <div className="col-12">
      <SelectInput
        label="Business Activity"
        name="business_activities"
        value={selectedActivities}
        handleChange={handleChangeActvity}
        options={activities}
        isMulti
        closeMenuOnSelect={false}
      />
    </div>
  );
};

export default Activities;
