import React, { useEffect, useState } from "react";
import Progressbar from "./Progressbar";
import "./uploadbook-styles.css";
import {
  fire,
  projectStorage,
  projectFirestore,
  timestamp,
} from "../../../firebase";
import { store } from "react-notifications-component";
const db = fire.firestore();

const Uploadbook = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const [isbn, setIsbn] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [copies, setCopies] = useState(1);
  const [category, setCategory] = useState(null);
  const [url, setUrl] = useState(null);
  const [price, setPrice] = useState(null);
  const [donate, setDonate] = useState(null);
  const [sell, setSell] = useState(false);
  const [canSell, setCanSell] = useState(null);
  const [validIsbn, setValidIsbn] = useState(null);
  const currentUserID = fire.auth().currentUser.uid;

  const types = ["image/png", "image/jpeg"];
  console.log("upload book");

  useEffect(() => {
    db.collection("users")
      .doc(currentUserID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCanSell(doc.data().canSell);
        }
      });
  }, [currentUserID]);

  const handleChange = (e) => {
    setIsbn(e.target.value);
  };

  /*  useEffect(() => {
    setValidIsbn(null);
    return () => {
      
    }
  }, []); */

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

  const fileUpload = (e) => {
    document.getElementById("InputFile").click();
  };

  const handleSubmitISBN = (e) => {
    e.preventDefault();
    const url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        if (data.totalItems === 0) {
          setIsCorrect(false);
          setValidIsbn(false);
        } else {
          //console.log(data);
          setIsCorrect(true);
          setValidIsbn(true);
          const book = data.items[0].volumeInfo;

          setTitle(book.title);
          setAuthor(book.authors);
          setCategory(book.categories);
          setUrl(book.imageLinks.smallThumbnail);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleYes = (e) => {
    setDonate(true);
    setSell(false);
  };

  const handleNo = (e) => {
    setDonate(false);
  };

  const handleSellYes = (e) => {
    setSell(true);
  };

  const handleSellNo = (e) => {
    setSell(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var user = fire.auth().currentUser.uid;

    const docRef = db.collection("books").doc(isbn);
    docRef.get().then((doc) => {
      if (doc.exists === false) {
        docRef.set({
          title: title,
          authors: author,
          categories: category,
          url: url,
          bookOwners: [user],
          status: "active",
        });
      } else {
        const arr = doc.data().bookOwners;
        console.log(doc.data());
        arr.push(user);
        docRef.update({
          bookOwners: arr,
        });
      }

      const dataRef = docRef.collection("owners").doc(user);
      const userInfo = db.collection("users").doc(user);
      userInfo.get().then((doc) => {
        dataRef.set({
          name: doc.data().name,
          copies: parseInt(copies),
          wantToSell: sell,
          price: price,
        });
      });
    });

    store.addNotification({
      title: "Success",
      message: "Your book has been added successfully",
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

    setError(false);
    setIsCorrect(false);
    setDonate(null);
    setSell(false);
    setCopies(1);
    setIsbn("");
    setPrice(null);
    setValidIsbn(true);
    // console.log('Hi');
  };

  return (
    <div className="container">
      <form className="upload-book-form">
        <div className="form-group upload-book-item">
          <label for="isbn" className="form-title upload-book-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control addbook-isbn"
            onChange={handleChange}
            name="isbn"
            value={isbn}
            id="isbn"
            placeholder="ISBN"
            required
          ></input>
          <button type="submit" onClick={handleSubmitISBN}>
            Search
          </button>
        </div>
        {isCorrect ? (
          <div>
            <div>
              <img src={url}></img>
            </div>
            <div className="form-group upload-book-item">
              <label for="category" className="form-title upload-book-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                id="title"
                placeholder="Title"
                required
              ></input>
            </div>

            <div className="form-group upload-book-item">
              <label for="category" className="form-title upload-book-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={author}
                id="author"
                placeholder="Author"
                required
              ></input>
            </div>

            <div className="form-group upload-book-item">
              <label for="category" className="form-title upload-book-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={category}
                id="category"
                placeholder="Category"
                required
              ></input>
            </div>

            <div className="form-group upload-book-item">
              <label for="copies" className="form-title upload-book-label">
                Total Copies
              </label>
              <input
                type="text"
                className="form-control"
                name="copies"
                value={copies}
                onChange={(e) => setCopies(e.target.value)}
                id="copies"
                placeholder="Copies"
                required
              ></input>
            </div>

            <div className="form-group upload-book-item">
              <label for="donate" className="form-title upload-book-label">
                Do you want to donate the book ?
              </label>
              <br></br>
              <label for="yes" className="form-title mr-1 upload-book-label">
                Yes
              </label>
              <input
                type="radio"
                name="donate"
                onClick={handleYes}
                value={donate}
                id="yes"
                className="mr-3"
                required
              ></input>

              <label for="no" className="form-title mr-1 upload-book-label">
                No
              </label>
              <input
                type="radio"
                name="donate"
                onClick={handleNo}
                value={donate}
                id="no"
                required
              ></input>

              {donate == false && canSell == true ? (
                <div className="form-group upload-book-item">
                  <label
                    for="sell"
                    className="form-title upload-book-label mt-2"
                  >
                    Do you want to sell the book ?
                  </label>
                  <br></br>
                  <label
                    for="yes"
                    className="form-title mr-1 upload-book-label"
                  >
                    Yes
                  </label>
                  <input
                    type="radio"
                    name="sell"
                    onClick={handleSellYes}
                    value={sell}
                    id="yes"
                    className="mr-3"
                    required
                  ></input>

                  <label for="no" className="form-title mr-1 upload-book-label">
                    No
                  </label>
                  <input
                    type="radio"
                    name="sell"
                    onClick={handleSellNo}
                    value={sell}
                    id="no"
                    required
                  ></input>
                  <br></br>

                  {sell == true ? (
                    <div className="form-group upload-book-item">
                      <label
                        for="price"
                        className="form-title upload-book-label mt-2"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        id="price"
                        placeholder="Price"
                        required
                      ></input>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="form-group upload-book-item text-center">
              <button
                type="submit"
                className="btn btn-primary submit-addbook-button align-center"
                onClick={handleSubmit}
              >
                <span className="submit-text">Submit</span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {validIsbn == false ? <div>Invalid ISBN number</div> : ""}

        {/*

      <div className="form-group upload-book-item">
          <label for='category' className="form-title upload-book-label">Category</label>
          <input type='text' className="form-control" name='category' value={category} id='category' placeholder="Category" required></input>
      </div>

      <div className="form-group upload-book-item">
        <label for='image' className="upload-book upload-book-label"> Upload image </label>
          <input type="file" onChange={handleImageChange} />
          <span className="add">+</span>
  </div> */}

        {/* <div className="form-group upload-book-item">
        <input type="file" id="InputFile"  onChange={handleImageChange} name = "file" hidden="hidden" />
        <button type="button" id="buttonStyle" onClick={fileUpload}>Choose File</button>
        <span id="errormsg">No file chosen</span>
      </div> */}

        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {file && <Progressbar file={file} setFile={setFile} />}
        </div>
      </form>
    </div>
  );
};

export default Uploadbook;
