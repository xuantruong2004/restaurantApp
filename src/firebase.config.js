import { getApps, getApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCrinIvDsT2OonbQiAxdYkMmhygW1Ah2NY',
  authDomain: 'restaurantapp2-9df94.firebaseapp.com',
  databaseURL: 'https://restaurantapp2-9df94-default-rtdb.firebaseio.com',
  projectId: 'restaurantapp2-9df94',
  storageBucket: 'restaurantapp2-9df94.appspot.com',
  messagingSenderId: '1019160308365',
  appId: '1:1019160308365:web:19c5be951adf060a25d0c4',
};

// restaurantapp
// const firebaseConfig = {
//   apiKey: 'AIzaSyDDjIU1XZeQQs6Qfntfd0u4ZxiZX9eRhKg',
//   authDomain: 'restaurantapp-6dbd1.firebaseapp.com',
//   databaseURL: 'https://restaurantapp-6dbd1-default-rtdb.firebaseio.com',
//   projectId: 'restaurantapp-6dbd1',
//   storageBucket: 'restaurantapp-6dbd1.appspot.com',
//   messagingSenderId: '900083054032',
//   appId: '1:900083054032:web:17cf45d33527a672c575d5',
// };
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
