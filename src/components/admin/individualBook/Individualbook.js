import React, { Component, useState, useEffect } from "react";
import firebase from "firebase/app";
import Popup from "reactjs-popup";
import { fire } from "../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Imagegrid from "../books/Imagegrid";
import "./individualbook-styles.css";
import { store } from "react-notifications-component";
import emailjs from "emailjs-com";

const db = fire.firestore();

const IndividualBook = ({ setProfileID, singleDoc }) => {
  const book = JSON.parse(localStorage.getItem("book"));
  // console.log(book);
  ///console.log(book.isbn);

  const [owners, setOwners] = useState(null);
  const [duration, setDuration] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const currentUserID = fire.auth().currentUser.uid;
  const [status, setStatus] = useState(null);
  const [toggle, setToggle] = useState(false);
  let requesterName;
  console.log(book.status, "Hi");
  useEffect(() => {
    // $(document).ready(function () {
    $("#submit-book").on("click", function () {
      $(".fade").prop("display", "none");
    });
    //});

    console.log("popup");
  });

  useEffect(() => {
    db.collection("books")
      .doc(book.isbn)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setStatus(doc.data().status);
        }
      });

    db.collection("vendorBooks")
      .doc(book.isbn)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setStatus(doc.data().status);
        }
      });
  }, [toggle]);

  function handleEnable() {
    db.collection("books")
      .doc(book.isbn)
      .update({
        status: "active",
      })
      .then(() => {
        setToggle(!toggle);
      });

    db.collection("vendorBooks")
      .doc(book.isbn)
      .update({
        status: "active",
      })
      .then(() => {
        setToggle(!toggle);
      });

    store.addNotification({
      title: "Success",
      message: "Book Enabled",
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
  }

  function handleDisable() {
    db.collection("books")
      .doc(book.isbn)
      .update({
        status: "inactive",
      })
      .then(() => {
        setToggle(!toggle);
      });

    db.collection("vendorBooks")
      .doc(book.isbn)
      .update({
        status: "inactive",
      })
      .then(() => {
        setToggle(!toggle);
      });

    store.addNotification({
      title: "Success",
      message: "Book Disabled",
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
  }

  console.log(owners);

  //console.log("indi book");

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
          <span className="book-label">STATUS:</span>
          <span className="book-value">
            {" "}
            {status == "active" ? "Active" : "Inactive"}
          </span>
          <br></br>
          {status === "active" ? (
            <button onClick={handleDisable} class="btn btn-danger">
              Disable
            </button>
          ) : (
            ""
          )}
          {status === "inactive" ? (
            <button onClick={handleEnable} class="btn btn-primary">
              Enable
            </button>
          ) : (
            ""
          )}
          {/* </div> */}
        </div>
      </div>
      <br></br>
      {/* <div className="grid-container-table"> */}
      {/* <div className="col xyz"> */}
      {/* </div> */}
      {/* </div> */}
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

export default IndividualBook;
