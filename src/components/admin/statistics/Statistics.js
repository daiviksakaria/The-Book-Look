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
import Statistics2 from "./Statistics2";
import "./statistics.css";

const db = fire.firestore();

const Statistics = () => {
  const [stats, setStats] = useState({});
  const [count, setCount] = useState(0);
  const [final, setFinal] = useState([]);
  const [users, setUsers] = useState(0);
  const [vendors, setVendors] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [activeVendors, setActiveVendors] = useState(0);

  useEffect(() => {
    let data = {};
    db.collection("books").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data[doc.id] = { count: doc.data().count, title: doc.data().title };
        if (data[doc.id].count > count) {
          setCount(doc.data().count);
        }
      });
      setStats(data);
    });

    db.collection("vendorBooks").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data[doc.id] = { count: doc.data().count, title: doc.data().title };
        if (data[doc.id].count > count) {
          setCount(doc.data().count);
        }
      });
      setStats(data);
    });
  }, []);

  useEffect(() => {
    //console.log("Hi");
    let cnt1 = 0,
      acnt1 = 0;
    db.collection("users").onSnapshot((querySnapshot) => {
      cnt1 = 0;
      acnt1 = 0;
      querySnapshot.forEach((doc) => {
        cnt1++;
        //console.log(cnt1);
        if (doc.data().isOnline == true) {
          acnt1++;
        }
      });
      setUsers(cnt1);
      setActiveUsers(acnt1);
    });

    let cnt2 = 0,
      acnt2 = 0;

    db.collection("vendors").onSnapshot((querySnapshot) => {
      cnt2 = 0;
      acnt2 = 0;
      querySnapshot.forEach((doc) => {
        cnt2++;
        if (doc.data().isOnline == true) {
          acnt2++;
        }
      });
      setVendors(cnt2);
      setActiveVendors(acnt2);
    });
  }, []);

  useEffect(() => {
    const arr = [];
    for (let item in stats) {
      if (stats[item].count == count) {
        arr.push(stats[item].title);
      }
    }
    setFinal(arr);
  }, [stats, count]);

  //console.log(final, stats);

  return (
    <div>
      {/* <div className="stats-title">Books involved in most transactions</div>
      <br></br> */}
      <div class="card mb-3" style={{ width: 18 + "em" }}>
        {/* bg-info border-info  */}
        <div class="card-header">Users</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item stats-book">Total Users : {users}</li>
          <li class="list-group-item stats-book">
            Active Users : {activeUsers}
          </li>
        </ul>
      </div>
      <div class="card mb-3" style={{ width: 18 + "em" }}>
        {/* bg-info border-info  */}
        <div class="card-header">Vendors</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item stats-book">Total Vendors : {vendors}</li>
          <li class="list-group-item stats-book">
            Active Vendors : {activeVendors}
          </li>
        </ul>
      </div>
      <div class="card mb-3" style={{ width: 18 + "em" }}>
        {/* bg-info border-info  */}
        <div class="card-header">Trending Books</div>
        <ul class="list-group list-group-flush">
          {final.length > 0 &&
            final.map((val) => {
              return <li class="list-group-item stats-book">{val}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
