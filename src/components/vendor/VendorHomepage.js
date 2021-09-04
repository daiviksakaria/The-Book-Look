import React, { Component, useState, useEffect } from "react";
import { fire } from "../../firebase";
import $ from "jquery";
import "./homepage-styles.css";
import Navbar from "../vendor/navbar/Navbar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Search from "../search/Search";
import Home from "../vendor/home/Home";
import Profile from "./profile/Profile";
import Addbook from "./addbook/Addbook";
import Imagegrid from "./addbook/Imagegrid";
import Individualbook from "./individualbook/Individualbook";
import BooksLent from "./books/booksLent/BooksLent";
import IndividualBookLent from "./individualbook/individualBookLent/IndividualBookLent";
import BooksSold from "./books/booksSold/BooksSold";
import IndividualBookSold from "./individualbook/individualBookSold/IndividualBookSold";
import PendingRequests from "./requests/pendingRequests/PendingRequests";
import CompletedRequests from "./requests/completedRequests/CompletedRequests";
import useFirestore from "../../hooks/useFirestore";
import Addpost from "./posts/Addpost";
import Myposts from "./posts/Myposts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const db = fire.firestore();

const VendorHomepage = ({ vendor, setVendor }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [singleDoc, setSingleDoc] = useState(null);
  const [myBooks, setMyBooks] = useState(null);
  const [searchDocs, setSearchDocs] = useLocalStorage("searchDocs", null);
  const [profileID, setProfileID] = useLocalStorage("profile", null);

  const { docs } = useFirestore("vendorbooks");
  const userID = fire.auth().currentUser.uid;
  //const BrowserHistory = require("react-router/lib/BrowserHistory").default;

  function logout() {
    // setVendor(false);
    db.collection("vendors")
      .doc(userID)
      .update({
        isOnline: false,
      })
      .then(() => {
        fire.auth().signOut();
        setLoggedIn(false);
        window.location.reload(false);
      });
  }

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      db.collection("vendors").doc(userID).update({
        isOnline: false,
      });
    });
  }, []);

  function setMyBooksFunc() {
    let books = [];
    const coll = db
      .collection("vendorBooks")
      .where("bookOwners", "array-contains", `${fire.auth().currentUser.uid}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          books.push({ ...doc.data(), isbn: doc.id });
        });
        setMyBooks(books);
      });
  }
  // console.log(myBooks);

  // Hook
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  console.log("vendor");

  return (
    <div>
      <Router>
        <div className="row">
          <div className="col">
            <span
              className="iconify"
              id="logo-main"
              data-icon="raphael:books"
            ></span>
          </div>
          <div className="col align-self-center">
            <button
              type="submit"
              onClick={logout}
              className="float-right mr-2 btn btn-danger"
            >
              Logout
            </button>

            <Link to="/homepage/profile">
              <button
                type="submit"
                onClick={() => {
                  setProfileID(userID);
                }}
                className="float-right mr-2 btn btn-primary"
              >
                Profile
              </button>
            </Link>
          </div>
        </div>

        <div>
          {!loggedIn ? <Redirect to="/vendor" /> : ""}
          <div className="row">
            <div className="col-xs-auto">
              <Navbar />
            </div>

            <div className="col">
              <Switch>
                <Route exact path="/vendor">
                  <Search docs={myBooks} setSearchDocs={setSearchDocs} />
                  <Home
                    myBooks={myBooks}
                    setMyBooksFunc={setMyBooksFunc}
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/profile">
                  <Profile profileID={profileID} />
                </Route>
                <Route exact path="/homepage/search">
                  <Imagegrid
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                    docs={searchDocs}
                  />
                </Route>
                <Route exact path="/homepage/addbook">
                  <Addbook />
                </Route>
                <Route exact path="/homepage/individualbook">
                  <Individualbook
                    setProfileID={setProfileID}
                    singleDoc={singleDoc}
                  />
                </Route>
                <Route exact path="/homepage/bookslent">
                  <BooksLent
                    flag="lent"
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/individualbooklent">
                  <IndividualBookLent
                    setProfileID={setProfileID}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/bookssold">
                  <BooksSold
                    flag="sold"
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/individualbooksold">
                  <IndividualBookSold
                    setProfileID={setProfileID}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/pendingrequests">
                  <PendingRequests />
                </Route>
                <Route exact path="/homepage/completedrequests">
                  <CompletedRequests />
                </Route>
                <Route exact path="/homepage/addpost">
                  <Addpost />
                </Route>
                <Route exact path="/homepage/posts">
                  <Myposts />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default VendorHomepage;
