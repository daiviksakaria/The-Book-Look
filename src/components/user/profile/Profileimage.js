import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  withRouter,
} from "react-router-dom";
import "./profile-styles.css";
import { store } from "react-notifications-component";
import { motion } from "framer-motion";
import useStorage from "../../../hooks/useStorage";
import "./profileimage-styles.css";
const db = fire.firestore();

const Profileimage = ({ file, setFile, flag }) => {
  const { progress, url } = useStorage(file);
  const ID = fire.auth().currentUser.uid;

  useEffect(() => {
    if (url) {
      db.collection(flag).doc(ID).update({
        url: url,
      });
      setFile(null);
      console.log("progress");
    }
  }, [url, setFile]);

  return (
    <motion.div
    /* className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }} */
    ></motion.div>
  );
};

export default Profileimage;
