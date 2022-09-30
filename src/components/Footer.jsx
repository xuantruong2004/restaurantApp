import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col  px-4  md:px-16 py-8 w-full gap-4 bg-slate-200">
      <div className="flex flex-wrap md:flex-col  w-full md:gap-4">
        {/* shop */}
        <div className="flex flex-col w-[50%] md:w-[30%]  flex-1 gap-3">
          <div className="w-auto text-textColor font-semibold">
            <span className="">Shop</span>
          </div>
          <p className=" w-[80%] text-gray-600 text-sm font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officia architecto
            cupiditate, odio at magni nulla dicta blanditiis quaerat pariatur officiis sequi
            deleniti
          </p>
        </div>

        {/* contact */}
        <div className="flex flex-col w-[50%] md:w-[30%] flex-1 gap-3">
          <span className="w-auto cursor-pointer text-textColor font-semibold">Contact</span>
          <p className="w-[80%] text-gray-600 text-sm font-normal">mail: truongxuantp3@gmail</p>
          <p className="w-[80%] text-gray-600 text-sm font-normal">sdt: 0372018795</p>
        </div>

        {/* info */}
        <div className="flex flex-col w-[50%] md:w-[15%] flex-2 gap-3 mt-3 md:mt-0">
          <span className="w-auto cursor-pointer text-textColor font-semibold">Info</span>
          <dic className="flex flex-col gap-2">
            <p className="w-[80%] text-gray-600 text-sm font-normal hover:text-orange-400 cursor-pointer">
              shopping
            </p>
            <p className="w-[80%] text-gray-600 text-sm font-normal hover:text-orange-400 cursor-pointer">
              Returns
            </p>
            <p className="w-[80%] text-gray-600 text-sm font-normal hover:text-orange-400 cursor-pointer">
              Customer Service
            </p>
            <p className="w-[80%] text-gray-600 text-sm font-normal hover:text-orange-400 cursor-pointer">
              F A Q
            </p>
          </dic>
        </div>

        {/* follow */}
        <div className="flex flex-col w-[50%] md:w-[15%] flex-2 gap-3 mt-3 md:mt-0">
          <span className="w-auto cursor-pointer text-textColor font-semibold">Follow</span>
          <dic className="flex flex-col gap-2">
            <p className="w-[80%] text-gray-600 text-sm font-normal hover:text-orange-400 cursor-pointer">
              Instagram
            </p>
            <p className="w-[80%] text-gray-600 text-sm font-normal hover:text-orange-400 cursor-pointer">
              Facebook
            </p>
            <p className="w-[80%] text-gray-600 text-sm font-normal hover:text-orange-400 cursor-pointer">
              Twitter
            </p>
          </dic>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-400 ">@Copyright-truongxuan</span>
      </div>
    </div>
  );
};

export default Footer;
