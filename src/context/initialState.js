import { fetchCart, fetchUser } from '../utils/fetchLocalStorageData';

const userInfo = fetchUser();
const cartItems = fetchCart();
export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartItems,
};
