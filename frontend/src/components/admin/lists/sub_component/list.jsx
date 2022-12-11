import React from "react";
import { Link, NavLink } from "react-router-dom";

const List = ({ list }) => {
  return (
    <div className="col-4" style={{ marginTop: "10px" }}>
      <div className="card">
        <div className="card-body">
          <div className="row" style={{ margin: "0 20px" }}>
            <div className="col-12">
              <b>Title</b>: <Link to={`/list/${list._id}`}>{list.title}</Link>
              <hr></hr>
              <b>Company Name</b>
              <br></br> {list.company_name}
              <hr></hr>
              <b>Business Name</b>
              <br></br> {list.business_name}
              <hr></hr>
              <i className="fa fa-eye"></i> {list.view || 0} |{" "}
              <Link to={`/list/${list._id}`}>
                <i className="fa fa-pencil"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
