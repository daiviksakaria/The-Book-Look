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

/* import React, {Component} from 'react';
import {fire} from '../../../firebase';
import $ from "jquery";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Addbook extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <form>
        <input type="file"/>          
      </form>
      
    );
  }
}

export default Addbook; */
