import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../firebase";
import { Link, Redirect } from "react-router-dom";
import "./signup-styles.css";
const db = fire.firestore();

const VendorSignup = ({ setVendor, setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [shopname, setShopName] = useState("");
  const [response, setResponse] = useState("no");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // account created or not

  function handleSignup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        var actionCodeSettings = {
          url: "http://localhost:3000/vendor",
          handleCodeInApp: false,
          // When multiple custom dynamic link domains are defined, specify which
          // one to use.
        };
        setAdmin(false);
        console.log("Hi");
        const user = data.user;
        user
          .sendEmailVerification(actionCodeSettings)
          .then(() => {
            // Email Verification sent!
            alert("Email Verification Sent!");
          })
          .catch(() => {});
        setSuccess(true);
        // setVendor(true);

        // console.log(user);
        // console.log("+" , firstname);
        console.log(success, user.uid);

        db.collection("vendors")
          .doc(user.uid)
          .set({
            name: firstname + " " + lastname,
            email: email,
            shopname: shopname,
            address: "",
            isOnline: false,
            isVendor: true,
            url: null,
            status: "active",
          });

        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setShopName("");
        setError(null);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
        setSuccess(false);
      });

    // const user=fire.auth().currentUser;

    // db.collection('users').doc(user.uid).set({
    //   name : firstname + " " + lastname,
    //   email : email,
    //   college : college
    // })
    // .catch();
  }

  useEffect(() => {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  });

  function isValid() {
    if (
      email == "" ||
      password == "" ||
      firstname == "" ||
      lastname == "" ||
      shopname == ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  //console.log(universityList[2]);
  return (
    <div className="container-fluid signup-container">
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
          {/* <div className="application"></div> */}
          <form className="signup-form needs-validation">
            <div className="form-group signup-item">
              {/* <label for='firstname' className="form-title signup-label">First Name</label> */}
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                name="firstname"
                value={firstname}
                id="firstname"
                placeholder="First Name"
                required
              ></input>
            </div>

            <div className="form-group signup-item">
              {/* <label for='lastname' className="form-title signup-label">Last Name</label> */}
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                name="lastname"
                value={lastname}
                id="lastname"
                placeholder="Last Name"
                required
              ></input>
            </div>

            <div className="form-group signup-item">
              {/* <label for='lastname' className="form-title signup-label">Shop Name</label> */}
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setShopName(e.target.value);
                }}
                name="shopname"
                value={shopname}
                id="shopname"
                placeholder="Shop Name"
                required
              ></input>
            </div>

            <div className="form-group signup-item">
              {/* <label for='email' className="form-title signup-label">Email</label> */}
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                placeholder="Vendor Email Address"
                required
              ></input>
            </div>

            <div className="form-group signup-item">
              {/* <label for='password' className="form-title signup-label">Password</label> */}
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                placeholder="Password"
                required
              ></input>
            </div>

            {error != null ? (
              <div className="alert alert-warning">{error}</div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="btn btn-primary mb-2 py-2 signup-button btn-block"
              onClick={handleSignup}
              disabled={!isValid()}
            >
              <span className="signup-text">Signup</span>
            </button>
            {success ? <Redirect to="/vendor" /> : ""}
            <div className="pt-2 d-flex justify-content-center">
              <label for="login" className="form-title mr-2 signup-label">
                Already have an account?
              </label>
              <Link to="/vendor">
                <span className="signup-login-item py-2 px-2">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default VendorSignup;
