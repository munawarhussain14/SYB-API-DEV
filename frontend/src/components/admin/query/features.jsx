import React, { useState, useEffect, Fragment } from "react";
import Input from "../../layout/common/Input";

const Features = ({ handleChange, values = null }) => {
  const [features, setFeatures] = useState([]);
  const [feature, setFeature] = useState("");

  useEffect(() => {
    if (values) {
      setFeatures(values);
    }
  }, [values]);

  const addFeature = () => {
    if (feature != "") {
      let temp = [...features, feature];
      setFeatures(temp);
      setFeature("");
      handleChange({ name: "features", value: temp });
    }
  };

  const onRemove = (value) => {
    let temp = features.filter((i) => i != value);
    setFeatures(temp);
    handleChange({ name: "features", value: temp });
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Features</div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <div style={{ margin: "20px" }}>
                <div className="row">
                  <div className="col-10">
                    <Input
                      label="Feature"
                      name="feature"
                      value={feature}
                      onChange={(e) => {
                        setFeature(e.value);
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <a
                      className="btn btn-primary"
                      style={{ color: "white", marginTop: "30px" }}
                      onClick={addFeature}
                    >
                      Add
                    </a>
                  </div>
                  <div className="col-12">
                    <ul className="list-group">
                      {features.length == 0 ? (
                        <li className="list-group-item">No Feature</li>
                      ) : (
                        features.map((value, index) => (
                          <li key={index} className="list-group-item">
                            <table width={"100%"}>
                              <tbody>
                                <tr>
                                  <td width={"98%"}>{value}</td>
                                  <td>
                                    <a
                                      className="btn btn-primary"
                                      onClick={() => {
                                        onRemove(value);
                                      }}
                                      style={{ color: "white" }}
                                    >
                                      x
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Features;
