import React, { Component, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { fire } from "../../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Imagegrid from "../../addbook/Imagegrid";
import Modal from "../../addbook/Modal";
import useFirestore from "../../../../hooks/useFirestore";
import { store } from "react-notifications-component";
import "./individualBookBorrowed.css";
import emailjs from "emailjs-com";

const db = fire.firestore();

const IndividualBookBorrowed = ({ setProfileID, singleDoc }) => {
  const book = JSON.parse(localStorage.getItem("book"));
  const userID = fire.auth().currentUser.uid;
  const [lenders, setLenders] = useState(null);
  const [vendors, setVendors] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let container = [];
    db.collection("transactions")
      .where("ISBN", "==", book.isbn)
      .where("requesterID", "==", userID)
      .where("bookDuration", "!=", null)
      .where("status", "==", "accepted")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          container.push({
            id: doc.id,
            name: data.requesteeName,
            uid: data.requesteeID,
            copies: data.bookQuantity,
            requestDate: data.requestDate,
            dueDate: data.dueDate,
            action: data.action,
          });
        });
        setLenders(container);
      });

    let vendorContainer = [];
    db.collection("vendorTransactions")
      .where("ISBN", "==", book.isbn)
      .where("requesterID", "==", userID)
      .where("bookDuration", "!=", null)
      .where("status", "==", "accepted")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          vendorContainer.push({
            id: doc.id,
            name: data.requesteeName,
            shopname: data.requesteeShopname,
            uid: data.requesteeID,
            copies: data.bookQuantity,
            rent: data.bookRent,
            requestDate: data.requestDate,
            dueDate: data.dueDate,
            action: data.action,
            delivery: data.delivery,
          });
        });
        setVendors(vendorContainer);
      });
  }, [toggle]);

  function handleReturn(id, uid) {
    db.collection("transactions")
      .doc(id)
      .update({ action: "request initiated" })
      .then(() => {
        store.addNotification({
          title: "Success",
          message: "Return request sent",
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
        setToggle(!toggle);

        db.collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            const email = doc.data().email;
            const name = doc.data().name;

            db.collection("users")
              .doc(userID)
              .get()
              .then((val) => {
                const requesterName = val.data().name;
                const templateParams = {
                  from_name: "The Book Look",
                  to_email: email,
                  to_name: name,
                  message: `${requesterName} has initiated book return for the book ${book.title}`,
                };
                emailjs
                  .send(
                    "service_929agex",
                    "template_pwu611b",
                    templateParams,
                    "user_mtMlvbybhZtbkIc8a2LBs"
                  )
                  .then(
                    function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                    },
                    function (error) {
                      console.log("FAILED...", error);
                    }
                  );
              });
          });
      });
  }

  function handleVendorReturn(id, uid) {
    db.collection("vendorTransactions")
      .doc(id)
      .update({ action: "request initiated" })
      .then(() => {
        store.addNotification({
          title: "Success",
          message: "Return request sent",
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
        setToggle(!toggle);

        db.collection("vendors")
          .doc(uid)
          .get()
          .then((doc) => {
            const email = doc.data().email;
            const name = doc.data().name;

            db.collection("users")
              .doc(userID)
              .get()
              .then((val) => {
                const requesterName = val.data().name;
                const templateParams = {
                  from_name: "The Book Look",
                  to_email: email,
                  to_name: name,
                  message: `${requesterName} has initiated book return for the book ${book.title}`,
                };
                emailjs
                  .send(
                    "service_929agex",
                    "template_pwu611b",
                    templateParams,
                    "user_mtMlvbybhZtbkIc8a2LBs"
                  )
                  .then(
                    function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                    },
                    function (error) {
                      console.log("FAILED...", error);
                    }
                  );
              });
          });
      });
  }
  return (
    <div>
      <div className="grid-container-indibook">
        <div className="grid-item">
          <img
            src={book.url}
            className="ml-2 img-indi rounded"
            alt={book.title}
          />
        </div>
        <div className="grid-item align-self-center book-details">
          {/* <div className="book-details mx-auto"> */}
          <span className="book-value-title">{book.title}</span> <br></br>
          <span className="book-label">AUTHOR:</span>
          <span className="book-value"> {book.authors}</span>
          <br></br>
          <span className="book-label">CATEGORY:</span>
          <span className="book-value"> {book.categories}</span>
        </div>
      </div>
      <br></br>
      <br></br>
      {lenders != null && lenders.length > 0 ? (
        <div className="ml-2 table-responsive grid-container-table">
          <div className="borrowed-heading">Users:</div>
          <br></br>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Lender</th>
                <th scope="col">Copies</th>
                <th scope="col">Date of Request</th>
                <th scope="col">Due Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {lenders.map((lender, ind) => {
                const val = "a" + lender.uid;
                //console.log(typeof owner.uid);
                return (
                  <tr>
                    <td>{ind + 1}</td>
                    <td
                      onClick={() => {
                        setProfileID(lender.uid);
                      }}
                    >
                      <Link to="/homepage/profile">{lender.name}</Link>
                    </td>
                    <td>{lender.copies}</td>
                    <td>{lender.requestDate}</td>
                    <td>{lender.dueDate}</td>
                    <td>
                      {lender.action == "Initiate return request" ? (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleReturn(lender.id, lender.uid);
                          }}
                        >
                          {lender.action}
                        </button>
                      ) : (
                        <span className="badge badge-info">
                          {lender.action}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}

      {vendors != null && vendors.length > 0 ? (
        <div className="ml-2 table-responsive grid-container-table">
          <div className="borrowed-heading">Vendors:</div>
          <br></br>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Seller</th>
                <th scope="col">Copies</th>
                <th scope="col">Rent</th>
                <th scope="col">Date of Request</th>
                <th scope="col">Due Date</th>
                <th scope="col">Delivery</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, ind) => {
                const val = "a" + vendor.uid;
                //console.log(typeof owner.uid);
                return (
                  <tr>
                    <td>{ind + 1}</td>
                    <td
                      onClick={() => {
                        setProfileID(vendor.uid);
                      }}
                    >
                      <Link to="/homepage/profile">{vendor.shopname}</Link>
                    </td>
                    <td>{vendor.copies}</td>
                    <td>{vendor.rent}</td>
                    <td>{vendor.requestDate}</td>
                    <td>{vendor.dueDate}</td>
                    <td>{vendor.delivery ? "Available" : "Not available"}</td>
                    <td>
                      {vendor.action == "Initiate return request" ? (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleVendorReturn(vendor.id, vendor.uid);
                          }}
                        >
                          {vendor.action}
                        </button>
                      ) : (
                        <span className="badge badge-info">
                          {vendor.action}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>

    /* <Popup
          trigger={
            <button type="submit" class="btn btn-primary">
              Request book
            </button>
          }
          position="right center"
        >
          <div>
            <img src={book.url} />
            <div>{book.title}</div>
            <div>Owner : {owner.name}</div>
            <form>
              {owner.price === "" ? (
                <div>
                  <label for="duration">Time duration (in days)</label>
                  <input type="text" name="duration" id="duration" />
                </div>
              ) : (
                <div>
                  price:{owner.price}
                  <input type="text" name="quantity" id="quantity" placeholder="Quantity" />
                </div>
              )}
              <button type="submit" class="btn btn-secondary">
                Submit
              </button>
            </form>
          </div>
        </Popup> */
  );
};

export default IndividualBookBorrowed;
