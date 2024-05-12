// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAs5CYdcyUtwxjWzGoDJv-g5R_66TtSYnQ",
  authDomain: "eventer-5e73c.firebaseapp.com",
  projectId: "eventer-5e73c",
  storageBucket: "eventer-5e73c.appspot.com",
  messagingSenderId: "1005598476049",
  appId: "1:1005598476049:web:ed2e26795ff7e284892eb0"
};

const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export const FIRESTORE_DB = getFirestore(app);
export const storage = getStorage(app); 


