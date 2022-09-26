import React from 'react';
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';
import { heroData } from '../utils/data';

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="py-4 flex flex-col items-start justify-center gap-4 flex-1">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img src={Delivery} alt="delivery" className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{' '}
          <span className="text-[3rem] lg:text-[5rem] text-orange-500">Your City</span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat esse, laudantium ipsa
          vitae dolorem, nam, veritatis pariatur reprehenderit tempore iusto dignissimos mollitia
          corporis? Perspiciatis rerum qui saepe earum? Incidunt, tenetur.
        </p>
        <button
          type="button"
          className="p-2 bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 
      rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out text-white md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="py-4 flex-1">
        <div className="w-full flex items-center justify-center relative">
          <img className="lg:h-650 lg:w-auto h-420 w-full ml-auto" src={HeroBg} alt="hero-bg" />
          <div className="w-full h-full absolute top-0  left-0 flex items-center justify-center py-4 gap-4 xl:px-20 flex-wrap">
            {heroData &&
              heroData.map((data) => (
                <div
                  key={data.id}
                  className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                    src={data.imageSrc}
                    alt={data.name}
                  />
                  <p className="text-base lg:text-xl mt-2 lg:mt-4 font-semibold text-textColor">
                    {data.name}
                  </p>
                  <p className="text-[12px] lg:text-sm text-lightTextGray font-semibold lg:my-1 lg:my-3">
                    {data.desc}
                  </p>
                  <p className="text-sm font-semibold text-headingColor">
                    <span className="text-xs text-red-500 mr-1">$</span>
                    {data.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
