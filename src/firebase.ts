// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3Ah29Bvw24QgBZB0jKgsSg3YZFtFYrVY",
  authDomain: "therapy-scribe.firebaseapp.com",
  projectId: "therapy-scribe",
  storageBucket: "therapy-scribe.appspot.com",
  messagingSenderId: "736477240175",
  appId: "1:736477240175:web:542d3bc8579550e735e69a",
  measurementId: "G-Y0CN3G80RW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
