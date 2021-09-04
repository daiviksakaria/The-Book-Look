import React, { Component, useState, useEffect } from "react";
import useFirestore from "../../../hooks/useFirestore";
import { fire } from "../../../firebase";
import { Link, withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import "./addpost-styles.css";
import { store } from "react-notifications-component";
const db = fire.firestore();

const Addpost = () => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const currentUserID = fire.auth().currentUser.uid;

  const addPost = (e) => {
    e.preventDefault();

    const date = new Date();
    const postDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const vendorInfo = db.collection("vendors").doc(currentUserID);

    vendorInfo.get().then((doc) => {
      db.collection("posts")
        .add({
          name: doc.data().name,
          shopname: doc.data().shopname,
          id: currentUserID,
          title,
          post,
          createdAt: postDate,
        })
        .then(() => {});
    });

    store.addNotification({
      title: "Success",
      message: "Post added successfully",
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
    setPost("");
    setTitle("");
  };

  return (
    <div className="grid-container-addpost ml-2 mt-2">
      <label for="isbn" className="form-title add-post-label">
        Add New Post
      </label>
      <input
        type="text"
        className="form-control add-post-title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        placeholder="Title"
      />
      <br></br>
      <textarea
        className="form-control addpost-box"
        rows="5"
        value={post}
        placeholder="Add Post"
        onChange={(e) => {
          setPost(e.target.value);
        }}
      ></textarea>
      <button
        type="submit"
        className="btn btn-secondary mt-2 add-post-button"
        onClick={(e) => {
          addPost(e);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Addpost;
