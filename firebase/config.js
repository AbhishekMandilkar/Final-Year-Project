import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqbzVUe_Skg-T3wOmVaX-x0b7VNKWwoTM",
  authDomain: "tour-guide-9de5c.firebaseapp.com",
  projectId: "tour-guide-9de5c",
  storageBucket: "tour-guide-9de5c.appspot.com",
  messagingSenderId: "115035900542",
  appId: "1:115035900542:web:3f6a2074b499bb24f6262f",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
