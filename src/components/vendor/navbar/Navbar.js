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
              <NavLink to="/vendor" exact activeClassName="selected">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/homepage/addbook" exact activeClassName="selected">
                Add Book
              </NavLink>
            </li>
            <li>
              <a
                href="#booksSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Books
              </a>
              <ul className="collapse list-unstyled" id="booksSubmenu">
                <li>
                  <NavLink
                    to="/homepage/bookslent"
                    exact
                    activeClassName="selected"
                  >
                    Books Lent
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/homepage/bookssold"
                    exact
                    activeClassName="selected"
                  >
                    Books Sold
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#requestSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Requests
              </a>
              <ul className="collapse list-unstyled" id="requestSubmenu">
                <li>
                  <NavLink
                    to="/homepage/pendingrequests"
                    exact
                    activeClassName="selected"
                  >
                    Pending Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/homepage/completedrequests"
                    exact
                    activeClassName="selected"
                  >
                    Completed Requests
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* 
            <li>
              <a href="#">Discounts</a>
            </li> */}
            <li>
              <a
                href="#postsSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Posts
              </a>
              <ul className="collapse list-unstyled" id="postsSubmenu">
                <li>
                  <NavLink
                    to="/homepage/posts"
                    exact
                    activeClassName="selected"
                  >
                    My Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/homepage/addpost"
                    exact
                    activeClassName="selected"
                  >
                    Add Post
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
