import React, { Fragment, useEffect, useState } from "react";
import SelectInput from "../../../layout/common/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getSubCategories,
} from "../../../../actions/categoryActions";

const Categories = ({ category, sub_category, onChange, required = false }) => {
  const dispatch = useDispatch();

  const [selected_cat, setSelectCat] = useState(null);
  const [selected_sub_cat, setSelectSubCat] = useState(null);
  const { options } = useSelector((state) => {
    return state.categories;
  });

  const { sub_categories } = useSelector((state) => state.sub_categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (category) {
      setSelectCat({ label: category.name, value: category._id });
      dispatch(getSubCategories(category._id));
    }
  }, [category]);

  useEffect(() => {
    if (sub_category) {
      setSelectSubCat({
        label: sub_category.name,
        valeu: sub_category._id,
      });
    }
  }, [sub_category]);

  const onCatChange = (name) => (cat) => {
    if (name == "category") {
      let index = options.findIndex((v) => v._id === cat.value);
      onChange({ name, value: options[index] });
      setSelectCat(cat);
      onChange({ name: "sub_category", value: null });
      setSelectSubCat(null);
      dispatch(getSubCategories(cat.value));
    } else {
      let index = sub_categories.findIndex((v) => v._id === cat.value);
      onChange({ name, value: sub_categories[index] });
      setSelectSubCat(cat);
    }
  };

  return (
    <Fragment>
      <div className="col-6">
        <SelectInput
          label="Main Business Category"
          name="category"
          value={selected_cat}
          handleChange={onCatChange("category")}
          options={options}
          required
        />
      </div>
      <div className="col-6">
        <SelectInput
          label="Sub Category"
          name="sub_category"
          value={selected_sub_cat}
          handleChange={onCatChange("sub_category")}
          options={sub_categories}
          required
        />
      </div>
    </Fragment>
  );
};

export default Categories;
