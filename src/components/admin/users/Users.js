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

const Users = ({
  docs,
  selectedImg,
  setSelectedImg,
  setSingleDoc,
  setProfileID,
  flag,
}) => {
  // console.log('Hello');
  //  const { docs } = useFirestore("books");
  console.log(docs, "home");

  return (
    <div className="container">
      {/*<form>
          <input type="text" className="form-control" name="search" />
        </form>*/}

      <div className="col mr-5">
        <Imagegrid
          setSelectedImg={setSelectedImg}
          setSingleDoc={setSingleDoc}
          docs={docs}
          setProfileID={setProfileID}
          flag={flag}
        />

        {/* {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )} */}
      </div>
    </div>
  );
};

export default Users;
