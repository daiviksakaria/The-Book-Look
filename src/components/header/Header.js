import React, { Component } from "react";
import { fire } from "../../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./header-styles.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-style navbar-expand-md">
          <span className="iconify" id="logo" data-icon="raphael:books"></span>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#menuItems"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuItems">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link" href="">
                    <span className="header-link">Home</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about">
                  <a className="nav-link" href="">
                    <span className="header-link">About</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/policy">
                  <a className="nav-link" href="">
                    <span className="header-link">Policy</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
