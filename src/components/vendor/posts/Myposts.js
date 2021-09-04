import React, { Component, useState, useEffect } from "react";
import useFirestore from "../../../hooks/useFirestore";
import { fire } from "../../../firebase";
import { Link, withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import "./myposts-styles.css";
const db = fire.firestore();

const Myposts = () => {
  const [posts, setPosts] = useState(null);
  const currentUserID = fire.auth().currentUser.uid;

  useEffect(() => {
    let container = [];
    db.collection("posts")
      .where("id", "==", currentUserID)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          container.push({
            name: doc.data().name,
            shopname: doc.data().shopname,
            title: doc.data().title,
            post: doc.data().post,
            date: doc.data().createdAt,
          });
        });
        setPosts(container);
      });
  }, []);

  console.log(posts);

  return (
    <div>
      {posts &&
        posts.map((post) => {
          return (
            <div>
              <div class="card" style={{ minWidth: "24rem" }}>
                <div class="card-header">
                  <span style={{ float: "left" }}>{post.name}</span>
                  <span style={{ float: "right" }}>{post.shopname}</span>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{post.title}</h5>
                  <p class="card-text">{post.post}</p>
                </div>
                <div class="card-footer bg-transarent text-muted">
                  {post.date}
                </div>
              </div>
              <br></br>
            </div>
          );
        })}
    </div>
  );
};

export default Myposts;
