import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDjIU1XZeQQs6Qfntfd0u4ZxiZX9eRhKg",
  authDomain: "restaurantapp-6dbd1.firebaseapp.com",
  databaseURL: "https://restaurantapp-6dbd1-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-6dbd1",
  storageBucket: "restaurantapp-6dbd1.appspot.com",
  messagingSenderId: "900083054032",
  appId: "1:900083054032:web:17cf45d33527a672c575d5",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
