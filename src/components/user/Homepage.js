import React, { Component, useState, useEffect, useContext } from "react";
import { fire } from "../../firebase";
import $ from "jquery";
import "./homepage-styles.css";
import Navbar from "./navbar/Navbar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Home from "./home/Home";
import Addbook from "./addbook/Addbook";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Temp from "./Temp.js";
import IndividualBook from "../user/individualbook/Individualbook";
import Mybook from "./home/mybook/Mybook";
import VendorBooks from "./home/vendorBooks/VendorBooks";
import Imagegrid from "./addbook/Imagegrid";
import Search from "../search/Search";
import Profile from "./profile/Profile";
import MyRequests from "./requests/myRequests/MyRequests";
import PendingRequests from "./requests/pendingRequests/PendingRequests";
import CompletedRequests from "./requests/completedRequests/CompletedRequests";
import BooksLent from "./books/booksLent/BooksLent";
import BooksBorrowed from "./books/bookBorrowed/BooksBorrowed";
import BooksSold from "./books/booksSold/BooksSold";
import BooksBought from "./books/booksBought/BooksBought";
import IndividualBookVendor from "./individualbook/individualBookVendor/IndividualBookVendor";
import IndividualBookLent from "./individualbook/individualBookLent/IndividualBookLent";
import IndividualBookBorrowed from "./individualbook/individualBookBorrowed/IndividualBookBorrowed";
import IndividualBookSoldAndBought from "./individualbook/individualBookSoldAndBought/IndividualBookSoldAndBought";
import useFirestore from "../../hooks/useFirestore";
import Chat from "../chat/Chat";
import Discounts from "../user/discounts/Discounts";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const db = fire.firestore();

const Homepage = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [singleDoc, setSingleDoc] = useState(null);
  const [myBooks, setMyBooks] = useState(null);
  const [searchDocs, setSearchDocs] = useLocalStorage("searchDocs", null);
  const [profileID, setProfileID] = useLocalStorage("profileID", null);

  const docs = useFirestore("books");
  const vendorDocs = useFirestore("vendorBooks");
  console.log(vendorDocs);
  const userID = fire.auth().currentUser.uid;
  //const BrowserHistory = require("react-router/lib/BrowserHistory").default;

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      alert("Hiii");
      db.collection("users").doc(userID).update({
        isOnline: false,
      });
    });

    // window.addEventListener("beforeunload", logout);
  }, []);

  function logout() {
    /*  fire.auth().signOut();
    setLoggedIn(false); */
    db.collection("users")
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

  /* const setSelectedImg = (img) => {
    setSelectedImg(img);
  };

  const setSingleDoc = (doc) => {
    setSingleDoc(doc);
  }; */

  function setMyBooksFunc() {
    let books = [];
    const coll = db
      .collection("books")
      .where("bookOwners", "array-contains", `${fire.auth().currentUser.uid}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          books.push({ ...doc.data(), isbn: doc.id });
        });
        setMyBooks(books);
      });
  }
  // console.log(this.myBooks);

  //console.log("homepage", profileID);

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
          {/* <button
            type="submit"
            onClick={this.logout}
            className="float-right mr-2 btn btn-danger"
          >
            Logout
          </button> */}
          {!loggedIn ? <Redirect to="/" /> : ""}
          {/*<div onClick={toggleMenu}>
          <MenuIcon style={{ color: blue[500] }} />
        </div>*/}
          <div className="row">
            <div className="col-xs-auto">
              <Navbar />
            </div>

            <div className="col">
              <Switch>
                <Route
                  path="/homepage/addbook"
                  exact
                  component={Addbook}
                ></Route>
                <Route exact path="/homepage/individualbook">
                  <IndividualBook
                    setProfileID={setProfileID}
                    singleDoc={singleDoc}
                  />
                </Route>
                <Route exact path="/">
                  <Search docs={docs} setSearchDocs={setSearchDocs} />
                  <br></br>
                  <Home
                    docs={docs}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/mybooks">
                  <Search docs={myBooks} setSearchDocs={setSearchDocs} />
                  <br></br>
                  <Mybook
                    myBooks={myBooks}
                    setMyBooksFunc={setMyBooksFunc}
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/vendorbooks">
                  <Search docs={vendorDocs} setSearchDocs={setSearchDocs} />
                  <br></br>
                  <VendorBooks
                    docs={vendorDocs}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/individualbookvendor">
                  <IndividualBookVendor
                    setProfileID={setProfileID}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/search">
                  <Imagegrid
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                    docs={searchDocs}
                  />
                </Route>
                <Route exact path="/homepage/profile">
                  <Profile profileID={profileID} />
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

                <Route exact path="/homepage/booksborrowed">
                  <BooksBorrowed
                    flag="borrowed"
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/individualbookborrowed">
                  <IndividualBookBorrowed
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
                  <IndividualBookSoldAndBought
                    val="requesteeID"
                    setProfileID={setProfileID}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/booksbought">
                  <BooksBought
                    flag="bought"
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/individualbookbought">
                  <IndividualBookSoldAndBought
                    val="requesterID"
                    setProfileID={setProfileID}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/myrequests">
                  <MyRequests />
                </Route>
                <Route exact path="/homepage/pendingrequests">
                  <PendingRequests />
                </Route>
                <Route exact path="/homepage/completedrequests">
                  <CompletedRequests />
                </Route>
                <Route exact path="/homepage/chat">
                  <Chat loggedIn={loggedIn} />
                </Route>
                <Route exact path="/homepage/discounts">
                  <Discounts />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Homepage;
