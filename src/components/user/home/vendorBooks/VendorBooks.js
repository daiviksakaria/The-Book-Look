import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Imagegrid from "../../addbook/Imagegrid";

const VendorBooks = ({ docs, selectedImg, setSelectedImg, setSingleDoc }) => {
  // console.log('Hello');
  //  const { docs } = useFirestore("books");
  console.log(docs, "vendorBooks");

  return (
    <div className="container">
      {/*<form>
          <input type="text" className="form-control" name="search" />
        </form>*/}

      <div className="col mr-5">
        <Imagegrid
          flag="vendorBooks"
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

export default VendorBooks;
