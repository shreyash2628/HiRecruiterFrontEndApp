// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr9Vlz71v742trBcfM8VmnQnJY5UicOo0",
  authDomain: "hirecruiter.firebaseapp.com",
  projectId: "hirecruiter",
  storageBucket: "hirecruiter.firebasestorage.app",
  messagingSenderId: "208061136528",
  appId: "1:208061136528:web:937893916a0c93bc862215",
  measurementId: "G-Z46CV86GXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
// const analytics = getAnalytics(app);