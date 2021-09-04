import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  /*
  btp-2021
  apiKey: "AIzaSyCQTCqIPRPmynV4OPP7fkJwPxlUpdLXINA",
  authDomain: "btp-2021.firebaseapp.com",
  projectId: "btp-2021",
  storageBucket: "btp-2021.appspot.com",
  messagingSenderId: "512801745106",
  appId: "1:512801745106:web:fb8a09952041852a1d250b",
  measurementId: "G-VS6TQTM6XN",
*/

  apiKey: "AIzaSyAFZ7Tx6NDd_6khDTxzjzqa8IbX8aN252c",
  authDomain: "thebooklook-tbl.firebaseapp.com",
  projectId: "thebooklook-tbl",
  storageBucket: "thebooklook-tbl.appspot.com",
  messagingSenderId: "1013833466344",
  appId: "1:1013833466344:web:4c9c6c6dac65094536e45d",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

//export default {fire, projectStorage};
export { fire, projectStorage, projectFirestore, timestamp };
