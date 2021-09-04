import React, { Component, useEffect, useContext } from "react";
import { fire } from "../../../firebase";
import { NavLink, Redirect } from "react-router-dom";
import $ from "jquery";
import "./navbar-styles.css";

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
              <span> Navigation Panel</span>
            </button>
          </div>
        </nav>

        <nav id="sidebar" className="pl-4">
          <ul className="list-unstyled components">
            <li>
              <a
                href="#homeSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Home
              </a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <NavLink to="/" exact activeClassName="selected">
                    Users' Books
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/homepage/vendorbooks"
                    exact
                    activeClassName="selected"
                  >
                    Vendors' Books
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/homepage/mybooks"
                    exact
                    activeClassName="selected"
                  >
                    My Books
                  </NavLink>
                </li>
              </ul>
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
                    to="/homepage/booksborrowed"
                    exact
                    activeClassName="selected"
                  >
                    Books Borrowed
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
                <li>
                  <NavLink
                    to="/homepage/booksbought"
                    exact
                    activeClassName="selected"
                  >
                    Books Bought
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
                    to="/homepage/myrequests"
                    exact
                    activeClassName="selected"
                  >
                    My Requests
                  </NavLink>
                </li>
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

            <li>
              <NavLink
                to="/homepage/discounts"
                exact
                activeClassName="selected"
              >
                Discounts
              </NavLink>
            </li>
            <li>
              <NavLink to="/homepage/chat" exact activeClassName="selected">
                Chat
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

// import React, { Component, useEffect, useContext } from "react";
// import { fire } from "../../../firebase";
// import { NavLink, Redirect } from "react-router-dom";
// import $ from "jquery";
// import "./navbar-styles.css";

// const Navbar = () => {
//   useEffect(() => {
//     $(document).ready(function () {
//       $("#sidebarCollapse").on("click", function () {
//         $("#sidebar").toggleClass("active");
//       });
//     });
//   }, []);

//   return (
//     <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
//       <a class="navbar-brand" href="#">
//         Navbar
//       </a>
//       <button
//         class="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span class="navbar-toggler-icon"></span>
//       </button>

//       <div class="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul class="navbar-nav mr-auto">
//           <li class="nav-item active">
//             <a class="nav-link" href="#">
//               Home <span class="sr-only">(current)</span>
//             </a>
//           </li>
//           <li class="nav-item">
//             <a class="nav-link" href="#">
//               Link
//             </a>
//           </li>
//           <li class="nav-item dropdown">
//             <a
//               class="nav-link dropown-toggle"
//               href="#"
//               id="navbarDropdown"
//               role="button"
//               data-toggle="dropdown"
//               aria-haspopup="true"
//               aria-expanded="false"
//             >
//               Dropdown &nbsp;
//               <i class="fas fa-caret-down"></i>
//             </a>
//             <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//               <a class="dropdown-item" href="#">
//                 Action
//               </a>
//               <a class="dropdown-item" href="#">
//                 Another action
//               </a>
//               {/* <div class="dropdown-divider"></div> */}
//               <a class="dropdown-item" href="#">
//                 Something else here
//               </a>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };
// export default Navbar;
