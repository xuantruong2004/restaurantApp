import React, { useState } from 'react';
import { MdOutlineKeyboardBackspace, MdClose } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import NotFound from '../img/NotFound.svg';
import { useEffect } from 'react';

const CartContainer = () => {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  let delivery = 0;
  if (cartItems.length > 0) {
    delivery = 5; //cost delivery
  }
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };
  const SubTotal = cartItems.reduce((prev, curr) => prev + curr.price * curr.qty, 0);

  const increaseItem = (item) => {
    const cartList = [...cartItems];
    const isInclude = cartList.find((cart) => cart.id === item.id);
    isInclude.qty += 1;

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: cartList,
    });
    localStorage.setItem('cartItems', JSON.stringify(cartList));
  };

  const decreaseItem = (item) => {
    const cartList = [...cartItems];
    const isInclude = cartList.find((cart) => cart.id === item.id);
    isInclude.qty -= 1;

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: cartList,
    });
    localStorage.setItem('cartItems', JSON.stringify(cartList));
  };

  const removeItem = (item) => {
    const cartList = [...cartItems];
    cartItems.find((cartItem) => cartItem.id === item.id).qty = 1;
    const newCartList = cartList.filter((cartItem) => cartItem.id !== item.id);

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: newCartList,
    });
    localStorage.setItem('cartItems', JSON.stringify(newCartList));
  };

  const clearCartItems = () => {
    cartItems.forEach((item) => (item.qty = 1));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed z-[101] top-0 right-0 flex flex-col w-full md:w-375 h-screen bg-white drop-shadow-md "
    >
      <div className="w-full flex items-center justify-between px-4 py-2 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} className="text-textColor text-3xl">
          <MdOutlineKeyboardBackspace onClick={showCart} />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md
		duration-100 ease-in-out transition-all cursor-pointer text-textColor text-sm"
          onClick={clearCartItems}
        >
          Clear All
          <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
        {/* Cart List Items */}
        <div className="w-full h-340 md:h-420 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
          {/* Cart Item */}
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="relative w-full p-1 px-2 rounded-lg bg-cartItem flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-1">
                  <img src={item?.imageURL} alt={item?.name} className="w-20 h-20 object-contain" />
                  <div className="flex flex-col text-white">
                    <p className="text-sm">{item.title}</p>
                    <p className="text-xs">
                      {' '}
                      <span className="text-sm text-red-500 font-semibold">$</span> {item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <motion.div whileTap={{ scale: 0.75 }}>
                    <BiMinus
                      className="text-white text-lg cursor-pointer"
                      onClick={() => {
                        if (item.qty > 1) decreaseItem(item);
                      }}
                    />
                  </motion.div>
                  <p className="text-white  bg-cartBg rounded-lg px-2">{item.qty}</p>
                  <motion.div whileTap={{ scale: 0.75 }}>
                    <BiPlus
                      className="text-white text-lg cursor-pointer"
                      onClick={() => increaseItem(item)}
                    />
                  </motion.div>
                </div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="absolute bg-cartBg rounded-full cursor-pointer top-0 right-0 p-1 text-gray-50"
                >
                  <MdClose onClick={() => removeItem(item)} />
                </motion.div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <img src={NotFound} alt="" className="w-[50%] h-[50%]" />
              <p className="text-xl text-gray-100 font-medium my-2">Cart is Empty</p>
            </div>
          )}
        </div>

        {/* cart total section */}
        <div
          className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly
		px-8 py-2"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Sub Total</p>
            <p className="text-gray-400 text-lg">
              <span className=" text-red-500">$</span> {SubTotal}
            </p>
          </div>

          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Delivery</p>
            <p className="text-gray-400 text-lg">
              <span className=" text-red-500">$</span> {delivery}
            </p>
          </div>

          <div className="w-full border-b border-gray-600 my-2"></div>

          <div className="w-full flex items-center justify-between">
            <p className="text-gray-200 text-xl font-semibold">Total</p>
            <p className="text-gray-200 text-xl font-semibold">
              <span className=" text-red-500">$</span> {SubTotal + delivery}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.8 }}
            className="w-full p-2 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg hover:text-white
		  transition-all duration-150 ease-in-out"
          >
            Check Out
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartContainer;
