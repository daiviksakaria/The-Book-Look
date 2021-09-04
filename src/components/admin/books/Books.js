import React, { Component, useState } from "react";
import { fire } from "../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Imagegrid from "./Imagegrid";

const Books = ({ docs, selectedImg, setSelectedImg, setSingleDoc }) => {
  // console.log('Hello');
  //  const { docs } = useFirestore("books");
  //console.log(docs, "home");

  return (
    <div className="container">
      {/*<form>
          <input type="text" className="form-control" name="search" />
        </form>*/}

      <div className="col mr-5">
        <Imagegrid
          flag="books"
          setSelectedImg={setSelectedImg}
          setSingleDoc={setSingleDoc}
          docs={docs}
        />

        {/* {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )} */}
      </div>
    </div>
  );
};

export default Books;
