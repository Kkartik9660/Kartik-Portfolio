import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT_dPCR_xAKQEI1BeBpRkgOqY73WQdnaA",
  authDomain: "kartik-c9d5e.firebaseapp.com",
  projectId: "kartik-c9d5e",
  storageBucket: "kartik-c9d5e.firebasestorage.app",
  messagingSenderId: "860834360300",
  appId: "1:860834360300:web:cf0e625781c8c4f2762ec9",
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, "comments-app");
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
