import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDbQMzME-0yrqT55l7QeyE7ae87CS3cyV4",
  authDomain: "instagram-clone-23efb.firebaseapp.com",
  projectId: "instagram-clone-23efb",
  storageBucket: "instagram-clone-23efb.appspot.com",
  messagingSenderId: "836092929216",
  appId: "1:836092929216:web:3dc2132ae6076dddb4f925",
  measurementId: "G-EXFG8SCHV3",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
