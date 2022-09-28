import { collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase.config';

// Saving newItem
export const saveItem = async (data) => {
  await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, { merge: true });
};

// getAll food items
export const getAllFoodItems = async () => {
  const items = await getDocs(query(collection(firestore, 'foodItems'), orderBy('id', 'desc')));
  return items.docs.map((doc) => doc.data());
};

// Save User
export const saveUser = async (user) => {
  await setDoc(doc(firestore, 'users', `${Date.now()}`), user, { merge: true });
};

// getAll user items
export const getAllUser = async () => {
  const users = await getDocs(query(collection(firestore, 'users'), orderBy('id', 'desc')));
  return users.docs.map((doc) => doc.data());
};
