import React, { Component } from "react";
import fire from "../../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./policy.css";

const Policy = () => {
  return (
    <div className="container-md">
      <h3 className="heading-policy">Policy</h3>
      <div className="subheading-policy">
        All the users are hereby requested to adhere to the following
        guidelines:
      </div>
      <br></br>
      <div className="content-policy">
        <ol>
          <li>
            Users/Vendors should not upload any kind of obscene books to the
            system.
          </li>
          <li>
            While using the chat feature of the system, foul or abusive language
            should not be used.
          </li>
          <li>
            The platform will not be responsible for any mis doing during any
            transaction.
          </li>
          <li>
            The platform shall not take any responsibility if a book gets
            misplaced by a user involved in a transaction.
          </li>
        </ol>
      </div>
      <br></br>
      <div className="content-policy">
        Strict action will be taken against anyone found not adhering to the
        guidelines.
      </div>
    </div>
  );
};

export default Policy;
