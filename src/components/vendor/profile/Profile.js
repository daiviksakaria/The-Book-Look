import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  withRouter,
} from "react-router-dom";
import "./profile-styles.css";
import { store } from "react-notifications-component";
import Profileimage from "../../user/profile/Profileimage";

const db = fire.firestore();
//const history = useHistory();

const Profile = ({ profileID }) => {
  const [details, setDetails] = useState([]);
  const [bio, setBio] = useState(null);
  const [address, setAddress] = useState(null);
  const [isVendor, setIsVendor] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const ID = profileID;
  const userID = fire.auth().currentUser.uid;

  useEffect(() => {
    let details = [];

    db.collection("users")
      .doc(ID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsVendor(false);
          setDetails(doc.data());
        } else {
          setIsVendor(true);
          db.collection("vendors")
            .doc(ID)
            .get()
            .then((val) => {
              setDetails(val.data());
            });
        }
      });
  }, [toggle, ID]);

  const updateBio = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(ID)
      .update({
        bio: bio,
      })
      .then(() => {
        store.addNotification({
          title: "Success",
          message: "Bio updated",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        });
        setToggle(!toggle);
      });
  };

  const types = ["image/png", "image/jpeg"];

  const handleImageChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  const updateAddress = (e) => {
    e.preventDefault();
    db.collection("vendors")
      .doc(ID)
      .update({
        address: address,
      })
      .then(() => {
        store.addNotification({
          title: "Success",
          message: "Address updated",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        });
        setToggle(!toggle);
      });
  };

  const updateImage = (e) => {
    e.preventDefault();
    store.addNotification({
      title: "Success",
      message: "Profile image updated",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: false,
      },
    });
    setToggle(!toggle);
  };

  console.log(details);
  console.log(bio);

  const id = "a" + ID;
  const id2 = "b" + ID;
  return (
    <div>
      {isVendor === false ? (
        <div className="grid-container-profile">
          <div className="grid-item bio-details">
            <span class="helper"></span>
            <img
              src={
                details.url ||
                "https://pic.onlinewebfonts.com/svg/img_568656.png"
              }
              className="img-profile rounded mb-2"
              alt={details.name}
            />
            <br></br>
            {/* <div className="container">
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target={"#" + id}
                style={{ visibility: userID == ID ? "visible" : "hidden" }}
              >
                Edit bio
              </button>
              <div
                class="modal fade show" //show removed
                id={id}
                tabindex="-1"
                aria-labelledby="Exmp"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="edit-bio-title">Edit bio</div>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="container">
                      <div className="modal-body">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder={details.bio}
                          onChange={(e) => {
                            setBio(e.target.value);
                          }}
                        >
                          {details.bio}
                        </textarea>
                        <button
                          type="submit"
                          class="btn btn-secondary mt-2"
                          id="update-bio"
                          onClick={(e) => {
                            updateBio(e);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="grid-item align-self-ceter profile-details">
            <p className="">{details.bio}</p>
            <span className="profile-label">NAME:</span>
            <span className="profile-value"> {details.name}</span>
            <br></br>
            <span className="profile-label">COLLEGE:</span>
            <span className="profile-value"> {details.college}</span>
            <br></br>
            <span className="profile-label">STATUS:</span>
            <span className="profile-value">
              {" "}
              {details.status == "active" ? "Active" : "Inactive"}
            </span>
            <br></br>
            <span className="profile-label">EMAIL ADDRESS:</span>
            <span className="profile-value"> {details.email}</span>
          </div>
        </div>
      ) : (
        <div className="grid-container-profile">
          <div className="grid-item bio-details">
            <span class="helper"></span>
            <img
              src={
                details.url ||
                "https://pic.onlinewebfonts.com/svg/img_568656.png"
              }
              className="img-profile rounded mb-2"
              alt={details.name}
            />
            <br></br>
            <div className="container">
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target={"#" + id}
                style={{ visibility: userID == ID ? "visible" : "hidden" }}
              >
                Edit Address
              </button>
              <div
                class="modal fade show" //show removed
                id={id}
                tabindex="-1"
                aria-labelledby="Exmp"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="edit-bio-title">Edit Address</div>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="container">
                      <div className="modal-body">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder={details.address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        >
                          {details.address}
                        </textarea>
                        <button
                          type="submit"
                          class="btn btn-secondary mt-2"
                          id="update-bio"
                          onClick={(e) => {
                            updateAddress(e);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="container">
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target={"#" + id2}
                style={{ visibility: userID == ID ? "visible" : "hidden" }}
              >
                Update profile image
              </button>
              <div
                class="modal fade show" //show removed
                id={id2}
                tabindex="-1"
                aria-labelledby="Exmp"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="edit-bio-title">Update profile image</div>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="container">
                      <div className="modal-body">
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="add-profile-image"
                        />
                        <div className="output">
                          {error && <span className="error">{error}</span>}
                          {file && (
                            <Profileimage
                              file={file}
                              setFile={setFile}
                              flag="vendors"
                            />
                          )}
                        </div>
                        <button
                          type="submit"
                          class="btn btn-secondary mt-2"
                          id="update-image"
                          onClick={(e) => {
                            updateImage(e);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item align-self-ceter profile-details">
            <span className="profile-label">SHOP NAME:</span>
            <span className="profile-value"> {details.shopname}</span>
            <br></br>
            <span className="profile-label">NAME:</span>
            <span className="profile-value"> {details.name}</span>
            <br></br>
            <span className="profile-label">ADDRESS:</span>
            <span className="profile-value"> {details.address}</span>
            <br></br>
            <span className="profile-label">STATUS:</span>
            <span className="profile-value">
              {" "}
              {details.status == "active" ? "Active" : "Inactive"}
            </span>
            <br></br>
            <span className="profile-label">EMAIL ADDRESS:</span>
            <span className="profile-value"> {details.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
