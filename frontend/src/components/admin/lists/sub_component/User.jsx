import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDetail } from "../../../../actions/userActions";
import Loader from "../../../layout/Loader";
import { useAlert } from "react-alert";

const UserDetail = ({ user_id }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, userDetail, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user_id) {
      dispatch(loadDetail(user_id));
      if (error) {
        return alert.error(error);
      }
    }
  }, [user_id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {userDetail ? (
            <Fragment>
              <div className="col-md-4">
                <label>Name</label>
                <p>{userDetail.name}</p>
              </div>
              <div className="col-md-4">
                <label>Email</label>
                <p>{userDetail.email}</p>
              </div>
              <div className="col-md-4">
                <label>Contact</label>
                <p>{userDetail.phonenumber}</p>
              </div>
            </Fragment>
          ) : (
            <div className="col-md-12 text-center">
              <p>No User</p>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default UserDetail;
