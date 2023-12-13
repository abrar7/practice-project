// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBlpfs_kkRvKNupNTIvS4Bp3y8SSBwf2pI",
  authDomain: "digicart-c28bb.firebaseapp.com",
  projectId: "digicart-c28bb",
  storageBucket: "digicart-c28bb.appspot.com",
  messagingSenderId: "1065833022996",
  appId: "1:1065833022996:web:ee05b6f0d15bbe8c34c901",
  measurementId: "G-C2KNEFEGQB",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
