import React, { Component, useState, useEffect } from "react";
import useFirestore from "../../../hooks/useFirestore";
import { fire } from "../../../firebase";
import { Link, withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import "./discounts-styles.css";
const db = fire.firestore();

const Discounts = () => {
  const currentUserID = fire.auth().currentUser.uid;
  const posts = useFirestore("posts");

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
                  {post.createdAt}
                </div>
              </div>
              <br></br>
            </div>
          );
        })}
    </div>
  );
};

export default Discounts;
