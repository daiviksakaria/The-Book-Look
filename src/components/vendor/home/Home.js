import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Imagegrid from "../addbook/Imagegrid";

const Mybook = ({ myBooks, setMyBooksFunc, setSelectedImg, setSingleDoc }) => {
  //setMyBooks();
  //console.log(myBooks);
  //console.log(myBooks[0].title);

  useEffect(() => {
    setMyBooksFunc();
  }, []);

  return (
    <div>
      <Imagegrid
        flag="VendorBooks"
        setSelectedImg={setSelectedImg}
        docs={myBooks}
        setSingleDoc={setSingleDoc}
      />
    </div>
  );
};

export default Mybook;
