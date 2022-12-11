import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import { getPackage } from "../../../actions/packageActions";

const AddPackage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = ({ name, value }) => {
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const {
    loading,
    package: packageData,
    error,
  } = useSelector((state) => {
    return state.packageDetail;
  });

  useEffect(() => {
    if (params.id) {
      dispatch(getPackage(params.id));
    }
  }, []);

  return (
    <Fragment>
      <MetaData title={"Package"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Package</h4>
              </div>
              <div className="card-body">
                <div style={{ padding: "20px" }}>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="row">
                      <div className="col-12">
                        <label>Package Title</label>
                        <div className="form-control">
                          {packageData.name || "None"}
                        </div>
                      </div>
                      <div className="col-3">
                        <label>Price</label>
                        <div className="form-control">
                          {packageData.price || "None"}
                        </div>
                      </div>
                      <div className="col-3">
                        <label>Days/Duration</label>
                        <div className="form-control">
                          {packageData.duration || "None"}
                        </div>
                      </div>
                      <div className="col-3">
                        <label>Until Sold</label>
                        <div className="form-control">
                          {packageData.untilSold ? "Yes" : "No"}
                        </div>
                      </div>
                      <div className="col-3">
                        <label>Discount</label>
                        <div className="form-control">
                          {packageData.discount || "None"}
                        </div>
                      </div>
                      <div className="col-3">
                        <label>Discount End Date</label>
                        <div className="form-control">
                          {packageData.discount_end_date || "None"}
                        </div>
                      </div>
                      <div className="col-12">
                        <label>Detail</label>
                        <div className="form-control">
                          {packageData.detail || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Country</label>
                        <div className="form-control">
                          {packageData.country
                            ? packageData.country.name
                            : "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Type</label>
                        <div className="form-control">
                          {packageData.type || "None"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Special</label>
                        <div className="form-control">
                          {packageData.special ? "Yes" : "No"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Featured</label>
                        <div className="form-control">
                          {packageData.featured ? "Yes" : "No"}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Enabled</label>
                        <div className="form-control">
                          {packageData.enable ? "Yes" : "No"}
                        </div>
                      </div>
                      <div className="col-12">
                        <br></br>
                        <label>Features</label>
                        <ul>
                          {packageData.features &&
                          packageData.features.length > 0
                            ? packageData.features.map((element) => (
                                <li key={element}>{element}</li>
                              ))
                            : "No Feature"}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddPackage;
