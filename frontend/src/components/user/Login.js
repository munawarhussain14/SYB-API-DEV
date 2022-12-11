import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

const Login = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      if (error!="Null Token") alert.error(error);
    }
    if (isAuthenticated) {
      navigator("/");
    }
  }, [dispatch, alert, isAuthenticated, error, navigator]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <center>
      <MetaData title={"Login"} />
      <div className="login-box">
        <div className="login-logo" style={{ marginTop: "80px" }}>
          <a>
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              width="200"
            />
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={submitHandler}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            {/* <p className="mb-1">
              <Link to="" className="float-right mb-4">
                Forgot Password?
              </Link>
            </p>
            <p className="mb-0">
              <Link to="" className="text-center">
                New User?
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </center>
  );
};

export default Login;
