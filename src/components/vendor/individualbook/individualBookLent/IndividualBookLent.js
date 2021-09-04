import React, { Component, useState, useEffect } from "react";
import firebase from "firebase/app";
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

const db = fire.firestore();

const IndividualBookLent = ({ setProfileID, singleDoc }) => {
  const book = JSON.parse(localStorage.getItem("vendorBook"));
  const userID = fire.auth().currentUser.uid;
  const [borrowers, setBorrowers] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [rent, setRent] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let container = [];
    db.collection("vendorTransactions")
      .where("ISBN", "==", book.isbn)
      .where("requesteeID", "==", userID)
      .where("bookDuration", "!=", null)
      .where("status", "==", "accepted")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setDelivery(data.delivery);
          setRent(data.bookRent);
          container.push({
            id: doc.id,
            isbn: data.ISBN,
            name: data.requesterName,
            uid: data.requesterID,
            copies: data.bookQuantity,
            rent: data.bookRent,
            requestDate: data.requestDate,
            dueDate: data.dueDate,
            action: data.action,
            delivery: data.delivery,
          });
        });
        setBorrowers(container);
      });
  }, [toggle]);

  function handleBookReturn(id, isbn, quantity) {
    db.collection("vendorTransactions")
      .doc(id)
      .update({
        status: "completed",
        action: "return completed",
      })
      .then(() => {
        db.collection("vendorBooks")
          .doc(isbn)
          .collection("owners")
          .doc(userID)
          .update({
            copies: firebase.firestore.FieldValue.increment(quantity),
          })
          .then(() => {
            setToggle(!toggle);
          });
      });

    store.addNotification({
      title: "Success",
      message: "Book return complete",
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
          count: firebase.firestore.FieldValue.increment(-1),
        });
      }
    });

    let cc = db.collection("vendorBooks").doc(isbn);

    cc.get().then((doc) => {
      if (doc.exists) {
        cc.update({
          count: firebase.firestore.FieldValue.increment(-1),
        });
      }
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
          <br></br>
          <span className="book-label">RENT (Per Day):</span>
          <span className="book-value"> {rent}</span>
          <br></br>
          <span className="book-label">DELIVERY:</span>
          <span className="book-value">
            {" "}
            {delivery ? "Available" : "Not available"}
          </span>
          {/* </div> */}
        </div>
      </div>
      <br></br>
      {/* <div className="grid-container-table"> */}
      {/* <div className="col xyz"> */}
      <div className="ml-2 table-responsive grid-container-table">
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Customer</th>
              <th scope="col">Copies</th>
              <th scope="col">Request Date</th>
              <th scope="col">Due Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowers
              ? borrowers.map((borrower, ind) => {
                  const val = "a" + borrower.uid;
                  //console.log(typeof owner.uid);
                  return (
                    <tr>
                      <td>{ind + 1}</td>
                      <td
                        onClick={() => {
                          setProfileID(borrower.uid);
                        }}
                      >
                        <Link to="/homepage/profile">{borrower.name}</Link>
                      </td>
                      <td>{borrower.copies}</td>
                      <td>{borrower.requestDate}</td>
                      <td>{borrower.dueDate}</td>
                      <td>
                        {borrower.action == "request initiated" ? (
                          <button
                            onClick={() => {
                              handleBookReturn(
                                borrower.id,
                                borrower.isbn,
                                borrower.copies
                              );
                            }}
                            className="btn btn-primary"
                          >
                            Accept book return
                          </button>
                        ) : (
                          <span className="badge badge-info">lent</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
      <br></br>
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

export default IndividualBookLent;
