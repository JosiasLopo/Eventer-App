// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBf0JtWLL-jsfyz1MLTL_RTj3qPGn2drBQ",
  authDomain: "eventer-connect.firebaseapp.com",
  projectId: "eventer-connect",
  storageBucket: "eventer-connect.appspot.com",
  messagingSenderId: "427065531130",
  appId: "1:427065531130:web:33d151d845c48de6bd8743",
  measurementId: "G-G7CZY8H6QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
