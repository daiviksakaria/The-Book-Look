import React from "react";
import useFirestore from "../../../hooks/useFirestore";
import { fire } from "../../../firebase";
import { Link, withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import "./imagegrid-styles.css";
const db = fire.firestore();

const ImageGrid = ({
  flag,
  setSelectedImg,
  docs,
  setSingleDoc,
  setProfileID,
}) => {
  const arr = [];
  let docsNew = null;
  if (docs) {
    docsNew = docs.filter((doc) => {
      if (arr.includes(doc.id)) {
        return false;
      } else {
        arr.push(doc.id);
        return true;
      }
    });
  }

  docs = docsNew;

  let link;
  if (flag == "users") link = "/homepage/individualuser";
  else link = "/homepage/individualvendor";

  return (
    <div className="grid-container">
      {docs &&
        docs.map((doc, key) => (
          // <p className="img-grid-book-title px-1">{doc.title}</p>

          <motion.div
            className="location-image-user"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => {
              setSelectedImg(doc.url);
              setSingleDoc(doc);
              setProfileID(doc.id);
              localStorage.setItem("user-admin", JSON.stringify(doc));
            }}
          >
            <Link to={link}>
              <motion.img
                src={
                  doc.url || "https://pic.onlinewebfonts.com/svg/img_568656.png"
                }
                className="img-grid-user"
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              <p className="img-grid-user-name px-1">{doc.name}</p>
            </Link>
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
