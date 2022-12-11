import React, { Fragment, useEffect, useState } from "react";
import { updateList } from "../../../../actions/listActions";
import { useDispatch, useSelector } from "react-redux";
import FinanceModal from "./FinanceModal";

const Finance = ({ list_id }) => {
  const dispatch = useDispatch();
  const [finance, setFinance] = useState();
  const { error, loading, list } = useSelector((state) => {
    return state.listDetails;
  });
  useEffect(() => {
    if (list) setFinance(list.finance);
  }, [list]);
  const onDeleteFinance = (row) => {
    const new_finance = finance.filter((i) => i._id !== row._id);
    //setFinance(new_finance);
    const listData = { finance: new_finance };
    dispatch(updateList(list_id, listData));
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <br />
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3>Finance</h3>
            </div>
            <div className="card-body">
              <div className="row">
                {finance && finance.length < 3 ? (
                  <div className="col-12">
                    <div className="container">
                      <FinanceModal data={finance} list_id={list_id} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Revenue</th>
                        <th>Profit</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finance && finance.length > 0 ? (
                        <Fragment>
                          {finance.map((row) => (
                            <tr key={row._id}>
                              <td>{row.year}</td>
                              <td>{row.revenue}</td>
                              <td>{row.profit}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    alert("Test");
                                    return false;
                                  }}
                                  className="btn btn-default btn-trash"
                                  onClick={() => onDeleteFinance(row)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ) : (
                        <Fragment>
                          <tr>
                            <td colSpan="3" align="center">
                              No Data
                            </td>
                          </tr>
                        </Fragment>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Finance;
