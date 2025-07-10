
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuOT7wiFPkvsoO3Lo_8H8Kc8DFOXj18Ys",
  authDomain: "wallet-1f96f.firebaseapp.com",
  projectId: "wallet-1f96f",
  storageBucket: "wallet-1f96f.appspot.com",
  messagingSenderId: "944291055612",
  appId: "1:944291055612:web:cddeee135767ae91ff9479",
  measurementId: "G-2QEWYEGH0L"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };