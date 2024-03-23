import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "@firebase/messaging";
import firebase from 'firebase/app'; // Import only the base Firebase module
import 'firebase/database'; // Import Firebase Realtime Database




const firebaseConfig = {
  apiKey: "AIzaSyB6KZeSC1FNp2bBEkcO9QUYc-ACR7IuoYM",
  authDomain: "canteen-website-bds.firebaseapp.com",
  projectId: "canteen-website-bds",
  storageBucket: "canteen-website-bds.appspot.com",
  messagingSenderId: "475172613578",
  appId: "1:475172613578:web:8b4d76be1d437cd4f67333",
  measurementId: "G-BCD9ZBP7HC",
};
firebase.initializeApp(firebaseConfig); // Initialize Firebase with your config