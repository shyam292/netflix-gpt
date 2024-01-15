// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_LcbHll4j0ZxxaDrYrSZZoKTCU9yu-Mw",
  authDomain: "netflixgptsjm.firebaseapp.com",
  projectId: "netflixgptsjm",
  storageBucket: "netflixgptsjm.appspot.com",
  messagingSenderId: "119146033930",
  appId: "1:119146033930:web:3d85db719bac0b73c440f3",
  measurementId: "G-701GG1P3BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
