import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useEffect } from 'react';
import NotFound from '../img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainerRef = useRef();
  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue.value;
  }, [scrollValue]);

  const [{ cartItems }, dispatch] = useStateValue();
  const addItem = (item) => {
    const cartList = [...cartItems];
    const isInclude = cartList.find((cart) => cart.id === item.id);
    isInclude ? (isInclude.qty += 1) : cartList.push(item);
    console.log('addItem');

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: cartList,
    });
    localStorage.setItem('cartItems', JSON.stringify(cartList));
  };

  return (
    <div
      ref={rowContainerRef}
      className={`w-full flex items-center gap-3 mt-4 bg scroll-smooth  ${
        flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
      } `}
    >
      {data && data?.length > 0
        ? data.map((item) => (
            <div
              key={item.id}
              className="w-300 h-[225px] min-w-[300px] md:w-340 md:min-w-[340px]  bg-cardOverlay rounded-lg my-12 p-4  backdrop-blur-lg hover:drop-shadow-xl
			flex flex-col items-center justify-between"
            >
              <div className="w-full flex items-center justify-between">
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={item.imageURL}
                  alt=""
                  className="w-40 h-40 object-contain -mt-8 drop-shadow-2xl"
                />
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center
		              cursor-pointer hover:shadow-md"
                  onClick={() => addItem(item)}
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
              </div>
              <div className="w-full flex flex-col items-end justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg ">{item.title}</p>
                <p className="mt-1 text-sm text-gray-500">{item.calories} calories</p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span> {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        : data?.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center">
              <img src={NotFound} alt="" className="h-340" />
              <p className="text-xl text-headingColor font-semibold my-2">items Not Available</p>
            </div>
          )}
    </div>
  );
};

export default RowContainer;
