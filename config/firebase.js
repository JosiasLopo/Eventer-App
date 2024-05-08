// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';





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

const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app); 

// Initialize Firebase


export const auth = getAuth(app);
export const FIRESTORE_DB = getFirestore(app);
export const storage = getStorage(app); // Obtenha a referência para o serviço de armazenamento


