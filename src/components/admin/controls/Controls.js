import React, { Component, useState, useEffect } from "react";
import firebase from "firebase/app";
import Popup from "reactjs-popup";
import { fire } from "../../../firebase";
import { store } from "react-notifications-component";

const db = fire.firestore();

const Controls = () => {
  function handleSellDisable() {
    db.collection("users")
      .where(
        "college",
        "==",
        "Dhirubhai Ambani Institute of Information and Communication Technology"
      )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          db.collection("users").doc(document.id).update({
            canSell: false,
          });
        });
      });

    store.addNotification({
      title: "Success",
      message: "Sell option for DA-IICT students disabled",
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
      .where(
        "college",
        "==",
        "Dhirubhai Ambani Institute of Information and Communication Technology"
      )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          db.collection("users").doc(document.id).update({
            canSell: true,
          });
        });
      });

    store.addNotification({
      title: "Success",
      message: "Sell option for DA-IICT students enabled",
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
      <span
        style={{
          fontSize: "calc(0.4vw + 1em)",
          fontWeight: 700,
          color: "#1643e2",
        }}
      >
        For DA-IICT Students:
      </span>
      &nbsp;
      <button className="btn btn-secondary" onClick={handleSellDisable}>
        Disable sell
      </button>
      &nbsp;
      <button className="btn btn-info" onClick={handleSellEnable}>
        Enable Sell
      </button>
    </div>
  );
};

export default Controls;
