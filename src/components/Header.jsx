import React, { useState } from 'react';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';

import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      try {
        const {
          user: { providerData, refreshToken },
        } = await signInWithPopup(firebaseAuth, provider);

        dispatch({
          type: actionType.SET_USER,
          user: providerData[0],
        });
        localStorage.setItem('user', JSON.stringify(providerData[0]));
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsMenu((prev) => !prev);
    }
  };

  const Logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary ">
      {/* Desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'}>
          <div className="flex items-center gap-2" onClick={() => setIsMenu(false)}>
            <img src={Logo} alt="logo" className="w-10 object-cover" />
            <p className="text-headingColor text-xl font-bold">City</p>
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Service
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center ">
            <MdShoppingBasket className="text-textColor text-2xl " />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] object-cover rounded-full shadow-lg cursor-pointer"
              src={user ? (user.photoURL ? user.photoURL : Avatar) : Avatar}
              alt="userProfile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-11 "
              >
                {user && user.email === 'truongxuantp3@gmail.com' && (
                  <Link to={'/createitem'}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 
                    transition-all ease-in-out duration text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      Menu Items <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 
                transition-all ease-in-out duration text-textColor text-base"
                  onClick={Logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to={'/'}>
          <div className="flex items-center gap-2" onClick={() => setIsMenu(false)}>
            <img src={Logo} alt="logo" className="w-10 object-cover" />
            <p className="text-headingColor text-xl font-bold">City</p>
          </div>
        </Link>

        <div className="relative flex ">
          <div className="relative flex items-center justify-center mr-3 ">
            <MdShoppingBasket className="text-textColor text-2xl " />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] object-cover rounded-full shadow-lg cursor-pointer"
            src={user ? user?.photoURL : Avatar}
            alt="userProfile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-11 "
            >
              {user && user.email === 'truongxuantp3@gmail.com' && (
                <Link to={'/createitem'}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 
                  transition-all ease-in-out duration text-textColor text-base "
                    onClick={() => setIsMenu(false)}
                  >
                    Menu Items <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer  hover:bg-slate-100"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="px-4 py-2 text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer  hover:bg-slate-100"
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="px-4 py-2 text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer  hover:bg-slate-100"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="px-4 py-2 text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer  hover:bg-slate-100"
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-sm flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 
              transition-all ease-in-out duration text-textColor text-base"
                onClick={Logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
