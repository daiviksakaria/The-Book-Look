import React, { Component } from "react";
import fire from "../../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./footer-styles.css";

class Footer extends Component {
  render() {
    return (
      // mt-5
      <div className="pt-2 pb-2 footer">
        <div className="mt-2 container">
          <div className="row ">
            <div className="col-lg-5 col-xs-12 about-company">
              <h2 className="footer-title">THE BOOK LOOK</h2>
              <p className="pr-5 para mb-1">
                A peer to peer book sharing platform.
              </p>
            </div>
            <div className="col-lg-3 col-xs-12 links">
              <h4 className="mt-lg-0 mt-sm-3 footer-title">Links</h4>
              <ul className="mx-0 p-0">
                <li className="footer-link">
                  <Link to="/">
                    <a href="" className="link">
                      Home
                    </a>
                  </Link>
                </li>

                <li className="footer-link">
                  <Link to="/about">
                    <a href="" className="link">
                      About
                    </a>
                  </Link>
                </li>
                <li className="footer-link">
                  <Link to="/policy">
                    <a href="" className="link">
                      Policy
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-xs-12 location">
              <h4 className="mt-lg-0 mt-sm-4 footer-title">Contact</h4>
              <p className="mb-0">
                <i className="fa fa-phone mr-3"></i>
                <span className="para">123-456-7890</span>
              </p>
              <p className="mb-0">
                <i className="fa fa-envelope-o mr-3 location-icon"></i>
                <span className="para">thebooklook101@gmail.com</span>
              </p>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col copyright">
              <p className="para">
                <small>© 2021. All Rights Reserved.</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
