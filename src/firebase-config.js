import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDiVQ6AuPBaMJ7eY3NewSjl1UwOeQLnlVE",
  authDomain: "todo-app-eeb17.firebaseapp.com",
  projectId: "todo-app-eeb17",
  storageBucket: "todo-app-eeb17.appspot.com",
  messagingSenderId: "226351522651",
  appId: "1:226351522651:web:0a18e179aaf2e35829707e",
  measurementId: "G-0HGXQVLXVF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
