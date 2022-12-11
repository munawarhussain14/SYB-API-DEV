import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo1.png`}
          alt="SYB"
          className="brand-image elevation-3"
          style={{ opacity: "0.8" }}
        />
        {/* <h4 className="brand-image img-circle elevation-3">SYB</h4> */}
        <span className="brand-text font-weight-light"></span>
      </a>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            {/* <img
              src="./dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            /> 
            <h3 className="img-circle elevation-2">SYB</h3> */}
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {user && user.name}
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link parent-link">
                <i className="fa fa-building nav-icon"></i>
                <p>Businesses</p>
                <i className="fas fa-angle-left right"></i>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/listing/all" className="nav-link">
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>All</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/listing/approved" className="nav-link">
                    <i className="fa fa-check nav-icon"></i>
                    <p>Approved</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/listing/not-approved" className="nav-link">
                    <i className="far fa-clock nav-icon"></i>
                    <p>Not Approved</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/listing/uncompleted" className="nav-link">
                    <i className="fa fa-exclamation nav-icon"></i>
                    <p>Uncomplete</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/listing/no-image" className="nav-link">
                    <i className="fa fa-question nav-icon"></i>
                    <p>Images Pending</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link parent-link">
                <i className="fa fa-search nav-icon"></i>
                <p>Buyer Queries</p>
                <i className="fas fa-angle-left right"></i>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/buyer-queries/all" className="nav-link">
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>All</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/buyer-queries/approved" className="nav-link">
                    <i className="fa fa-check nav-icon"></i>
                    <p>Approved</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/buyer-queries/rejected" className="nav-link">
                    <i className="fa fa-times nav-icon"></i>
                    <p>Rejected</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/buyer-queries/closed" className="nav-link">
                    <i className="fa fa-exclamation nav-icon"></i>
                    <p>Closed</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link parent-link">
                <i className="fa fa-search nav-icon"></i>
                <p>Buyer Queries Contact</p>
                <i className="fas fa-angle-left right"></i>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/buyer-queries-contacts/all" className="nav-link">
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>All</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/buyer-queries-contacts/pending"
                    className="nav-link"
                  >
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>Pending</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/buyer-queries-contacts/process"
                    className="nav-link"
                  >
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>In-Process</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/buyer-queries-contacts/closed"
                    className="nav-link"
                  >
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>Closed</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/packages" className="nav-link">
                <i className="nav-icon fa fa-cubes"></i>
                <p>Packages</p>
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link parent-link">
                <i className="fa fa-bullhorn nav-icon"></i>
                <p>Advertisement</p>
                <i className="fas fa-angle-left right"></i>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/advertisements" className="nav-link">
                    <i className="fa fa-list nav-icon"></i>
                    <p>All</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/adClasses" className="nav-link">
                    <i className="fa fa-file nav-icon"></i>
                    <p>Ad Classes</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/advertisementTypes" className="nav-link">
                    <i className="fa fa-shapes nav-icon"></i>
                    <p>Ad Type</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/adPackages" className="nav-link">
                    <i className="fa fa-box nav-icon"></i>
                    <p>Ad Packages</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/queries" className="nav-link">
                <i className="nav-icon fa fa-question"></i>
                <p>Queries</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/activities" className="nav-link">
                <i className="nav-icon fa fa-question"></i>
                <p>Activities</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/categories" className="nav-link">
                <i className="nav-icon fa fa-cubes"></i>
                <p>Categories</p>
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link parent-link">
                <i className="fa fa-map nav-icon"></i>
                <p>Location</p>
                <i className="fas fa-angle-left right"></i>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/location/countries" className="nav-link">
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>Countries</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/location/states" className="nav-link">
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>States</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/location/cities" className="nav-link">
                    <i className="far fa-clipboard nav-icon"></i>
                    <p>Cities</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/users" className="nav-link">
                <i className="nav-icon fa fa-users"></i>
                <p>Users</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
