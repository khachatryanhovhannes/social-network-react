import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCSYHqYqIIrtEKFqA09RlWUcOtJw_fz9B8",
  authDomain: "social-network-c5b46.firebaseapp.com",
  projectId: "social-network-c5b46",
  storageBucket: "social-network-c5b46.appspot.com",
  messagingSenderId: "1075555829723",
  appId: "1:1075555829723:web:9708c317ae83c69d4a89fe",
  measurementId: "G-N4LH8HP2W6"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
export const storage = getStorage(app)