import React, { Component, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { fire } from "../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Imagegrid from "../addbook/Imagegrid";
import Modal from "../addbook/Modal";
import useFirestore from "../../../hooks/useFirestore";
import "./individualbook-styles.css";

const db = fire.firestore();

function IndividualBook(singleDoc) {
  const book = JSON.parse(localStorage.getItem("book"));
  // console.log(book);
  ///console.log(book.isbn);

  const [owners, setOwners] = useState(null);

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

  console.log(owners);

  //console.log("indi book");

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm xyz cener">
          <img src={book.url} className="img-ndi rounded" alt={book.title} />
        </div>
        <div className="col-sm xyz algn-self-center book-detils">
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
      {/* <br></br> */}
      <div className="row">
        <div className="col xyz">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Copies</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {owners
                  ? owners.map((owner, ind) => {
                      const val = "a" + owner.uid;
                      return (
                        <tr>
                          <td>{ind + 1}</td>
                          <td>{owner.name}</td>
                          <td>{owner.copies}</td>
                          <td>{owner.price}</td>
                          <td>
                            <div className="container">
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target={"#" + val}
                              >
                                Request Book
                              </button>
                              <div
                                class="modal fade"
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
                                              />
                                            </div>
                                          ) : (
                                            <div className="form-group">
                                              <input
                                                type="text"
                                                name="quantity"
                                                id="quantity"
                                                placeholder="Quantity"
                                              />
                                            </div>
                                          )}
                                          <button
                                            type="submit"
                                            class="btn btn-secondary"
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
        </div>
      </div>

      {/*
        <Popup
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
        </Popup>
              */}

      {/* <div class="child-page-listing">
      <div class="grid-container">
        <div class="location-image">
          <img
            src="http://books.google.com/books/content?id=t1Mt9CUHyngC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            alt="san francisco"
          />
          <p>
            nskjgnsjkgnjskgajabahfbahbafjsbfh\sfbhjsbfgh\sbfhjsbfhjsbfgh\shjh
          </p>
        </div>

        <div class="location-image">
          <img
            src="http://books.google.com/books/content?id=kdhWswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            alt="san francisco"
          />
          <p>nskjgnsjkgnjskgajabahbfhjsbfhjsbfgh\shjh</p>
        </div>

        <div class="location-image">
          <img
            src="http://books.google.com/books/content?id=F_9SAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
            alt="san francisco"
          />
          <p>nskjgnsjkgnjskgajabahfbahfgh\shjh</p>
        </div>

        <div class="location-image">
          <img
            src="http://books.google.com/books/content?id=t1Mt9CUHyngC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            alt="san francisco"
          />
          <p>nskjgnsjkgnjskgaj</p>
        </div>

        <div class="location-image">
          <img
            src="http://books.google.com/books/content?id=t1Mt9CUHyngC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            alt="san francisco"
          />
          <p>hjh</p>
        </div>

        <div class="location-image">
          <img
            src="http://books.google.com/books/content?id=t1Mt9CUHyngC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            alt="san francisco"
          />
          <p>\shjhfsfnj</p>
        </div>

        <div class="location-image">
          <img
            src="http://books.google.com/books/content?id=t1Mt9CUHyngC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            alt="san francisco"
          />
          <p>
            nskjgnsjkgnjskgajabahfbahbafjsbfh\sfbhjsbfgh\sbfhjsbfhjsbfgh\shjh
          </p>
        </div>
      </div>
    </div> */}
    </div>
  );
}

export default IndividualBook;
