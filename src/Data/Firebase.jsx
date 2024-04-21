import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBwoZduWzCu5u7bi0OLoJyXWFtGMQKTfM8",
  authDomain: "staydz-84c0f.firebaseapp.com",
  projectId: "staydz-84c0f",
  storageBucket: "staydz-84c0f.appspot.com",
  messagingSenderId: "279300784719",
  appId: "1:279300784719:web:a5205efa43aa18d122603a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()