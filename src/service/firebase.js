import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const addToFirebase = async (user, data) => {
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, { bookmarks: arrayUnion(data) });
};

export const removeFromFirebase = async (user, data) => {
  const userRef = doc(db, "users", user.uid);
  
  await updateDoc(userRef, { bookmarks: arrayRemove(data) });
};

export default db;
