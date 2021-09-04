import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import "./myRequests.css";
const db = fire.firestore();

const MyRequests = () => {
  const [requests, setRequests] = useState(null);
  const [vendorRequests, setVendorRequests] = useState(null);
  const userID = fire.auth().currentUser.uid;

  useEffect(() => {
    let requestCon = [];
    let vendorRequestCon = [];
    db.collection("transactions")
      .where("requesterID", "==", userID)
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          requestCon.push({ ...doc.data() });
        });
        setRequests(requestCon);
      });

    db.collection("vendorTransactions")
      .where("requesterID", "==", userID)
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          vendorRequestCon.push({ ...doc.data() });
        });
        setVendorRequests(vendorRequestCon);
      });
  }, []);

  console.log(requests);

  return (
    <div className="ml-2 table-responsive grid-container-table">
      {requests !== null && requests.length > 0 ? (
        <div>
          <div className="heading">To: Users</div>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Book Title</th>
                <th scope="col">Book Owner</th>
                <th scope="col">Price</th>
                <th scope="col">Time Duration</th>
                <th scope="col">Copies</th>
                <th scope="col">Date of Request</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests
                ? requests.map((request, ind) => {
                    return (
                      <tr>
                        <td>{ind + 1}</td>
                        <td>{request.title}</td>
                        <td>{request.requesteeName}</td>
                        <td>{request.bookPrice ? request.bookPrice : "NA"}</td>
                        <td>
                          {request.bookDuration ? request.bookDuration : "NA"}
                        </td>
                        <td>{request.bookQuantity}</td>
                        <td>{request.requestDate}</td>
                        <td>
                          <span
                            className={`${
                              request.status == "pending"
                                ? "badge badge-info"
                                : ""
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
                  })
                : ""}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-request">No user request found</div>
      )}

      {vendorRequests !== null && vendorRequests.length > 0 ? (
        <div>
          <div className="heading">To: Vendors</div>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Book Title</th>
                <th scope="col">Seller</th>
                <th scope="col">Price</th>
                <th scope="col">Rent</th>
                <th scope="col">Time Duration</th>
                <th scope="col">Copies</th>
                <th scope="col">Date of Request</th>
                <th scope="col">Type of Request</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendorRequests
                ? vendorRequests.map((vendorRequest, ind) => {
                    return (
                      <tr>
                        <td>{ind + 1}</td>
                        <td>{vendorRequest.title}</td>
                        <td>{vendorRequest.requesteeShopname}</td>
                        <td>{vendorRequest.bookPrice}</td>
                        <td>
                          {vendorRequest.bookRent
                            ? vendorRequest.bookRent
                            : "NA"}
                        </td>
                        <td>
                          {vendorRequest.bookDuration
                            ? vendorRequest.bookDuration
                            : "NA"}
                        </td>
                        <td>{vendorRequest.bookQuantity}</td>
                        <td>{vendorRequest.requestDate}</td>
                        <td>
                          {vendorRequest.bookDuration
                            ? "Rent the book"
                            : "Buy the book"}
                        </td>
                        <td>
                          <span
                            className={`${
                              vendorRequest.status == "pending"
                                ? "badge badge-info"
                                : ""
                            } ${
                              vendorRequest.status == "accepted"
                                ? "badge badge-primary"
                                : ""
                            } ${
                              vendorRequest.status == "rejected"
                                ? "badge badge-danger"
                                : ""
                            } ${
                              vendorRequest.status == "completed"
                                ? "badge badge-warning"
                                : ""
                            }`}
                          >
                            {vendorRequest.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-request">No vendor request found</div>
      )}
    </div>
  );
};

export default MyRequests;
