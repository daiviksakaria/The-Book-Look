import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../firebase";
import { Link, Redirect } from "react-router-dom";
import "./login-styles.css";
import firebase from "firebase/app";
import "firebase/auth";
import useFirestore from "../../../hooks/useFirestore";
import { store } from "react-notifications-component";
const db = fire.firestore();

const VendorLogin = ({ success, setSuccess, setVendor, setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const users = useFirestore("users");
  const vendors = useFirestore("vendors");

  function handleLogin(e) {
    e.preventDefault();

    for (const user of users) {
      if (user.email == email) {
        store.addNotification({
          title: "Access denied",
          message: "Unauthorized access",
          type: "warning",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        });
        setEmail("");
        setPassword("");
        return;
      }
    }

    for (const vendor of vendors) {
      if (vendor.email == email) {
        if (vendor.status == "inactive") {
          store.addNotification({
            title: "Access denied",
            message: "Your account has been blocked by the Admin",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: false,
            },
          });
          setEmail("");
          setPassword("");
          return;
        }
      }
    }

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((data) => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.

        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((data) => {
            const user = data.user;
            console.log("Hi", success, user.emailVerified);
            if (user.emailVerified === false) {
              alert("Please verify your email first");
              setError(null);
            } else {
              setSuccess(true);
              db.collection("vendors").doc(user.uid).update({
                isOnline: true,
              });
            }
            setVendor(true);
            setAdmin(false);
            setEmail("");
            setPassword("");
          });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
        setEmail("");
        setPassword("");
      });

    /*fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        const user = data.user;
        console.log("Hi", success, user.emailVerified);
        if (user.emailVerified === false) {
          alert("Please verify your email first");
        } else {
          setSuccess(true);
          db.collection("vendors").doc(user.uid).update({
            isOnline: true,
          });
        }
        console.log(user);
        setVendor(true);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
        setEmail("");
        setPassword("");

        /*if (errorCode === 'auth/wrong-password') {
              this.setState({error : 'Incorrect Password'});
            }
            else if(errorCode === 'auth/email-already-exists'){
              this.setState({ error: 'The email already exists'});
            } 
            else if(errorCode === 'auth/invalid-email'){
              this.setState({ error: 'Please enter a proper email address'});
            }
            else if(errorCode === 'auth/user-not-found')
            {
              
              this.setState({error : 'User account does not exist'});
            }            
            else {
              this.setState({error : errorMessage});
            } */
    //});
  }

  function isValid() {
    if (email == "" || password == "") {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="container-fluid login-container">
      <div className="row">
        <div className="col-sm-6 my-auto">
          <div className="title-div">
            <h1 className="title text-nowrap"> THE BOOK LOOK</h1>
          </div>
          <div className="box">
            <div className="box-1 mr-4">
              <h3>Read.</h3>
              <h3>Share.</h3>
              <h3>Repeat.</h3>
            </div>
            <div className="box-2">
              <Link to="/how-to-use">
                <button
                  type="button"
                  className="btn btn-primary use-button text-nowrap"
                >
                  How to use
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="py-5 col-sm-6 d-flex justify-content-center">
          <form className="login-form ">
            <div className="form-group login-item">
              <label for="email" className="form-title login-label">
                Vendor Email Address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
            </div>
            <div className="form-group login-item">
              <label for="password" className="form-title login-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </div>
            {error != null ? (
              <div className="alert alert-warning">{error}</div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="btn btn-primary mb-2 py-1 submit-button btn-block"
              onClick={(e) => {
                handleLogin(e);
              }}
              disabled={!isValid()}
            >
              <span className="login-text">Login</span>
            </button>
            <br></br>
            {/* { success ? <Redirect to="/vendor" /> : ""} */}
            <div className="row">
              <div className="col d-flex justify-content-center new-account">
                <Link to="/vendorsignup">
                  <span className="reset-item">Create New Account?</span>
                </Link>
              </div>
              <div className="col d-flex justify-content-center forgot-password">
                <Link to="/vendorpasswordreset">
                  <span className="reset-item">Forgot password?</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
