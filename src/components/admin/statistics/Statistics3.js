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

const db = fire.firestore();

const Statistics3 = ({ final }) => {
  //const [final, setFinal] = useState([]);
  let final2;
  useEffect(() => {
    final2 = JSON.parse(localStorage.getItem("final"));
  }, [final]);

  console.log(final);

  return (
    <div>
      {final2 &&
        final2.map((doc) => {
          return <div>{doc}</div>;
        })}
    </div>
  );
};

export default Statistics3;
