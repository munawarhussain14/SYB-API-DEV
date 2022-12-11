import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Input from "../../../layout/common/Input";
import SelectInput from "../../../layout/common/Select";

const TypePackage = ({ packagesData = [], handleChange }) => {
  const alert = useAlert();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [days, setDays] = useState();

  useEffect(() => {
    console.log(packagesData);
  }, []);

  const handleAdd = () => {
    if (title == "" || price == "" || days == "") {
      alert.error("Fill all Field");
      return;
    }
    let temp = [...packagesData, { title, days, price }];
    handleChange({ name: "packages", value: temp });
    setTitle(null);
    setPrice(null);
    setDays(null);
  };

  const onRemove = (value) => {
    let temp = packagesData.filter((e) => e != value);
    handleChange({ name: "packages", value: temp });
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Packages</div>
        <div className="card-body">
          <div style={{ margin: "20px" }}>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <Input
                      label="Package Title"
                      name="title"
                      value={title || ""}
                      onChange={(e) => setTitle(e.value)}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label="Price"
                      name="price"
                      type="number"
                      value={price || ""}
                      onChange={(e) => setPrice(e.value)}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label="Days"
                      name="days"
                      type="number"
                      value={days || ""}
                      onChange={(e) => setDays(e.value)}
                    />
                  </div>
                  <div className="col-12 text-center">
                    <a
                      className="btn btn-primary"
                      style={{ color: "white" }}
                      onClick={handleAdd}
                    >
                      Add
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <h3>Packages</h3>
                <hr></hr>
              </div>
              <div className="col-12">
                {packagesData && packagesData.length == 0 ? (
                  <h5>No Package</h5>
                ) : (
                  <Fragment>
                    <h5>Interstitial (Pop-up)</h5>
                    <ul className="list-group">
                      {packagesData.map((value, index) => (
                        <li key={index} className="list-group-item">
                          <table width={"100%"}>
                            <tbody>
                              <tr>
                                <td width={"98%"}>
                                  <b>Title:</b> {value.title}, <b>Price:</b>{" "}
                                  {value.price} and <b>Days:</b> {value.days}
                                </td>
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
                      ))}
                    </ul>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TypePackage;
