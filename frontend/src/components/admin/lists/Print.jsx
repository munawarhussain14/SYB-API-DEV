import React, { Fragment } from "react";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";
import { DateFormat } from "../../layout/common/date";

const Print = React.forwardRef(({ list }, ref) => {
  return (
    <Fragment>
      <div className="container-fluid">
        <MetaData title={"Business Detail"} />

        <div className="row">
          <div className="col-12 col-md-12">
            {!list ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="card">
                  <div className="card-header">
                    <h4>Business Detail</h4>
                  </div>
                  <div className="card-body">
                    {list ? (
                      <div
                        ref={ref}
                        className="row list-print-area"
                        style={{ margin: "20px", marginTop: "80px" }}
                      >
                        <div className="col-12">
                          <table width="100%" style={{ fontSize: "20px" }}>
                            <tr>
                              <td
                                width="10%"
                                valign="top"
                                style={{
                                  color: "rgb(255, 85, 4)",
                                }}
                              >
                                Prepared By:
                              </td>
                              <td valign="top">
                                Jon Zonio<br></br>Sell Your Business (AEONVIDA)
                              </td>
                              <td align="right" valign="top">
                                <span style={{ color: "rgb(255, 85, 4)" }}>
                                  Date:
                                </span>
                                {"  "}
                                {new Date().toLocaleString() + ""}
                              </td>
                            </tr>
                          </table>
                          <br></br>
                          <br></br>
                        </div>
                        <div className="col-12">
                          <h4
                            className="text-center"
                            style={{
                              background: "rgb(255, 85, 4)",
                              color: "white",
                              padding: "10px",
                            }}
                          >
                            {list.title} For Sale
                          </h4>
                        </div>
                        <div className="col-12">
                          <table border="0" width="100%">
                            <tr>
                              <td
                                width="50%"
                                align="top"
                                style={{
                                  background: "#ff5504",
                                }}
                              >
                                {list.images && list.images.length > 0 ? (
                                  <img src={list.images[0].url} width="100%" />
                                ) : (
                                  ""
                                )}
                                <div
                                  style={{
                                    padding: "10px",
                                    background: "#ff5504",
                                    color: "white",
                                  }}
                                >
                                  <h4>About Business</h4>
                                  <p>{list.business_overview}</p>
                                  <h4>Reason for Sale</h4>
                                  <p>{list.reason_for_sale}</p>
                                </div>
                              </td>
                              <td
                                align="top"
                                style={{ verticalAlign: "middle" }}
                              >
                                <div style={{ padding: "10px" }}>
                                  <table width="100%">
                                    <tr>
                                      <th>Listing ID</th>
                                      <td>{list.list_id}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>
                                        <hr></hr>
                                      </td>
                                    </tr>
                                    {list.business_establish_date ? (
                                      <tr>
                                        <th>Business Estab</th>
                                        <td>
                                          {DateFormat(
                                            list.business_establish_date
                                          )}
                                        </td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {list.business_type ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>License Type</th>
                                          <td>{list.business_type}</td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}
                                    {list.business_activities.length > 0 ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Activity</th>
                                          <td>
                                            {list.business_activities
                                              ? list.business_activities.map(
                                                  (e) => e.name + ","
                                                )
                                              : "None"}
                                          </td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}
                                    {list.license_expiry_date ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>License Expiry</th>
                                          <td>
                                            {DateFormat(
                                              list.license_expiry_date
                                            )}
                                          </td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}
                                    {list.size_of_premises ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Size of Premises</th>
                                          <td>{list.size_of_premises}</td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}

                                    {list.annual_lease ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Annual Lease</th>
                                          <td>{list.annual_lease}</td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}
                                    {list.lease_expiry_date ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Lease Expiry</th>
                                          <td>
                                            {DateFormat(list.lease_expiry_date)}
                                          </td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}

                                    {list.company_price || list.asking_price ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>

                                        <tr>
                                          <th>Negotiating Price</th>
                                          <td>
                                            {list.company_asking_price
                                              ? list.company_asking_price
                                              : list.asking_price || "None"}
                                          </td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}

                                    {list.company_price ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>
                                            Company Asking Price (Topup -
                                            Frontend)
                                          </th>
                                          <td>{list.company_price}</td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}

                                    {list.city ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>City</th>
                                          <td>
                                            {list.city
                                              ? list.city.name
                                              : "None"}
                                          </td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}
                                    {list.state ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>State</th>
                                          <td>
                                            {list.state
                                              ? list.state.name
                                              : "None"}
                                          </td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}
                                    {list.country ? (
                                      <Fragment>
                                        <tr>
                                          <td colSpan={2}>
                                            <hr></hr>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Country</th>
                                          <td>
                                            {list.country
                                              ? list.country.name
                                              : "None"}
                                          </td>
                                        </tr>
                                      </Fragment>
                                    ) : (
                                      ""
                                    )}

                                    <tr>
                                      <td colSpan={2}>
                                        <hr></hr>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="col-12 text-center">No List Detail</div>
                    )}
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default Print;
