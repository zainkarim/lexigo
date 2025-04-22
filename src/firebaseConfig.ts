// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBi2HEPmlNuiE6vSmw8qfaAhPWbNkuKEI",
  authDomain: "lexigo-61867.firebaseapp.com",
  projectId: "lexigo-61867",
  storageBucket: "lexigo-61867.firebasestorage.app",
  messagingSenderId: "623196417985",
  appId: "1:623196417985:web:e5ffdd19e32907da7ac940",
  measurementId: "G-C4TDNHXXQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);