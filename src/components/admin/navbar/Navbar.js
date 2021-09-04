import React, { Component, useEffect } from "react";
import { fire } from "../../../firebase";
import { NavLink, Redirect } from "react-router-dom";
import $ from "jquery";
// import "./navbar-styles.css";

const Navbar = () => {
  useEffect(() => {
    $(document).ready(function () {
      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
      });
    });

    function myFunction(mq) {
      if (mq.matches) {
        $("#sidebarCollapse").prop("disabled", true);
      } else {
        $("#sidebarCollapse").prop("disabled", false);
      }
    }
    var mq = window.matchMedia("(max-width: 480px)");
    myFunction(mq);
    mq.addListener(myFunction);
  }, []);

  return (
    <div className="wrapper">
      {/* <div className="sidebar-header">
            <h3>Bootstrap Slider</h3>
          </div> */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-light toggle-button">
          <div className="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn bn-info toggle-button-sidebar"
            >
              <i className="fa fa-align-justify"></i>
              &nbsp;
              <span>Navigation Panel</span>
            </button>
          </div>
          {/* <input type="text" className="form-control" name='email' id="email" placeholder="Search..."/>             */}
        </nav>

        <nav id="sidebar" className="pl-4">
          <ul className="list-unstyled components">
            {/* <p>The Providers</p> */}

            <li>
              <NavLink to="/homepage/users" exact activeClassName="selected">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/homepage/vendors" exact activeClassName="selected">
                Vendors
              </NavLink>
            </li>

            <li>
              <NavLink to="/homepage/books" exact activeClassName="selected">
                Books
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/homepage/statistics"
                exact
                activeClassName="selected"
              >
                Statistics
              </NavLink>
            </li>

            <li>
              <NavLink to="/homepage/controls" exact activeClassName="selected">
                Controls
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/homepage/queries" exact activeClassName="selected">
                Queries
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
