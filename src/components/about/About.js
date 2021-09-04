import React, { Component } from "react";
import fire from "../../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./about.css";

const About = () => {
  return (
    <div className="container-md">
      <h3 className="heading-about">About</h3>
      <div className="content-about">
        The Book Look is a peer to peer book sharing system with an aim to share
        resources and exchange knowledge with the entire community. The platform
        helps people to search for the book they want, borrow it or buy it
        according to their convenience as well as sell it or lend it. It reduces
        the hassle of spending a lot of time over finding a book offline.
      </div>
      <br></br>
      <div className="content-about">
        The motivation behind this whole idea is to share resources and exchange
        knowledge in form of books with the entire community. This platform will
        help people to search for the book they want, borrow it or buy it
        according to their convenience as well as sell it or lend it. It will
        reduce the hassle of spending a lot of time over finding a book offline.
      </div>
    </div>
  );
};

export default About;
