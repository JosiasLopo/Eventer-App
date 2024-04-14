// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export const auth = getAuth(app);
export const FIRESTORE_DB = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);
