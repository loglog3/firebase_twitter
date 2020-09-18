import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLavYPzEPHeqSUeEz1q68GOJCg6hss_90",
  authDomain: "nwitter-bdf38.firebaseapp.com",
  databaseURL: "https://nwitter-bdf38.firebaseio.com",
  projectId: "nwitter-bdf38",
  storageBucket: "nwitter-bdf38.appspot.com",
  messagingSenderId: "1068609465218",
  appId: "1:1068609465218:web:99bd85216c726c58da7d9b",
};
// Initialize Firebase

export const firebaseInstance = firebase;
export const authService = firebase.auth;
export const dbService = firebase.firestore;
export default firebase.initializeApp(firebaseConfig);
// firebase 초기 셋업하는 부분.
