// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAihnqWNcK-73nbffL0GD9PjYPsXQHDhes",
  authDomain: "savor-app-36a00.firebaseapp.com",
  projectId: "savor-app-36a00",
  storageBucket: "savor-app-36a00.firebasestorage.app",
  messagingSenderId: "578249140024",
  appId: "1:578249140024:web:e0a56c1615c254b5e183cd",
  measurementId: "G-384BS877L4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
