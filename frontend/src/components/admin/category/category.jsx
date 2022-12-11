import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../layout/common/Input";
import {
  getPrentsCategories,
  newCategory,
} from "../../../actions/categoryActions";
import SelectInput from "../../layout/common/Select";
import { NEW_CATEGORY_RESET } from "../../../constants/categoryConstants";

const Category = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [parent, setParent] = useState({});
  const [categories, setCategories] = useState([]);
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const { loading, isCreated, category, error } = useSelector((state) => {
    return state.category;
  });

  const { isLoaded, options } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch({ type: NEW_CATEGORY_RESET });
    getCategories();
  }, []);

  const getCategories = async (field, name) => {
    let temp = await getPrentsCategories();
    setCategories(temp.data);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (error) {
      alert.error("Some error occur");
      return;
    }
    if (isCreated) {
      alert.success("Category added successfully");
      dispatch({ type: NEW_CATEGORY_RESET });
      navigate("/categories");
    }
  }, [error, category, isCreated]);

  const setDate = (name) => (value) => handleChange({ name, value });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(newCategory(formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Category"} />
      <div className="container-fluid">
        <div className="row">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Update Package</h4>
                  </div>
                  <div className="card-body">
                    <form
                      style={{ padding: "20px" }}
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-6">
                          <Input
                            label="Category Title"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        {/* <div className="col-6">
                          <Input
                            label="Category Slug"
                            name="slug"
                            value={formData.slug || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div> */}
                        <div className="col-6">
                          <SelectInput
                            label="Parent"
                            name="parent"
                            value={parent}
                            handleChange={(e) => {
                              handleChange({
                                name: "parent",
                                value: e.value,
                              });
                              setParent({ label: e.label, value: e.value });
                            }}
                            options={categories}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Icon"
                            name="icon"
                            value={formData.icon || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <button
                        style={{ width: "300px", margin: "auto" }}
                        id="login_button"
                        type="submit"
                        className="btn btn-primary btn-block py-3"
                        disabled={loading ? true : false}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Category;
