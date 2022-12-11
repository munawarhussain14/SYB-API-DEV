import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { DateFormat } from "../../../layout/common/date";
var parse = require("html-react-parser");

const Accordian = ({ issues }) => {
  useEffect(() => {
    console.log(issues);
  }, []);

  const getIssue = (listIssues) => {
    if (listIssues) {
      let emailIssues = JSON.parse(listIssues);
      let message = "<div style='text-align:left'>";
      for (var key in emailIssues) {
        message += `<h5>${emailIssues[key].name}</h5>\n`;
        if (emailIssues[key].issues && emailIssues[key].issues.length > 0) {
          message += `<b>Issues</b>\n`;
          message += `<ul>`;
          emailIssues[key].issues.map((e) => {
            message += `<li>${e}</li>`;
          });
          message += `</ul>`;
        }
        if (emailIssues[key].comment) {
          message += `<b>Special Comment</b>\n`;
          message += `<p>${emailIssues[key].comment}</p>`;
        }
        message += "</hr>";
        return parse(message);
      }
    }
    return "No Field related Issue";
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4>Issues History</h4>
      </div>
      <div className="card-body">
        <Accordion defaultActiveKey="0">
          {issues
            ? issues.map((e) => (
                <Accordion.Item eventKey={e._id}>
                  <Accordion.Header>
                    Reported at {DateFormat(e.createdAt, false)}
                  </Accordion.Header>
                  <Accordion.Body>{getIssue(e.issuesList)}</Accordion.Body>
                </Accordion.Item>
              ))
            : ""}
        </Accordion>
      </div>
    </div>
  );
};

export default Accordian;
