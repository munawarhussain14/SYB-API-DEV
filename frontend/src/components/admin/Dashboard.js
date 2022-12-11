import React, { Component, Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../actions/dashboardActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading, error, summary } = useSelector((state) => state.summary);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
            <Link to="/listing/all">
              <div className="info-box">
                <span className="info-box-icon bg-info elevation-1">
                  <i className="fas fa-building"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Business</span>
                  <span className="info-box-number">
                    {summary ? summary.total_listing : "0"}
                    <small></small>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <Link to="/listing/approved">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-success elevation-1">
                  <i className="fas fa-check"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Business Approved</span>
                  <span className="info-box-number">
                    {summary ? summary.approved_listing : "0"}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="clearfix hidden-md-up"></div>

          <div className="col-12 col-sm-6 col-md-3">
            <Link to="/listing/pending">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-warning elevation-1">
                  <i className="fas fa-exclamation"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Business Pending</span>
                  <span className="info-box-number">
                    {summary ? summary.pending_listing : "0"}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <Link to="/queries">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-danger elevation-1">
                  <i className="fas fa-question"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Queries</span>
                  <span className="info-box-number">
                    {summary ? summary.total_query : "0"}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
