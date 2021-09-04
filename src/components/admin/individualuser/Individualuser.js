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
import Imagegrid from "../books/Imagegrid";
import "./individualuser-styles.css";
import { store } from "react-notifications-component";
import emailjs from "emailjs-com";

const db = fire.firestore();

const IndividualUser = ({ profileID, flag }) => {
  const user = JSON.parse(localStorage.getItem("user-admin"));
  console.log(user);

  const [status, setStatus] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [canSell, setCanSell] = useState(null);
  const currentUserID = fire.auth().currentUser.uid;

  useEffect(() => {
    db.collection(flag)
      .doc(profileID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setStatus(doc.data().status);
          if (flag == "users") {
            setCanSell(doc.data().canSell);
          }
        }
      });
  }, [toggle]);

  function handleEnable(flag) {
    db.collection(flag)
      .doc(profileID)
      .update({
        status: "active",
      })
      .then(() => {
        setToggle(!toggle);
      });

    let msg = "";
    if (flag == "users") msg = "User Enabled";
    else msg = "Vendor Enabled";

    store.addNotification({
      title: "Success",
      message: msg,
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
  }

  function handleDisable(flag) {
    db.collection(flag)
      .doc(profileID)
      .update({
        status: "inactive",
      })
      .then(() => {
        setToggle(!toggle);
      });

    let msg = "";
    if (flag == "users") msg = "User Disabled";
    else msg = "Vendor Disabled";

    store.addNotification({
      title: "Success",
      message: msg,
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
  }

  function handleSellDisable() {
    db.collection("users")
      .doc(profileID)
      .update({
        canSell: false,
      })
      .then(() => {
        setToggle(!toggle);
      });

    store.addNotification({
      title: "Success",
      message: "Sell option disabled",
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
  }

  function handleSellEnable() {
    db.collection("users")
      .doc(profileID)
      .update({
        canSell: true,
      })
      .then(() => {
        setToggle(!toggle);
      });

    store.addNotification({
      title: "Success",
      message: "Sell option enabled",
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
  }

  return (
    <div>
      {flag == "users" ? (
        <div className="grid-container-profile">
          <div className="grid-item bio-details">
            <span class="helper"></span>
            <img
              src={
                user.url || "https://pic.onlinewebfonts.com/svg/img_568656.png"
              }
              className="img-profile rounded mb-2"
              alt={user.name}
            />
            <br></br>
          </div>
          <div className="grid-item align-self-ceter profile-details">
            <p className="">{user.bio}</p>
            <span className="profile-label">NAME:</span>
            <span className="profile-value"> {user.name}</span>
            <br></br>
            <span className="profile-label">COLLEGE:</span>
            <span className="profile-value">
              {" "}
              {user.college ? user.college : "NA"}
            </span>
            <br></br>
            <span className="profile-label">EMAIL ADDRESS:</span>
            <span className="profile-value"> {user.email}</span>
            <br></br>
            <span className="profile-label">STATUS: </span>
            <span className="profile-value">
              {status == "active" ? "Active" : "Inactive"}
            </span>
            <br></br>
            <div class="text-center">
              {status === "active" ? (
                <button
                  onClick={() => {
                    handleDisable("users");
                  }}
                  class="btn btn-danger status-button"
                >
                  Disable
                </button>
              ) : (
                ""
              )}
              {status === "inactive" ? (
                <button
                  onClick={() => {
                    handleEnable("users");
                  }}
                  class="btn btn-primary status-button"
                >
                  Enable
                </button>
              ) : (
                ""
              )}
            </div>
            <br></br>
            <div className="text-center">
              {canSell == true ? (
                <button
                  className="btn btn-secondary"
                  onClick={handleSellDisable}
                >
                  Disable sell
                </button>
              ) : (
                <button className="btn btn-info" onClick={handleSellEnable}>
                  Enable Sell
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid-container-profile">
          <div className="grid-item bio-details">
            <span class="helper"></span>
            <img
              src={
                user.url || "https://pic.onlinewebfonts.com/svg/img_568656.png"
              }
              className="img-profile rounded mb-2"
              alt={user.name}
            />
            <br></br>
          </div>
          <div className="grid-item align-self-ceter profile-details">
            <span className="profile-label">SHOP NAME:</span>
            <span className="profile-value"> {user.shopname}</span>
            <br></br>
            <span className="profile-label">NAME: </span>
            <span className="profile-value">{user.name}</span>
            <br></br>
            <span className="profile-label">ADDRESS:</span>
            <span className="profile-value">{user.address}</span>
            <br></br>
            <span className="profile-label">EMAIL ADDRESS:</span>
            <span className="profile-value"> {user.email}</span>
            <br></br>
            <span className="profile-label">STATUS: </span>
            <span className="profile-value">
              {status == "active" ? "Active" : "Inactive"}
            </span>
            <br></br>
            <div class="text-center">
              {status === "active" ? (
                <button
                  onClick={() => {
                    handleDisable("vendors");
                  }}
                  class="btn btn-danger status-button"
                >
                  Disable
                </button>
              ) : (
                ""
              )}
              {status === "inactive" ? (
                <button
                  onClick={() => {
                    handleEnable("vendors");
                  }}
                  class="btn btn-primary status-button"
                >
                  Enable
                </button>
              ) : (
                ""
              )}
            </div>
            <br></br>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualUser;
