"use client";

import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Define Firebase services
let app;
let db;
let auth;
let storage;

const firebaseConfig = {
  apiKey: "AIzaSyAuny5xpmnG3WJ66hPi3RtunJVFXPm1AcM",
  authDomain: "kingsword-canada.firebaseapp.com",
  projectId: "kingsword-canada",    
  storageBucket: "kingsword-canada.appspot.com",
  messagingSenderId: "48460646446",
  appId: "1:48460646446:web:c3b0baea1384d5ccb477bf",
  measurementId: "G-PKX3ZF67W3"
};

// Initialize Firebase and services
const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  }
};

// Run initialization function
initializeFirebase();

// Export services
export {
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  auth,
  signInWithEmailAndPassword,
  storage,
  query,
  orderBy,
  serverTimestamp,
  app
};
