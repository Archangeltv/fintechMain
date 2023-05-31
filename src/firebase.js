// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey1 = import.meta.env.VITE_APIKEY;
const authDomain1 = import.meta.env.VITE_AUTHDOMAIN;
const projectId1 = import.meta.env.VITE_PROJECTID;
const storageBucket1 = import.meta.env.VITE_STORAGE;
const messagingSenderId1 = import.meta.env.VITE_SENDER;
const appId = import.meta.env.VITE_APPID;
const measurementId = import.meta.env.VITE_MEASURE;

const firebaseConfig = {
  apiKey: apiKey1,
  authDomain: authDomain1,
  projectId: projectId1,
  storageBucket: storageBucket1,
  messagingSenderId: messagingSenderId1,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
