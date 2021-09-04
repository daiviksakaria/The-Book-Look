import React, { Component, useState, useEffect } from "react";
import { fire, timestamp } from "./firebase";
import "./App.css";
import $ from "jquery";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/user/Homepage";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import Homepage from "./components/user/Homepage";
import Passwordreset from "./components/passwordreset/Passwordreset";
import VendorPasswordReset from "./components/vendor/vendorPasswordReset/VendorPasswordReset";
import Footer from "./components/footer/Footer";
import VendorLogin from "./components/vendor/login/VendorLogin";
import VendorSignup from "./components/vendor/signup/VendorSignup";
import AdminLogin from "./components/admin/adminLogin/AdminLogin";
import AdminHomepage from "./components/admin/AdminHomepage";
import VendorHomepage from "./components/vendor/VendorHomepage";
import ReactNotification from "react-notifications-component";
import HowToUse from "./components/HowToUse";
import About from "./components/about/About";
import Policy from "./components/policy/Policy";
import "react-notifications-component/dist/theme.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useLocalStorage("vendor", false);
  const [admin, setAdmin] = useLocalStorage("admin", false);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user, "abc", timestamp());
      console.log(user, admin);

      if ((user && user.emailVerified) || (user && admin == true)) {
        console.log(user, admin);
        setUser("user");
      } else {
        setUser(null);
      }
    });
  }, [admin]);

  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  function select() {
    if (admin == false && vendor == false) {
      return <Homepage />;
    } else if (admin == false && vendor == true) {
      return <VendorHomepage vendor={vendor} setVendor={setVendor} />;
    } else {
      return <AdminHomepage setAdmin={setAdmin} />;
    }
  }

  console.log(user);
  console.log(vendor, admin);

  return (
    <div>
      <ReactNotification />
      {user ? (
        <Router>
          {/* <Header /> */}
          {/*vendor ? (
            <VendorHomepage vendor={vendor} setVendor={setVendor} />
          ) : (
            <Homepage />
          )*/}
          {select()}
          <Footer />
        </Router>
      ) : (
        <Router>
          <Header />

          <Switch>
            <Route path="/signup" exact>
              <Signup setVendor={setVendor} setAdmin={setAdmin} />
            </Route>
            <Route path="/vendorsignup" exact>
              <VendorSignup setVendor={setVendor} setAdmin={setAdmin} />
            </Route>
            <Route path="/" exact>
              <Login
                success={user}
                setSuccess={setUser}
                setVendor={setVendor}
                setAdmin={setAdmin}
              />
            </Route>
            <Route path="/vendor" exact>
              <VendorLogin
                success={user}
                setSuccess={setUser}
                setVendor={setVendor}
                setAdmin={setAdmin}
              />
            </Route>
            <Route path="/passwordreset" component={Passwordreset} />
            <Route exact path="/vendorpasswordreset">
              <VendorPasswordReset />
            </Route>
            {/* <Route path="/vendorpasswordreset" component={VendorPasswordreset} /> */}
            <Route path="/admin">
              <AdminLogin setAdmin={setAdmin} setVendor={setVendor} />
            </Route>
            <Route path="/how-to-use">
              <HowToUse />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/policy">
              <Policy />
            </Route>
          </Switch>
          <Footer />
        </Router>
      )}
    </div>
  );
};

export default App;
