// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx1MllZuZyM92MYpl-HolTWv7Q6GC3tWE",
  authDomain: "disney-clone-reactjs-ec26b.firebaseapp.com",
  projectId: "disney-clone-reactjs-ec26b",
  storageBucket: "disney-clone-reactjs-ec26b.appspot.com",
  messagingSenderId: "739095953709",
  appId: "1:739095953709:web:67347f75a88040a5b993a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const auth = getAuth();
