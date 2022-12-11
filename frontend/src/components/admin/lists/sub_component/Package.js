import React, { Fragment } from "react";
import SelectInput from "../../../layout/common/Select";

const Package = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <h2>Package</h2>
          <hr></hr>
        </div>
        <div className="col-6">
          <SelectInput
            label="Package"
            name="package"
            // value={packageType}
            // handleChange={setPackageType}
            // options={packages}
            specifier="value"
            text="label"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Package;
