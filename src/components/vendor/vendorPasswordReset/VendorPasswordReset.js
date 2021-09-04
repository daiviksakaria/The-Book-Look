import React, { Component } from "react";
import { fire } from "../../../firebase";
import { Link, Redirect } from "react-router-dom";
import "./passwordreset-styles.css";

class VendorPasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success: false, //password reset email sent or not
      error: null,
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlePasswordChange(e) {
    e.preventDefault();
    var actionCodeSettings = {
      url: "http://localhost:3000/vendor",
      handleCodeInApp: false,
      // When multiple custom dynamic link domains are defined, specify which
      // one to use.
    };
    fire
      .auth()
      .sendPasswordResetEmail(this.state.email, actionCodeSettings)
      .then(() => {
        // Password Reset Email Sent!
        alert("Password Reset Email Sent!");
        this.setState({ success: true });
      })
      .catch((error) => {
        // Handle Errors here.
        //this.setState({success: false});
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ error: errorMessage });
        this.setState({ success: false });
      });
    this.setState({ email: "" });
  }

  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    return (
      <div className="container-fluid reset-container">
        <div className="row">
          <div className="col-sm-6 my-auto">
            <div className="mt-5 title-div">
              <h1 className="title text-nowrap"> THE BOOK LOOK</h1>
            </div>
            <div className="box">
              <div className="box-1 mr-4">
                <h3>Read.</h3>
                <h3>Share.</h3>
                <h3>Repeat.</h3>
              </div>
              <div className="box-2">
                <Link to="/how-to-use">
                  <button
                    type="button"
                    className="btn btn-primary use-button text-nowrap mb-5"
                  >
                    How to use
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="py-5 col-sm-6 d-flex justify-content-center">
            <form className="reset-form">
              <div className="form-group reset-email">
                {/* <label for='email' className="form-title">Enter Email</label> */}
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="Vendor Email Address"
                ></input>
              </div>
              {this.state.error != null ? (
                <div className="alert alert-warning">{this.state.error}</div>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="btn btn-primary mb-2 py-2 reset-button btn-block"
                onClick={this.handlePasswordChange}
              >
                <span className="reset-text">Submit</span>
              </button>
              {this.state.success ? <Redirect to="/" /> : ""}
              <div className="pt-2 d-flex justify-content-center">
                <label for="login" className="form-title mr-2 already-acc">
                  Already have an account?
                </label>
                <Link to="/vendor">
                  <span className="login-item-reset py-2 px-2">Login</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default VendorPasswordReset;
