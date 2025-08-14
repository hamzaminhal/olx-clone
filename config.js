// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJT5nbUcimBThpJamozdryCgCw3l5LtUw",
  authDomain: "olx-clone-fae69.firebaseapp.com",
  projectId: "olx-clone-fae69",
  storageBucket: "olx-clone-fae69.firebasestorage.app",
  messagingSenderId: "14668328992",
  appId: "1:14668328992:web:73f002784e9546bfe58c45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, getAuth, auth, getFirestore, db };
