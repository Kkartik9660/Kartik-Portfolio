import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAT_dPCR_xAKQEI1BeBpRkgOqY73WQdnaA",
  authDomain: "kartik-c9d5e.firebaseapp.com",
  projectId: "kartik-c9d5e",
  storageBucket: "kartik-c9d5e.appspot.com", // FIXED ✔
  messagingSenderId: "860834360300",
  appId: "1:860834360300:web:cf0e625781c8c4f2762ec9",
};

// Initialize Firebase (normal — UNIQUE name required only if using multi apps)
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export { collection, getDocs };
