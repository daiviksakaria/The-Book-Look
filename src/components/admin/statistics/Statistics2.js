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
import Statistics3 from "./Statistics3";
import Statistics from "./Statistics";

const db = fire.firestore();

const Statistics2 = ({ books, count }) => {
  const [final, setFinal] = useState([]);

  useEffect(() => {
    const arr = [];
    for (const item in books) {
      console.log(item, books[item]);
      if (count == books[item]) {
        arr.push(item);
      }
    }
    const names = [];
    arr.forEach((isbn) => {
      //console.log(isbn);
      db.collection("books")
        .doc(isbn)
        .get()
        .then((doc) => {
          if (doc.exists) {
            //console.log(doc.data());
            names.push(doc.data().title);
          } else {
            db.collection("vendorBooks")
              .doc(isbn)
              .get()
              .then((doc2) => {
                //console.log(doc2.data());
                names.push(doc2.data().title);
              });
          }
          setFinal(names);
          localStorage.setItem("final", JSON.stringify(names));
        });
    });
  }, [books, count]);

  console.log(final);

  return (
    <div>
      <Statistics3 final={final} />
    </div>
  );
};

export default Statistics2;
