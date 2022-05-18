// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3gzGz8GNpvfhOWmtXKzsu-oA09Nv1QXg",
  authDomain: "todo-list-7e10c.firebaseapp.com",
  projectId: "todo-list-7e10c",
  storageBucket: "todo-list-7e10c.appspot.com",
  messagingSenderId: "956896731954",
  appId: "1:956896731954:web:fe47473a987e7eef8a6d2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
