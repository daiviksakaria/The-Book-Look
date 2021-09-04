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

const db = fire.firestore();

const IndividualBookSold = ({ setProfileID, singleDoc }) => {
  const book = JSON.parse(localStorage.getItem("vendorBook"));
  const userID = fire.auth().currentUser.uid;
  const [users, setUsers] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    let container = [];
    db.collection("vendorTransactions")
      .where("ISBN", "==", book.isbn)
      .where("requesteeID", "==", userID)
      .where("bookDuration", "==", null)
      .where("status", "==", "accepted")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setDelivery(data.delivery);
          setPrice(data.bookPrice);
          container.push({
            requesteeID: data.requesteeID,
            requesterID: data.requesterID,
            isbn: data.ISBN,
            requesteeName: data.requesteeName,
            requesterName: data.requesterName,
            copies: data.bookQuantity,
            price: data.bookPrice,
            requestDate: data.requestDate,
            dueDate: data.dueDate,
            action: data.action,
            delivery: data.delivery,
          });
        });
        setUsers(container);
      });
  }, []);

  //console.log(users, val);

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
          <span className="book-label">PRICE:</span>
          <span className="book-value"> {price}</span>
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
              <th scope="col">Buyer</th>
              <th scope="col">Copies</th>
              <th scope="col">Price</th>
              <th scope="col">Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {users
              ? users.map((user, ind) => {
                  //console.log(typeof owner.uid);
                  return (
                    <tr>
                      <td>{ind + 1}</td>
                      <td
                        onClick={() => {
                          setProfileID(user.requesterID);
                        }}
                      >
                        <Link to="/homepage/profile">{user.requesterName}</Link>
                      </td>
                      <td>{user.copies}</td>
                      <td>{user.price}</td>
                      <td>{user.requestDate}</td>
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

export default IndividualBookSold;
