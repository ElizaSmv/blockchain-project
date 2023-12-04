// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCxw_16F_RIHcKZTNHdNWc7MnTGtTzXzpQ",
	authDomain: "test-c47e7.firebaseapp.com",
	projectId: "test-c47e7",
	storageBucket: "test-c47e7.appspot.com",
	messagingSenderId: "763986909354",
	appId: "1:763986909354:web:80fd1c1a706826b35dd8d3",
	measurementId: "G-PKY93ZJ2ZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

export { db, auth };