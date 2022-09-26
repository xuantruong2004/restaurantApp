import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useStateValue } from '../context/StateProvider';
import HomeContainer from './HomeContainer';
import MenuContainer from './MenuContainer';
import RowContainer from './RowContainer';

const MainContainer = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState({ value: 0 });

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-semibold capitalize text-headingColor relative
          before:absolute before:content before:w-32 before:h-1 before:rounded-lg 
          before:bg-gradient-to-tr before:from-orange-400 before:to-red-300 cursor-pointer before:left-0 before:-bottom-2 
          transition-all ease-in-out duration-100"
          >
            Our Fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 hover:shadow-lg cursor-pointer flex
             items-center justify-center transition-all duration-150 ease-in-out"
              onClick={() => setScrollValue((prev) => ({ ...prev, value: -200 }))}
            >
              <MdChevronLeft className="text-xl text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 hover:shadow-lg cursor-pointer flex
             items-center justify-center transition-all duration-150 ease-in-out"
              onClick={() => setScrollValue((prev) => ({ ...prev, value: 200 }))}
            >
              <MdChevronRight className="text-xl text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((item) => item.category === 'fruits')}
        />
      </section>

      {/* Menu item */}
      <MenuContainer />
    </div>
  );
};

export default MainContainer;
