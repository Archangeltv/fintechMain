// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCllFIj3UTtjVa9cfJnhYkuIc_BcDrZb04",
  authDomain: "fintech-e4a13.firebaseapp.com",
  projectId: "fintech-e4a13",
  storageBucket: "fintech-e4a13.appspot.com",
  messagingSenderId: "1072515265191",
  appId: "1:1072515265191:web:52cbeecc27b853f243a182",
  measurementId: "G-6SRF39YC6B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
