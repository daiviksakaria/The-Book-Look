import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import "./completedRequests.css";
const db = fire.firestore();

const CompletedRequests = () => {
  const [requests, setRequests] = useState(null);
  const userID = fire.auth().currentUser.uid;

  useEffect(() => {
    let requestCon = [];
    db.collection("transactions")
      .where("requesteeID", "==", userID)
      .where("status", "!=", "pending")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          requestCon.push({ ...doc.data(), id: doc.id });
        });
        setRequests(requestCon);
      });
  }, []);

  return (
    <div className="ml-2 table-responsive grid-container-table">
      {requests !== null && requests.length > 0 ? (
        <div>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Book Title</th>
                <th scope="col">Requester</th>
                <th scope="col">Price</th>
                <th scope="col">Time Duration</th>
                <th scope="col">Copies</th>
                <th scope="col">Date of Request</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, ind) => {
                return (
                  <tr>
                    <td>{ind + 1}</td>
                    <td>{request.title}</td>
                    <td>{request.requesterName}</td>
                    <td>{request.bookPrice ? request.bookPrice : "NA"}</td>
                    <td>
                      {request.bookDuration ? request.bookDuration : "NA"}
                    </td>
                    <td>{request.bookQuantity}</td>
                    <td>{request.requestDate}</td>
                    <td>
                      <span
                        className={`${
                          request.status == "pending" ? "badge badge-info" : ""
                        } ${
                          request.status == "accepted"
                            ? "badge badge-primary"
                            : ""
                        } ${
                          request.status == "rejected"
                            ? "badge badge-danger"
                            : ""
                        } ${
                          request.status == "completed"
                            ? "badge badge-warning"
                            : ""
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-request">No request found</div>
      )}
    </div>
  );
};

export default CompletedRequests;
