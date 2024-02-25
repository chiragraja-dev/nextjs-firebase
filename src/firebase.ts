// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkEaebGjKSKoZr8TF_jV-sjqtb-pnGRMU",
    authDomain: "nextjs-firebase-e60b0.firebaseapp.com",
    projectId: "nextjs-firebase-e60b0",
    storageBucket: "nextjs-firebase-e60b0.appspot.com",
    messagingSenderId: "464196088273",
    appId: "1:464196088273:web:7b225734390e08cecdf0f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db }