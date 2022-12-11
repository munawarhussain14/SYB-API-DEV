import React, { useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, clearErrors } from "../../../actions/userActions";

const Users = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.users);
  const { isDeleted } = useSelector((state) => state.lists);

  useEffect(() => {
    const status = params.status;
    dispatch(getUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User deleted successfully");
      navigate("/admin/users");
      //dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate, params]);

  const deleteListHandler = (id) => {
    //dispatch(deleteOrder(id));
  };

  const setLists = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: `${user.email}`,
        actions: (
          <Fragment>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            {/* <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteListHandler(list._id)}
            >
              <i className="fa fa-trash"></i>
            </button> */}
          </Fragment>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setLists()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
