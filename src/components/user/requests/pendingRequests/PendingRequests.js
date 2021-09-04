import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../../firebase";
import firebase from "firebase/app";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { store } from "react-notifications-component";
import "./pendingRequests.css";
//import "animate.css/animate.min.css";

const db = fire.firestore();

const PendingRequests = () => {
  const [requests, setRequests] = useState(null);
  const [toggle, setToggle] = useState(false);
  const userID = fire.auth().currentUser.uid;

  useEffect(() => {
    let requestCon = [];
    db.collection("transactions")
      .where("requesteeID", "==", userID)
      .where("status", "==", "pending")
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          requestCon.push({ ...doc.data(), id: doc.id });
        });
        setRequests(requestCon);
      });
    console.log(toggle);
  }, [toggle]);

  function handleAccept(id, isbn, userUID, quantity) {
    quantity = parseInt(quantity);
    const docRef = db.doc(`/books/${isbn}/owners/${userUID}`);
    docRef.get().then((doc) => {
      if (doc.data().copies < quantity) {
        alert("You do not have enough copies to fulfill the request");
        return;
      } else {
        db.collection("transactions")
          .doc(id)
          .update({ status: "accepted" })
          .then((x) => {
            docRef.update({
              copies: firebase.firestore.FieldValue.increment(-quantity),
            });
            setToggle(!toggle);
          });
      }
    });
    store.addNotification({
      title: "Accepted",
      message: "You have accepted a request",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: false,
      },
    });
    let bb = db.collection("books").doc(isbn);

    bb.get().then((doc) => {
      if (doc.exists) {
        bb.update({
          count: firebase.firestore.FieldValue.increment(1),
        });
      }
    });

    let cc = db.collection("vendorBooks").doc(isbn);

    cc.get().then((doc) => {
      if (doc.exists) {
        cc.update({
          count: firebase.firestore.FieldValue.increment(1),
        });
      }
    });
  }

  function handleReject(id) {
    db.collection("transactions")
      .doc(id)
      .update({ status: "rejected" })
      .then((doc) => {
        setToggle(!toggle);
      });

    store.addNotification({
      title: "Rejected",
      message: "You have rejected a request",
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: false,
      },
    });
  }

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
                <th scope="col">Action</th>
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
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleAccept(
                            request.id,
                            request.ISBN,
                            userID,
                            request.bookQuantity
                          );
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          handleReject(request.id);
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-request">No pending requests</div>
      )}
    </div>
  );
};

export default PendingRequests;
