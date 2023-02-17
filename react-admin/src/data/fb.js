// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLIh6suhlGbATilo1BT1KJ_K1ep-7EaOQ",
  authDomain: "vidivici.firebaseapp.com",
  projectId: "vidivici",
  storageBucket: "vidivici.appspot.com",
  messagingSenderId: "990551574724",
  appId: "1:990551574724:web:3c4f0b06024332721ca191",
  measurementId: "G-KRBTX83YM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
