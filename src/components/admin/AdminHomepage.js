import React, { Component, useState, useEffect } from "react";
import { fire } from "../../firebase";
import $ from "jquery";
import "./homepage-styles.css";
import Navbar from "./navbar/Navbar";
import Footer from "../footer/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Books from "./books/Books";
import IndividualBook from "./individualBook/Individualbook";
import useFirestore from "../../hooks/useFirestore";
import Users from "./users/Users";
import IndividualUser from "./individualuser/Individualuser";
import Statistics from "./statistics/Statistics";
import Controls from "./controls/Controls";

const db = fire.firestore();

const AdminHomepage = ({ setAdmin }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [singleDoc, setSingleDoc] = useState(null);
  const [myBooks, setMyBooks] = useState(null);
  const [searchDocs, setSearchDocs] = useLocalStorage("searchDocs", null);
  const [profileID, setProfileID] = useLocalStorage("profileID", null);
  const [books, setBooks] = useState(null);
  const [users, setUsers] = useState(null);
  const [vendors, setVendors] = useState(null);

  const docs = useFirestore("books");
  const vendorDocs = useFirestore("vendorBooks");
  console.log(vendorDocs);
  //const userID = fire.auth().currentUser.uid;
  //const BrowserHistory = require("react-router/lib/BrowserHistory").default;

  useEffect(() => {
    const bookContainer = [];
    db.collection("books").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        bookContainer.push({ ...doc.data(), isbn: doc.id });
      });
      setBooks(bookContainer);
    });

    db.collection("vendorBooks").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        bookContainer.push({ ...doc.data(), isbn: doc.id });
      });
      setBooks(bookContainer);
    });

    /* const userContainer = [];
    db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userContainer.push({ ...doc.data(), id: doc.id });
        //console.log(doc.data());
      });
      setUsers(userContainer);
    });

    const vendorContainer = [];
    db.collection("vendors").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        vendorContainer.push({ ...doc.data(), id: doc.id });
        //console.log(doc.data());
      });
      setVendors(vendorContainer);
    });*/
  }, []);

  useEffect(() => {
    const userContainer = [];
    db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userContainer.push({ ...doc.data(), id: doc.id });
        console.log(doc.data());
      });
      setUsers(userContainer);
    });

    const vendorContainer = [];
    db.collection("vendors").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        vendorContainer.push({ ...doc.data(), id: doc.id });
        //console.log(doc.data());
      });
      setVendors(vendorContainer);
    });
  }, []);

  console.log(users);

  function logout() {
    fire.auth().signOut();
    setLoggedIn(false);
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);

    //setAdmin(false);
    // db.collection("users")
    //   .doc(userID)
    //   .update({
    //     isOnline: false,
    //   })
    //   .then(() => {
    //     fire.auth().signOut();
    //     setLoggedIn(false);
    //
    //   });
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
                  //setProfileID(userID);
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
          {!loggedIn ? <Redirect to="/admin" /> : ""}
          <div className="row">
            <div className="col-xs-auto">
              <Navbar />
            </div>

            <div className="col">
              <Switch>
                <Route exact path="/homepage/books">
                  {/*<Search docs={docs} setSearchDocs={setSearchDocs} />*/}
                  <Books
                    docs={books}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                  />
                </Route>
                <Route exact path="/homepage/individualbook">
                  <IndividualBook
                    setProfileID={setProfileID}
                    singleDoc={singleDoc}
                  />
                </Route>
                <Route exact path="/homepage/users">
                  {/*<Search docs={docs} setSearchDocs={setSearchDocs} />*/}
                  <Users
                    docs={users}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                    setProfileID={setProfileID}
                    flag="users"
                  />
                </Route>
                <Route exact path="/homepage/individualuser">
                  <IndividualUser profileID={profileID} flag="users" />
                </Route>
                <Route exact path="/homepage/vendors">
                  {/*<Search docs={docs} setSearchDocs={setSearchDocs} />*/}
                  <Users
                    docs={vendors}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                    setSingleDoc={setSingleDoc}
                    setProfileID={setProfileID}
                    flag="vendors"
                  />
                </Route>
                <Route exact path="/homepage/individualvendor">
                  <IndividualUser profileID={profileID} flag="vendors" />
                </Route>
                <Route exact path="/homepage/statistics">
                  <Statistics />
                </Route>
                <Route exact path="/homepage/controls">
                  <Controls />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default AdminHomepage;
