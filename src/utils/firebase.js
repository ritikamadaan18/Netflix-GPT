// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_m2HWW1L9l_4JPGWFP2r4ut912hU1Sj8",
  authDomain: "netflixgpt-f1f4d.firebaseapp.com",
  projectId: "netflixgpt-f1f4d",
  storageBucket: "netflixgpt-f1f4d.firebasestorage.app",
  messagingSenderId: "1096746350203",
  appId: "1:1096746350203:web:7d66ff2e5cde06ce2654de",
  measurementId: "G-8PRH7T7R47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
