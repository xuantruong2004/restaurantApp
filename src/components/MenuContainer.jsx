import React, { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoFastFood } from 'react-icons/io5';
import { categories } from '../utils/data';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {
  const [filter, setFilter] = useState('chicken');
  const [{ foodItems }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState({ value: 0 });
  return (
    <section className="w-full my-6 " id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="text-2xl font-semibold capitalize text-headingColor relative
          before:absolute before:content before:w-16 before:h-1 before:rounded-lg 
          before:bg-gradient-to-tr before:from-orange-400 before:to-red-300 cursor-pointer before:left-0 before:-bottom-2 
          transition-all ease-in-out duration-100 mr-auto "
        >
          Our Hot Dishes
        </p>
        <div
          className="w-full flex items-center justify-start lg:justify-center gap-8 py-6
		overflow-x-scroll scrollbar-none"
        >
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                onClick={() => setFilter(category.urlParamName)}
                className={`group ${
                  filter === category.urlParamName ? 'bg-cartNumBg ' : ' bg-card '
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl 
			flex flex-col gap-3 items-center hover:bg-cartNumBg  justify-center duration-150 transition-all ease-in-out`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    filter === category.urlParamName ? ' bg-card  ' : ' bg-cartNumBg  '
                  } flex items-center group-hover:bg-card justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName ? 'text-textColor ' : 'text-card '
                    } group-hover:text-textColor`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName ? 'text-white ' : 'text-textColor '
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer
            scrollValue={scrollValue}
            flag={false}
            data={foodItems?.filter((item) => item.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
