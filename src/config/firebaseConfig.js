import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDBBQY83MPBvZ6E9mjkhuLiarmQqti7igY",
  authDomain: "fir-course-12e4b.firebaseapp.com",
  projectId: "fir-course-12e4b",
  storageBucket: "fir-course-12e4b.appspot.com",
  messagingSenderId: "70072415312",
  appId: "1:70072415312:web:dcff2042c6f53dbd550d55",
  measurementId: "G-4FBC8T47W6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);