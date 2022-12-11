import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import TopBar from "../admin/topBar";

const AdminTemplate = ({ title, component: Component }) => {
  const navigate = useNavigate();

  const onHandleBack = () => {
    navigate(-1);
  };
  return (
    <div className="wrapper">
      <TopBar />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>
                  {title != "Dashboard" ? (
                    <Fragment>
                      <button
                        className="btn btn-primary"
                        onClick={onHandleBack}
                      >
                        <i className="fa fa-arrow-left"></i>
                      </button>
                      &nbsp;&nbsp;&nbsp;
                    </Fragment>
                  ) : (
                    ""
                  )}

                  {title}
                </h1>
              </div>
              {/* <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Blank Page</li>
                    </ol>
                  </div> */}
            </div>
          </div>
        </section>
        <section className="content">
          <Component />
        </section>
      </div>
    </div>
  );
};

export default AdminTemplate;
