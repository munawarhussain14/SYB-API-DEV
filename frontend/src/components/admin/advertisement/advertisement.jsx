import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../layout/common/Input";
import { getAll as fetchAllPackage } from "../../../actions/adPackageActions";
import { getAll as getAllAdClass } from "../../../actions/adClassActions";
import {
  create as newAd,
  fetch as fetchAd,
} from "../../../actions/advertisementActions";

import SelectInput from "../../layout/common/Select";
import Country from "../partials/country";
import Textarea from "../../layout/common/Textarea";
import {
  GET_ADPACKAGE_RESET,
  ALL_ADPACKAGES_RESET,
} from "../../../constants/adPackageConstants";
import {
  ALL_ADCLASS_RESET,
  ALL_ADTYPE_RESET,
} from "../../../constants/adClassConstants";
import ImageSelector from "./partials/image";

const Advertisement = () => {
  const pageName = "Advertisement";
  const route = "advertisements";
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [size, setSize] = useState({});
  const [formData, setFormData] = useState({});
  const [adPackages, setAdPackages] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [adClass, setAdClass] = useState(null);
  const [type, setType] = useState(null);
  const [adPackage, setAdPackage] = useState({});
  const [image, setImage] = useState(null);
  const [validImage, setValidImage] = useState(false);

  const { loading, isCreated, advertisement, error, isUpdated } = useSelector(
    (state) => {
      return state.advertisement;
    }
  );

  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const { package: packageData } = useSelector((state) => {
    return state.adPackage;
  });

  const { adClasses } = useSelector((state) => {
    return state.adClasses;
  });

  const { types } = useSelector((state) => {
    return state.types;
  });

  const { packages } = useSelector((state) => state.adPackages);

  useEffect(() => {
    dispatch({ type: GET_ADPACKAGE_RESET });
    dispatch(fetchAllPackage());
  }, []);

  useEffect(() => {
    if (packages) {
      //setCurrency(packages[0].country.currency);
      setAdPackages(packages);
    } else {
      setCurrency(null);
      setAdPackages([]);
    }
  }, [packages]);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchAd(params.id));
    }
    dispatch(getAllAdClass());
  }, []);

  useEffect(() => {
    if (advertisement) {
      setFormData(advertisement);
    }
  }, [advertisement]);

  useEffect(() => {
    if (packageData) {
      setFormData(packageData);
      if (packageData.adClass)
        setAdClass({
          value: packageData.adClass._id,
          label: packageData.paadClassge.name,
        });
      if (packageData.type)
        setType({ value: packageData.type._id, label: packageData.type.name });
    }
  }, [packageData]);

  useEffect(() => {}, [formData.adClass, formData.type, formData.country]);

  useEffect(() => {
    dispatch({ type: ALL_ADCLASS_RESET });
    dispatch({
      type: ALL_ADTYPE_RESET,
    });
    dispatch({ type: ALL_ADPACKAGES_RESET });
    setAdClass(null);
    handleChange({
      name: "adClass",
      value: null,
    });
    setType(null);
    handleChange({
      name: "type",
      value: null,
    });
  }, [formData.country]);

  useEffect(() => {
    dispatch({
      type: ALL_ADTYPE_RESET,
    });
    dispatch({ type: ALL_ADPACKAGES_RESET });
    setType(null);
  }, [formData.adClass]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    if (isCreated) {
      alert.success(`${pageName} added successfully`);
      navigate(`/${route}`);
    }
  }, [error, packageData]);

  const setDate = (name) => (value) => handleChange({ name, value });

  const submitHandler = (e) => {
    e.preventDefault();

    let valid = true;

    if (formData["name"] == null || formData["email"] == null) {
      alert.error("Please provide client Name/Email");
      valid = false;
    } else if (formData["title"] == null) {
      alert.error("Please provide Ad Title");
      valid = false;
    } else if (formData["adClass"] == null) {
      alert.error("Please select Ad Class");
      valid = false;
    } else if (formData["type"] == null) {
      alert.error("Please provide Ad Type");
      valid = false;
    } else if (!validImage) {
      alert.error("Please provide Valid Ad Image");
      valid = false;
    } else {
      valid = true;
    }

    if (valid) {
      const data = new FormData();
      data.append("name", formData["name"]);
      data.append("email", formData["email"]);
      data.append("phone", formData["phone"]);
      data.append("title", formData["title"]);
      data.append("redirect", formData["redirect"]);
      if (formData["content"]) data.append("content", formData["content"]);
      data.append("adClass", formData["adClass"]);
      data.append("type", formData["type"]);
      data.append("country", formData["country"]["_id"]);
      // if (formData["category"])
      //   data.append("category", formData["category"]["_id"]);
      // if (formData["sub_category"])
      //   data.append("sub_category", formData["sub_category"]["_id"]);
      data.append("adPackage.title", formData["package"]["title"]);
      data.append("adPackage.price", formData["package"]["price"]);
      data.append("adPackage.days", formData["package"]["days"]);
      data.set("file", image);
      console.log(formData);
      if (params.id) {
        //dispatch(update(params.id, formData));
      } else {
        dispatch(newAd(data));
      }
    }
  };

  return (
    <Fragment>
      <MetaData title={params.id ? `Update ${pageName}` : `New ${pageName}`} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10">
            <div className="">
              {loading ? (
                <Loader />
              ) : (
                <Fragment>
                  <div className="row">
                    <div className="col-12">
                      <div className="container">
                        <div className="card">
                          <div className="card-header">
                            <h4>
                              {params.id
                                ? `Update ${pageName}`
                                : `New ${pageName}`}
                            </h4>
                          </div>
                          <div className="card-body">
                            <form
                              style={{ padding: "20px" }}
                              onSubmit={submitHandler}
                              encType="multipart/form-data"
                            >
                              <div className="row">
                                <div className="col-12">
                                  <Input
                                    label="Redirect Link/Url/Address"
                                    name="redirect"
                                    value={formData.redirect || ""}
                                    onChange={handleChange}
                                    required={true}
                                  />
                                </div>
                                <div className="col-12">
                                  <Input
                                    label="Title"
                                    name="title"
                                    value={formData.title || ""}
                                    onChange={handleChange}
                                    required={true}
                                  />
                                </div>
                                <div className="col-12">
                                  <Textarea
                                    label="Content"
                                    name="content"
                                    type="text"
                                    value={formData.content || ""}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-12">
                                  <Country
                                    country={formData.country || ""}
                                    onChange={(e) => {
                                      handleChange({
                                        value: e.value,
                                        name: "country",
                                      });
                                    }}
                                    required={true}
                                  />
                                </div>
                                <div className="col-12">
                                  <SelectInput
                                    label="Package"
                                    preText="adClass"
                                    preSubField="name"
                                    text="title"
                                    text2="price"
                                    text3="country"
                                    text3SubField="currency"
                                    fixLabel={currency || ""}
                                    value={adPackage}
                                    handleChange={(e) => {
                                      let temp = adPackages.filter(
                                        (p) => p._id == e.value
                                      )[0];
                                      let data = {
                                        title: temp.title,
                                        days: temp.days,
                                        price: temp.price,
                                      };
                                      setAdPackage({
                                        value: e.value,
                                        label: e.label,
                                      });
                                      handleChange({
                                        name: "package",
                                        value: data,
                                      });
                                    }}
                                    name="package"
                                    required={true}
                                    options={adPackages}
                                  />
                                </div>
                              </div>
                              <ImageSelector
                                imageSize={size}
                                adImage={formData.image || null}
                                setImage={setImage}
                                setValidImage={setValidImage}
                              />
                              <button
                                style={{ width: "300px", margin: "auto" }}
                                id="login_button"
                                type="submit"
                                className="btn btn-primary btn-block py-3"
                                disabled={loading ? true : false}
                              >
                                {params.id ? "Update" : "Save"}
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Advertisement;
