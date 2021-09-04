import React from "react";
//import useFirestore from "../../../hooks/useFirestore";
import { fire } from "../../../firebase";
import { Link, withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import "./imagegrid-styles.css";
const db = fire.firestore();

const ImageGrid = ({ flag, setSelectedImg, docs, setSingleDoc }) => {
  // const { docs } = useFirestore('books');
  console.log("img grid");
  //console.log(docs.length);
  console.log(docs);

  const arr = [];
  let docsNew = null;
  if (docs) {
    docsNew = docs.filter((doc) => {
      if (arr.includes(doc.isbn) || doc.status == "inactive") {
        return false;
      } else {
        arr.push(doc.isbn);
        return true;
      }
    });
  }

  docs = docsNew;

  function setLink(flag) {
    switch (flag) {
      case "lent":
        return "/homepage/individualbooklent";
      case "borrowed":
        return "/homepage/individualbookborrowed";
      case "sold":
        return "/homepage/individualbooksold";
      case "bought":
        return "/homepage/individualbookbought";
      case "vendorBooks":
        return "/homepage/individualbookvendor";
      default:
        return "/homepage/individualbook";
    }
  }

  return (
    <div className="grid-container">
      {docs &&
        docs.map((doc, key) => (
          // <p className="img-grid-book-title px-1">{doc.title}</p>

          <motion.div
            className="location-image"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => {
              setSelectedImg(doc.url);
              setSingleDoc(doc);
              localStorage.setItem("book", JSON.stringify(doc));
            }}
          >
            <Link to={setLink(flag)}>
              <motion.img
                src={doc.url}
                className="img-grid-book"
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              <p className="img-grid-book-title px-1">{doc.title}</p>
            </Link>
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
