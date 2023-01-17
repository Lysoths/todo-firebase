import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJs7kHkIbXeh7fPs1qwuawLXo8zNaS6Wg",
  authDomain: "crud-d8b72.firebaseapp.com",
  projectId: "crud-d8b72",
  storageBucket: "crud-d8b72.appspot.com",
  messagingSenderId: "524217254090",
  appId: "1:524217254090:web:1d25a55fab0dda19e4b433",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
