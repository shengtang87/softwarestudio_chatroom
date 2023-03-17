import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import firebase from "firebase/compat/app";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBiew5rREa1YQVgiC4OAn5hfxXDYu2wF8",
  authDomain: "midturn-4f613.firebaseapp.com",
  databaseURL: "https://midturn-4f613-default-rtdb.firebaseio.com",
  projectId: "midturn-4f613",
  storageBucket: "midturn-4f613.appspot.com",
  messagingSenderId: "1084655845640",
  appId: "1:1084655845640:web:4f0493d7a11c0fa925ecbd"
};

firebase.initializeApp(firebaseConfig);


export default firebase;