// Import the functions you need from the SDKs you need
import  fbase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBGQyeOFm0pqDzvmjbngvyJwi-JNLvG00A",
  authDomain: "rk-pradheep.firebaseapp.com",
  databaseURL: "https://rk-pradheep-default-rtdb.firebaseio.com",
  projectId: "rk-pradheep",
  storageBucket: "rk-pradheep.appspot.com",
  messagingSenderId: "435206977554",
  appId: "1:435206977554:web:4ba548955e0a7acb14c0cb",
  measurementId: "G-FHEJT69M7T"
};

// Initialize Firebase
 fbase.initializeApp(firebaseConfig);
 var firebase=fbase.database();
export default firebase;