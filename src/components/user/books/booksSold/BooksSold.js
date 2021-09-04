import React, { Component, useState, useEffect } from "react";
import { fire } from "../../../../firebase";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Imagegrid from "../../addbook/Imagegrid";
import useFirestore from "../../../../hooks/useFirestore";
const db = fire.firestore();

const BooksSold = ({ flag, setSelectedImg, setSingleDoc }) => {
  const { docs } = useFirestore("books");
  const [bookDocs, setBookDocs] = useState([]);
  const [title, setTitle] = useState([]);
  const userID = fire.auth().currentUser.uid;
  useEffect(() => {
    //let titleContainer = [];
    let docsContainer = [];
    db.collection("transactions")
      .where(`requesteeID`, "==", userID)
      .where("status", "==", "accepted")
      .where("bookDuration", "==", null)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          docsContainer.push({
            isbn: data.ISBN,
            title: data.title,
            authors: data.authors,
            categories: data.categories,
            url: data.url,
          });
          /* db.collection("books")
            .doc(isbn)
            .get()
            .then((val) => {
              docsContainer.push({ ...val.data(), isbn });
              setBookDocs(docsContainer);
            });
          // setBookDocs(docsContainer); */
        });
        setBookDocs(docsContainer);
        console.log(docsContainer);
      });

    console.log(docsContainer);
  }, []);

  console.log(bookDocs);
  console.log(bookDocs.length);
  // console.log(docs);
  return (
    <div className="container">
      <div className="col mr-5">
        <Imagegrid
          flag={flag}
          setSelectedImg={setSelectedImg}
          setSingleDoc={setSingleDoc}
          docs={bookDocs}
        />
      </div>
    </div>
  );
};

export default BooksSold;
