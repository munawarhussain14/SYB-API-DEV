import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import {
  getQuery,
  updateQuery,
  approveQuery,
} from "../../../actions/buyerQueryActions";
import Textarea from "../../layout/common/Textarea";
import Input from "../../layout/common/Input";
import {
  getCountriesList,
  getStatesList,
} from "../../../actions/locationActions";
import SelectInput from "../../layout/common/Select";
import Categories from "../lists/sub_component/Categories";

const EditBuyerQuery = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [country, setCountry] = useState({});
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState({});
  const [states, setStates] = useState([]);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(async () => {
    if (params.id) {
      setLoading(true);
      let response = await getQuery(params.id);
      setData(response.data);
      setMax(response.data.expected_price.max);
      setMin(response.data.expected_price.min);
      setLoading(false);
      let temp = await getCountriesList();
      setCountries(temp.data);
      if (response.data.country) {
        setCountry({
          label: response.data.country.name,
          value: response.data.country._id,
        });

        getStates(response.data.country._id);
        if (response.data.state) {
          setState({
            label: response.data.state.name,
            value: response.data.state._id,
          });
        }
      }
      //console.log(response);
    } else {
      navigate("buyer-queires");
    }
  }, []);

  const getStates = async (country) => {
    let temp = await getStatesList(country);
    setStates(temp.data);
  };

  const handleChange = ({ name, value }) => {
    setData((values) => ({ ...values, [name]: value }));
  };

  const checkNull = (obj,key)=>{
    if (obj[key] != null && obj[key]["_id"] != undefined) {
      return true;
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (checkNull(data, "category")) {
      data["category"] = data["category"]["_id"];
    }else if (data["category"]==null){
      alert.info("Please select Category");
      return;
    }

    if (checkNull(data, "sub_category")) {
      data["sub_category"] = data["sub_category"]["_id"];
    }else if (data["sub_category"]==null){
      alert.info("Please select Sub Category");
      return;
    }

    if (checkNull(data, "country")) {
      data["country"] = data["country"]["_id"];
    } else if (data["country"] == null) {
      alert.info("Please select Country");
      return;
    }

    if (checkNull(data, "state")) {
      data["state"] = data["state"]["_id"];
    } else if (data["state"] == null) {
      alert.info("Please select State");
      return;
    }

    if (data["expected_price"]["min"] > data["expected_price"]["max"]){
      alert.error("Invalid Expected Price");
      return;
    }

    console.log(data);
    setLoading(true);
    
    let response = await updateQuery(params.id, data);
    if (response.success) {
      alert.success("Query updated");
      navigate(`/buyer-queries/show/${params.id}`);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <MetaData title={"Buyer Query"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <form
              style={{ padding: "20px" }}
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <div className="col-12 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5>Query</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ padding: "20px", paddingTop: 0 }}>
                      <div className="row">
                        <div className="col-12">
                          <Input
                            label="Question"
                            name="question"
                            value={data.question || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-12">
                          <Textarea
                            label="Detail"
                            name="detail"
                            value={data.detail || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5>Area of Interest</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ padding: "20px", paddingTop: 0 }}>
                      <div className="row">
                        <div className="col-6">
                          <Input
                            label="Expected Price Min"
                            name="expected_price_min"
                            value={min || ""}
                            onChange={(e) => {
                              let temp = data;
                              temp["expected_price"]["min"] = e.value;
                              setData(temp);
                              setMin(e.value);
                            }}
                            required={true}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Expected Price Max"
                            name="expected_price_max"
                            value={max || ""}
                            onChange={(e) => {
                              let temp = data;
                              temp["expected_price"]["max"] = e.value;
                              setData(temp);
                              setMax(e.value);
                            }}
                            required={true}
                          />
                        </div>
                        <Categories
                          category={data.category || ""}
                          sub_category={data.sub_category || ""}
                          onChange={handleChange}
                          required={true}
                        />
                        <div className="col-6">
                          <SelectInput
                            label="Country"
                            name="country"
                            value={country}
                            required={true}
                            handleChange={(e) => {
                              handleChange({
                                name: "country",
                                value: e.value,
                              });
                              setCountry({ label: e.label, value: e.value });
                              setState(null);
                              getStates(e.value);
                              handleChange({
                                name: "state",
                                value: null,
                              });
                            }}
                            options={countries}
                          />
                        </div>
                        <div className="col-6">
                          <SelectInput
                            label="State"
                            name="state"
                            value={state}
                            required={true}
                            handleChange={(e) => {
                              handleChange({
                                name: "state",
                                value: e.value,
                              });
                              setState({ label: e.label, value: e.value });
                            }}
                            options={states}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5>Client Detail</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ padding: "20px", paddingTop: 0 }}>
                      <div className="row">
                        <div className="col-12">
                          <Input
                            label="Client Name"
                            name="name"
                            value={data.name || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Email"
                            name="email"
                            value={data.email || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            label="Phone"
                            name="phone_no"
                            value={data.phone_no || ""}
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 p-2">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default EditBuyerQuery;
