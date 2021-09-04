import React, { Component, useState, useEffect } from "react";
import { fire } from "../../firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./search-styles.css";
const db = fire.firestore();

const Search = ({ docs, setSearchDocs }) => {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);

  const [titleVal, setTitleVal] = useState(null);
  const [authorVal, setAuthorVal] = useState(null);
  const [categoryVal, setCategoryVal] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);

  // console.log(docs, "hi");
  let titleContainer = [];
  let authorContainer = [];
  let categoryContainer = [];

  useEffect(() => {
    console.log("useef search- start");
    if (docs) {
      docs.forEach((doc) => {
        titleContainer.push(doc.title);
        authorContainer.push(...doc.authors);
        categoryContainer.push(...doc.categories);
      });
      const dummyTitle = new Set(titleContainer);
      titleContainer = [...dummyTitle];

      const dummyAuthor = new Set(authorContainer);
      authorContainer = [...dummyAuthor];

      const dummyCategory = new Set(categoryContainer);
      categoryContainer = [...dummyCategory];

      setTitle(titleContainer);
      setAuthor(authorContainer);
      setCategory(categoryContainer);

      console.log("useef search- mid");
    }
    console.log("useef search- end");
  }, [docs]);

  function handleSearch() {
    const docsContainer = docs.filter((doc) => {
      return (
        (titleVal == null || doc.title === titleVal) &&
        (authorVal == null || doc.authors.includes(authorVal)) &&
        (categoryVal == null || doc.categories.includes(categoryVal))
      );
    });

    setSearchDocs(docsContainer);
    setSearchClicked(true);
    setTitleVal(null);
  }

  console.log(title, "AA");
  return (
    <div className="grid-container-search">
      <div className="item-search search-item-1">
        {title ? (
          <Autocomplete
            id="title"
            size="small"
            value={titleVal}
            onChange={(event, newValue) => {
              setTitleVal(newValue);
              //console.log(newValue);
            }}
            options={title}
            getOptionLabel={(option) => option}
            style={{ width: 240 }}
            renderInput={(params) => (
              <TextField {...params} label="Title" variant="outlined" />
            )}
          />
        ) : (
          ""
        )}
      </div>
      <div className="item-search search-item-2">
        <Autocomplete
          id="author"
          size="small"
          value={authorVal}
          onChange={(event, newValue) => {
            setAuthorVal(newValue);
          }}
          options={author}
          getOptionLabel={(option) => option}
          style={{ width: 240 }}
          renderInput={(params) => (
            <TextField {...params} label="Author" variant="outlined" />
          )}
        />
      </div>
      <div className="item-search search-item-3">
        <Autocomplete
          id="category"
          size="small"
          value={categoryVal}
          onChange={(event, newValue) => {
            setCategoryVal(newValue);
          }}
          options={category}
          getOptionLabel={(option) => option}
          style={{ width: 240 }}
          renderInput={(params) => (
            <TextField {...params} label="Category" variant="outlined" />
          )}
        />
      </div>
      <div className="item-search search-item-4">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {searchClicked ? <Redirect to="/homepage/search" /> : ""}
    </div>
  );
};

export default Search;
