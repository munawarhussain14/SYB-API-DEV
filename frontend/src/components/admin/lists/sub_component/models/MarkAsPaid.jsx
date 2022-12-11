import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Modal } from "react-bootstrap";
import Input from "../../../../layout/common/Input";
import SelectInput from "../../../../layout/common/Select";
import {
  getPackages,
  clearErrors,
} from "../../../../../actions/packageActions";
import { RESET_PACKAGE_REQUEST } from "../../../../../constants/packageConstants";
import Packages from "../../../packages/packages";

const MarkAsPaid = ({ paidShow, handleClose, submitPaid }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [listPackage, setListPackage] = useState({});
  const [untilSold, setUntilSold] = useState(false);
  const [paymentPackage, setPaymentPackage] = useState({});

  const { loading, error, packages, count, resPerPage } = useSelector(
    (state) => state.packages
  );

  const handlePaymentChange = ({ name, value }) => {
    setPaymentPackage((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getPackages("", 0));
  }, [dispatch, alert, error, params]);

  return (
    <Modal show={paidShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mark as Paid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <SelectInput
              label="Package"
              name="package_title"
              value={listPackage || ""}
              handleChange={(e) => {
                setListPackage(e);
                handlePaymentChange({ name: "package_name", value: e.label });
                let temp = packages.find((p) => p._id == e.value);
                setUntilSold(temp.untilSold);
                handlePaymentChange({
                  name: "untilSold",
                  value: temp.untilSold,
                });
                handlePaymentChange({
                  name: "package_price",
                  value: temp.price,
                });
                handlePaymentChange({
                  name: "duration",
                  value: temp.duration,
                });
                handlePaymentChange({
                  name: "featured",
                  value: temp.featured,
                });
                handlePaymentChange({
                  name: "special",
                  value: temp.special,
                });
              }}
              options={packages}
            />
          </div>
          <div className="col-12">
            <Input
              label="Payment Source"
              name="payment_source"
              value={paymentPackage.payment_source || ""}
              onChange={handlePaymentChange}
            />
          </div>
          <div className="col-6">
            <Input
              label="Package Price"
              name="package_price"
              type="number"
              value={paymentPackage.package_price || ""}
              onChange={handlePaymentChange}
            />
          </div>
          <div className="col-6">
            <Input
              label="Duration Days"
              name="duration"
              type="number"
              disabled={untilSold}
              value={paymentPackage.duration || ""}
              onChange={handlePaymentChange}
            />
          </div>
          <div className="col-4">
            <div className="form-group form-check">
              <input
                type="checkbox"
                name="featured"
                checked={paymentPackage.featured}
                defaultChecked={false}
                onClick={(event) => {
                  handlePaymentChange({
                    name: "featured",
                    value: event.target.checked,
                  });
                }}
                className="form-check-input"
              />
              <label className="form-check-label">Featured</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group form-check">
              <input
                type="checkbox"
                name="special"
                checked={paymentPackage.special}
                defaultChecked={false}
                onClick={(event) => {
                  handlePaymentChange({
                    name: "special",
                    value: event.target.checked,
                  });
                }}
                className="form-check-input"
              />
              <label className="form-check-label">Special</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group form-check">
              <input
                type="checkbox"
                name="untilSold"
                checked={paymentPackage.untilSold}
                defaultChecked={false}
                onClick={(event) => {
                  setUntilSold(event.target.checked);
                  handlePaymentChange({
                    name: "untilSold",
                    value: event.target.checked,
                  });
                }}
                className="form-check-input"
              />
              <label className="form-check-label">Until Sold</label>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button> */}
        <Button
          variant="primary"
          onClick={() => {
            submitPaid(paymentPackage);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MarkAsPaid;
