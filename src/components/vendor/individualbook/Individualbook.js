import React, { Component, useState, useEffect } from "react";
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
import Imagegrid from "../addbook/Imagegrid";
import Modal from "../addbook/Modal";
import useFirestore from "../../../hooks/useFirestore";
import "./individualbook-styles.css";

const db = fire.firestore();

const IndividualBook = ({ setProfileID, singleDoc }) => {
  const book = JSON.parse(localStorage.getItem("vendorBook"));
  // console.log(book);
  ///console.log(book.isbn);

  const currentUserID = fire.auth().currentUser.uid;
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    db.collection("vendorBooks")
      .doc(book.isbn)
      .collection("owners")
      .doc(currentUserID)
      .get()
      .then((doc) => {
        setOwner(doc.data());
      });
  }, []);

  console.log(owner);
  useEffect(() => {
    // $(document).ready(function () {
    $("#submit-book").on("click", function () {
      $(".fade").prop("display", "none");
    });
    //});

    console.log("popup");
  });

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
          {owner ? (
            <div>
              <span className="book-label">COPIES:</span>
              <span className="book-value"> {owner.copies}</span>
              <br></br>
              <span className="book-label">PRICE:</span>
              <span className="book-value"> {owner.price}</span>
              <br></br>
              <span className="book-label">RENT (Per Day):</span>
              <span className="book-value">
                {" "}
                {owner.rent != null && owner.rent != "" ? owner.rent : "NA"}
              </span>
              <br></br>
              <span className="book-label">DELIVERY:</span>
              <span className="book-value">
                {" "}
                {owner.delivery ? "Available" : "Not available"}
              </span>
            </div>
          ) : (
            ""
          )}
          {/* </div> */}
        </div>
      </div>
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
