import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, user } = useSelector((state) => state.auth);
  const navigator = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigator("/login");
    }
  });

  return (
    <Fragment>
      {loading === false && user ? (
        Component
      ) : (
        <div style={{ marginTop: "200px" }}>
          <Loader />
        </div>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
