import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  console.log(collection);

  useEffect(() => {
    // const books=projectFirestore.collection(collection);
    const unsub = projectFirestore
      .collection(collection)
      /*.orderBy('createdAt', 'desc')*/
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          console.log(doc.data());
          documents.push({ ...doc.data(), isbn: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);
  //console.log(docs);
  return docs;
};

export default useFirestore;
