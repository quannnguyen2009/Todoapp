import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDftb_XZNKOD-jLqxpyR8rGEkVP2uJ4QJ0",
  authDomain: "todoapp-7712c.firebaseapp.com",
  projectId: "todoapp-7712c",
  storageBucket: "todoapp-7712c.firebasestorage.app",
  messagingSenderId: "689717552285",
  appId: "1:689717552285:web:2440fb177a45d7776d2074",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Khởi tạo Firebase app
const auth = getAuth(app); // Khởi tạo Firebase Auth
const providerGG = new GoogleAuthProvider(); // Khởi tạo Google Auth Provider
const db = getFirestore(app); // Khởi tạo Firebase Firestore

export {app, auth, providerGG, db};