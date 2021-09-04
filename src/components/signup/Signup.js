import React, { Component, useState, useEffect } from "react";
import { fire } from "../../firebase";
import { Link, Redirect } from "react-router-dom";
import "./signup-styles.css";
import { dataOfUniversitiesIndia } from "../../data/University-list-india.js";
const db = fire.firestore();

const Signup = ({ setVendor, setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [college, setCollege] = useState("");
  const [response, setResponse] = useState("no");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // account created or not
  const [canSell, setCanSell] = useState(true);

  function handleSignup(e) {
    e.preventDefault();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        var actionCodeSettings = {
          url: "http://localhost:3000",
          handleCodeInApp: false,
          // When multiple custom dynamic link domains are defined, specify which
          // one to use.
        };
        setAdmin(false);
        const user = data.user;
        user
          .sendEmailVerification(actionCodeSettings)
          .then(() => {
            // Email Verification sent!
            alert("Email Verification Sent!");
          })
          .catch(() => {});
        setSuccess(true);

        // console.log(user);
        // console.log("+" , firstname);
        // console.log(success);

        if (
          college ==
          "Dhirubhai Ambani Institute of Information and Communication Technology"
        ) {
          setCanSell(false);
        }

        db.collection("users")
          .doc(user.uid)
          .set({
            name: firstname + " " + lastname,
            email: email,
            college: college,
            isOnline: false,
            isVendor: false,
            bio: "",
            status: "active",
            url: null,
            canSell,
          });

        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setCollege("");
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
  /* 
  function handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  } */

  function handleYes(e) {
    setResponse("yes");
  }

  function handleNo(e) {
    setResponse("no");
  }

  // filterUniversity(e) {
  //   const text = e.target.value.toLowerCase();
  //   var list = document.querySelectorAll('.collection-item');
  //   //console.log(list);

  //   for(var i=0;i<list.length;i++){
  //     const university = list[i].textContent;
  //     if (university.toLowerCase().indexOf(text) > -1) {
  //       list[i].style.display = '';
  //     } else {
  //       list[i].style.display = "none";
  //     }
  //   }
  /* .forEach(function(university){
        //console.log(university.firstChild.textContent);
        const item = university.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) > -1){
          university.style.display = '';
        } else {
          university.style.display = 'none';
        }
        
      }); 
    }   */

  /*useEffect(() => {
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
  }); */

  function isValid() {
    if (
      firstname == "" ||
      lastname == "" ||
      email == "" ||
      password == "" ||
      (response == "no" && college == "")
    ) {
      return false;
    } else {
      return true;
    }
  }
  const universityList = dataOfUniversitiesIndia.map((cllg) => (
    <option value={cllg.model}></option>
  ));

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
          <form className="signup-form needs-validation" novalidate>
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
              <div className="invalid-feedback"></div>
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
              <label for="college" className="form-title signup-label">
                Are you a college student?
              </label>
              <br></br>
              <label for="yes" className="form-title mr-1 signup-label">
                Yes
              </label>
              <input
                type="radio"
                name="response"
                onClick={handleYes}
                value={response}
                id="yes"
                className="mr-3"
                required
              ></input>

              <label for="no" className="form-title mr-1 signup-label">
                No
              </label>
              <input
                type="radio"
                name="response"
                onClick={handleNo}
                value={response}
                id="no"
                required
              ></input>

              {response == "yes" ? (
                // <Select defaultValue={dataOfUniversitiesIndia[0]} onChange={this.handleCollegeChange} filterOptions={filterOptions} options={dataOfUniversitiesIndia} /> :''
                <div>
                  <input
                    list="college-options"
                    id="college-choice"
                    name="college"
                    onChange={(e) => {
                      setCollege(e.target.value);
                    }}
                    value={college}
                  />
                  <datalist id="college-options">{universityList}</datalist>
                </div>
              ) : (
                ""
              )}
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
                placeholder="User Email Address"
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
            {success ? <Redirect to="/" /> : ""}
            <div className="pt-2 d-flex justify-content-center">
              <label for="login" className="form-title mr-2 signup-label">
                Already have an account?
              </label>
              <Link to="/">
                <span className="signup-login-item py-2 px-2">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
