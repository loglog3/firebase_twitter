import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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

export default firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();

// export default firebase.initializeApp();
// firebase 초기 셋업하는 부분.
