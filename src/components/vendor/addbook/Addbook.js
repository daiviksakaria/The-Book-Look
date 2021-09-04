import React, { useState } from "react";
import Uploadbook from "./Uploadbook";
import Imagegrid from "./Imagegrid";
import Modal from "./Modal";
import "./addbook-styles.css";

const Addbook = () => {
  console.log("add book");

  return (
    <div className="Ap">
      <Uploadbook />
    </div>
  );
};

export default Addbook;
