import React, { Fragment, useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getList, updateList } from "../../../actions/listActions";
import { sendMail } from "../../../actions/mailActions";
import Loader from "../../layout/Loader";
import { useAlert } from "react-alert";
import Print from "./Print";

const Proposal = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [issuesList, setIssuesList] = useState(null);
  const [modelIssues, setModelIssues] = useState(null);
  const [emailIssues, setEmailIssues] = useState(null);

  const { isUpdated, loading, list, error } = useSelector((state) => {
    return state.listDetails;
  });

  const {
    loading: mailLoading,
    data,
    error: mailError,
  } = useSelector((state) => {
    return state.sendEmail;
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getList(params.id));
  }, [dispatch, alert, error, params]);

  const fetchIssues = async () => {
    await fetch("dist/data/issues.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setIssuesList(data);
      });
  };

  const [show, setShow] = useState(false);
  const [showEmail, setshowEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    if (mailError) {
      return alert.error(mailError);
    }
    if (data && data.message) {
      alert.success(data.message);
      setshowEmail(false);
    }
  }, [mailError, data]);

  const sendEmail = () => {
    if (!mailLoading) {
      const data = {
        user_id: list.user,
        list_id: list._id,
        message: emailIssues,
      };
      dispatch(sendMail(data));
    }
  };

  const handleEmailShow = async (field, name) => {
    if (!emailIssues) {
      return alert.info("No Issue");
    }

    let message = "<div style='text-align:left'>";
    for (var key in emailIssues) {
      message += `<h2>${emailIssues[key].name}</h2>\n`;
      if (emailIssues[key].issues && emailIssues[key].issues.length > 0) {
        message += `<h4>Issues</h4>\n`;
        message += `<ul>`;
        emailIssues[key].issues.map((e) => {
          message += `<li>${e}</li>`;
        });
        message += `</ul>`;
      }
      if (emailIssues[key].comment) {
        message += `<h4>Special Comment</h4>\n`;
        message += `<p>${emailIssues[key].comment}</p>`;
      }
      message += "</hr>";
    }
    setEmailMessage(message);
    setshowEmail(true);
  };

  const handleClose = () => {
    setShow(false);
    setshowEmail(false);
  };

  const handleShow = async (field, name) => {
    if (!issuesList) {
      await fetchIssues();
    }

    if (issuesList[field].issues)
      setModelIssues({ name, field, issues: issuesList[field].issues });
    setShow(true);
  };

  const handleApproved = (status) => {
    dispatch(updateList(list._id, { status: status }));
  };

  const handleBlock = (status) => {
    dispatch(updateList(list._id, { sold: status }));
  };

  const handleSold = (status) => {
    dispatch(updateList(list._id, { block: status }));
  };

  const componentRef = useRef();

  return (
    <Fragment>
      <div className="container-fluid">
        <MetaData title={"Business Detail"} />

        <div className="row">
          <div className="col-12 col-md-12">
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="container">
                  <ReactToPrint
                    trigger={() => (
                      <button className="btn btn-primary">
                        Save PDF/Print
                      </button>
                    )}
                    content={() => componentRef.current}
                  />{" "}
                  <Link to={`/list/${list._id}`} className="btn btn-success">
                    Edit
                  </Link>
                </div>
                <br></br>
                {list ? (
                  <Print list={list} ref={componentRef} />
                ) : (
                  <div className="col-12 text-center">No List Detail</div>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Proposal;
