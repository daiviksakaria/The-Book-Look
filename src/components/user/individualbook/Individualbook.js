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
import Imagegrid from "../addbook/Imagegrid";
import Modal from "../addbook/Modal";
import useFirestore from "../../../hooks/useFirestore";
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
  let requesterName;

  db.collection("users")
    .doc(currentUserID)
    .get()
    .then((doc) => {
      requesterName = doc.data().name;
    });

  useEffect(() => {
    // $(document).ready(function () {
    $("#submit-book").on("click", function () {
      $(".fade").prop("display", "none");
    });
    //});

    console.log("popup");
  });

  useEffect(() => {
    let container = [];

    const data = db
      .collection("books")
      .doc(book.isbn)
      .collection("owners")
      .get()
      .then((docs) => {
        docs.forEach((owner) => {
          container.push({ ...owner.data(), uid: owner.id });
          //console.log(owner.data());
        });
        setOwners(container);
      });
  }, []);

  function handleRequest(
    e,
    requesterID,
    requesteeID,
    requesteeName,
    requesterName,
    ISBN,
    title,
    bookPrice,
    bookDuration,
    maxQuantity
  ) {
    e.preventDefault();
    if (parseInt(quantity) > parseInt(maxQuantity)) {
      setError("You exceeded the number of copies available. Please try again");
      return;
    }
    if (bookPrice == null || bookPrice == "") {
      if (bookDuration == "") {
        setError("Please enter the time duration");
        return;
      }
    } else {
      if (quantity == "") {
        setError("Please enter the number of copies you want");
        return;
      }
    }

    setError(null);
    const date = new Date();
    const milliseconds = Date.now() + bookDuration * 86400000;
    const requestDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const dDate = new Date(milliseconds);
    const dueDate = `${dDate.getDate()}/${
      dDate.getMonth() + 1
    }/${dDate.getFullYear()}`;
    db.collection("transactions")
      .add({
        requesterID,
        requesteeID,
        requesteeName,
        requesterName,
        ISBN,
        title,
        bookPrice,
        bookQuantity: parseInt(quantity),
        bookDuration,
        requestDate,
        dueDate,
        status: "pending",
        authors: book.authors,
        categories: book.categories,
        url: book.url,
        action: "Initiate return request",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        setQuantity(1);
        setDuration(null);
        store.addNotification({
          title: "Request Submitted",
          message: "Your request has been submitted",
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
      })
      .catch((error) => {});
    db.collection("users")
      .doc(requesteeID)
      .get()
      .then((doc) => {
        const email = doc.data().email;
        const templateParams = {
          from_name: "The Book Look",
          to_email: email,
          to_name: requesteeName,
          message: `${requesterName} has requested ${quantity} copies of ${title}`,
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
              <th scope="col">Owner</th>
              <th scope="col">Copies</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {owners
              ? owners.map((owner, ind) => {
                  const val = "a" + owner.uid;
                  //console.log(typeof owner.uid);
                  return (
                    <tr>
                      <td>{ind + 1}</td>
                      <td
                        onClick={() => {
                          setProfileID(owner.uid);
                          localStorage.setItem(
                            "profileID",
                            JSON.stringify(owner.uid)
                          );
                        }}
                      >
                        <Link to="/homepage/profile">{owner.name}</Link>
                      </td>
                      <td>{owner.copies}</td>
                      <td>
                        {owner.price == "" || owner.price == null
                          ? "NA"
                          : owner.price}
                      </td>
                      <td>
                        {/* {currentUserID != owner.uid && owner.copies != 0 ? ( */}
                        <div className="container">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target={"#" + val}
                            disabled={
                              currentUserID != owner.uid && owner.copies != 0
                                ? ""
                                : "true"
                            }
                          >
                            Request Book
                          </button>
                          <div
                            class="modal fade" //show removed
                            id={val}
                            tabindex="-1"
                            aria-labelledby="Exmp"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <div className="book-value-title">
                                    Request Book
                                  </div>
                                  <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="container">
                                  <div className="modal-body">
                                    <div className="row">
                                      <div className="col-auto center">
                                        <img
                                          src={book.url}
                                          className="img-indi rounded"
                                          alt={book.title}
                                        />
                                      </div>
                                      <div className="col-6">
                                        <div className="d-flex flex-column justify-content-md-center align-items-md-center">
                                          <div className="request-book-title p-2 bd-highlight">
                                            {book.title}
                                          </div>
                                          <div className="p-2 bd-highlight">
                                            <span className="request-label">
                                              Owner:
                                            </span>
                                            <span className="request-value">
                                              {owner.name}
                                            </span>
                                            <div>
                                              <span className="request-label">
                                                Price (in Rs):
                                              </span>
                                              <span className="request-value">
                                                {owner.price === null ? (
                                                  "NA"
                                                ) : (
                                                  <span>{owner.price}</span>
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br></br>
                                    <form>
                                      {owner.price === null ? (
                                        <div className="form-group">
                                          <label
                                            for="duration"
                                            className="request-label"
                                          >
                                            Time duration (in days)
                                          </label>
                                          <input
                                            type="text"
                                            name="duration"
                                            id="duration"
                                            value={duration}
                                            onChange={(e) => {
                                              setDuration(e.target.value);
                                            }}
                                          />
                                        </div>
                                      ) : (
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            name="quantity"
                                            id="quantity"
                                            placeholder="Quantity"
                                            value={quantity}
                                            onChange={(e) => {
                                              setQuantity(e.target.value);
                                            }}
                                          />
                                        </div>
                                      )}
                                      {error ? (
                                        <div className="alert alert-warning">
                                          {error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <button
                                        type="submit"
                                        class="btn btn-secondary"
                                        id="submit-book"
                                        onClick={(e) => {
                                          handleRequest(
                                            e,
                                            currentUserID,
                                            owner.uid,
                                            owner.name,
                                            requesterName,
                                            book.isbn,
                                            book.title,
                                            owner.price,
                                            duration,
                                            owner.copies
                                          );
                                        }}
                                      >
                                        Submit
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
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
