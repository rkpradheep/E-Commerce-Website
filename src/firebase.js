// Import the functions you need from the SDKs you need
import  fbase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAVEzySXGbzOcz_Gtcrn0LV0ia7ASELR7E",
  authDomain: "file-b23ef.firebaseapp.com",
  databaseURL: "https://file-b23ef-default-rtdb.firebaseio.com",
  projectId: "file-b23ef",
  storageBucket: "file-b23ef.appspot.com",
  messagingSenderId: "33917125087",
  appId: "1:33917125087:web:ef42394594cc3b75f0c46a",
  measurementId: "G-2F095XBJ38"
};

// Initialize Firebase
 fbase.initializeApp(firebaseConfig);
 var firebase=fbase.database();
export default firebase;