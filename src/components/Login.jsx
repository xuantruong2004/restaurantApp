import React from 'react';
import { MdClose } from 'react-icons/md';
import Logo from '../img/logo.png';
import { motion } from 'framer-motion';
import { RiLockPasswordLine, RiUserShared2Line } from 'react-icons/ri';
import { useState } from 'react';
import { getAllUser, saveUser } from '../utils/firebaseFuntion';
import { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Login = ({ loginFacebook, loginGoogle, showModal }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true);
  const [userAll, setUserAll] = useState(null);
  const [field, setField] = useState(false);
  const [msg, setMsg] = useState('Thong bao login');
  const [alertStatus, setAlertStatus] = useState('danger');
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpassword: '',
  });

  const [{ user }, dispatch] = useStateValue();
  const fetchData = async () => {
    try {
      await getAllUser().then((data) => {
        console.log('user get All', data);
        setUserAll(data);
      });
    } catch (error) {
      console.log('fecth ALl User fail', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    if (
      !data.firstname ||
      !data.lastname ||
      !data.username ||
      !data.password ||
      !data.confirmpassword ||
      !(data.password === data.confirmpassword)
    ) {
      setAlertStatus('warning');
      setField(true);
      setMsg('Vui long dien day du thong tin. Hoac mat khau khong trung');
      console.log('Form Dang ki chua dung can xem lai');
    } else {
      if (userAll.find((user) => user.username === data.username)) {
        setField(true);
        setAlertStatus('danger');
        setMsg('user da ton tai vui long lay ten khac');
      } else {
        const userInfo = {
          id: `${Date.now()}`,
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          password: data.password,
        };
        dispatch({
          type: actionType.SET_USER,
          user: userInfo,
        });
        saveUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setField(true);
        setAlertStatus('success');
        setMsg('Dang ki thanh cong');
        setTimeout(() => {
          showModal();
        }, 1000);
      }
    }
    setTimeout(() => {
      setField(false);
    }, 3000);
  };

  const handleLogin = () => {
    console.log(data);
    const isUser = userAll.find((user) => user.username === data.username);
    if (isUser) {
      if (isUser.password === data.password) {
        dispatch({
          type: actionType.SET_USER,
          user: isUser,
        });
        setField(true);
        setMsg('dang nhap thanh cong');
        setAlertStatus('success');
        console.log('dang nhap thanh cong');
        setTimeout(() => {
          showModal();
        }, 1000);
      } else {
        setField(true);
        setMsg('mat khau ko dung xin nhap lai');
        setAlertStatus('warning');
        console.log('mat khau ko dung xin nhap lai');
      }
    } else {
      setField(true);
      setMsg('user not found');
      setAlertStatus('danger');
      console.log('user ko ton tai');
    }
    setTimeout(() => {
      setField(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      className="absolute flex items-center justify-center w-screen h-screen  bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 top-0 left-0   md:p-2
	 transition-all duration-100 ease-in-out"
    >
      {field && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className={`absolute z-10 top-2 right-5 p-1 px-4 text-xs rounded-lg text-white 
        ${
          alertStatus === 'danger'
            ? 'bg-red-500'
            : alertStatus === 'success'
            ? 'bg-green-500'
            : 'bg-orange-400'
        }`}
        >
          {msg}
        </motion.div>
      )}
      {!isSignUp ? (
        //login
        <div className=" relative w-screen h-screen md:w-[400px] md:h-auto bg-slate-100 md:rounded-lg p-8 px-10 flex flex-col items-center justify-center gap-5 text-headingColor">
          <div
            className="absolute top-0 right-0 flex items-center justify-center p-1 text-textColor hover:text-black cursor-pointer"
            onClick={showModal}
          >
            <MdClose className="text-xl" />
          </div>
          <div className="flex flex-col items-center">
            <img src={Logo} alt="logo" className="w-10 h-10" />
            <p className="font-semibold text-headingColor text-2xl">Login</p>
          </div>
          <form className="w-full flex flex-col gap-3">
            <div className="flex gap-2 justify-center items-center text-sm font-light p-2  bg-slate-50 rounded-md">
              <RiUserShared2Line />
              <div className="h-5 w-[1px] bg-gray-400"></div>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="bg-transparent border-none outline-none text-black  w-full "
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center items-center gap-2 text-sm font-light p-2 bg-slate-50 rounded-md">
              <RiLockPasswordLine />
              <div className="h-5 w-[1px] bg-gray-400"></div>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="bg-transparent border-none outline-none text-black w-full"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="text-xs">
                Do not have an account. Please{' '}
                <span
                  className="text-sm text-orange-400 cursor-pointer underline"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  sign up
                </span>
              </p>
            </div>
          </form>
          <div className="w-full flex justify-end items-center">
            <button
              className="p-1 px-10 rounded-full text-gray-50 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md hover:drop-shadow-lg hover:text-white"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center mt-2">
            <p className="text-xs">Or sign up using</p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="p-1 px-2 border border-spacing-0 rounded-2xl bg-slate-100 text-orange-400 cursor-pointer drop-shadow-sm hover:drop-shadow-lg"
                onClick={loginGoogle}
              >
                Google Login
              </div>
              <div
                className="p-1 px-2 border border-spacing-0 rounded-2xl bg-slate-100 text-blue-400 cursor-pointer drop-shadow-sm hover:drop-shadow-lg"
                onClick={loginFacebook}
              >
                Facebook Login
              </div>
            </div>
          </div>
        </div>
      ) : (
        //singUp
        <div className=" relative w-screen h-screen md:w-[500px] md:h-auto bg-slate-100 md:rounded-lg p-8 px-10 flex flex-col items-center justify-center gap-5 text-headingColor">
          <div
            className="absolute top-0 right-0 flex items-center justify-center p-1 text-textColor hover:text-black cursor-pointer"
            onClick={showModal}
          >
            <MdClose className="text-xl" />
          </div>
          <div className="flex flex-col items-center">
            <img src={Logo} alt="logo" className="w-10 h-10" />
            <p className="font-semibold text-headingColor text-2xl">Sign Up</p>
          </div>
          <form className="w-full flex flex-col gap-3">
            {/* firstName and LastName */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
              <div className="flex w-full gap-2 justify-center items-center text-sm font-light p-2  bg-slate-50 rounded-md">
                <RiUserShared2Line />
                <div className="h-5 w-[1px] bg-gray-400"></div>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="first Name"
                  className="bg-transparent border-none outline-none text-black  w-full "
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-full gap-2 justify-center items-center text-sm font-light p-2  bg-slate-50 rounded-md">
                <RiUserShared2Line />
                <div className="h-5 w-[1px] bg-gray-400"></div>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="last Name"
                  className="bg-transparent border-none outline-none text-black  w-full "
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* userName */}
            <div className="flex gap-2 justify-center items-center text-sm font-light p-2  bg-slate-50 rounded-md">
              <RiUserShared2Line />
              <div className="h-5 w-[1px] bg-gray-400"></div>
              <input
                id="username"
                name="username"
                type="email"
                placeholder="username"
                className="bg-transparent border-none outline-none text-black  w-full "
                onChange={handleChange}
              />
            </div>
            {/* Password and confirmPAssword */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
              <div className="flex w-full justify-center items-center gap-2 text-sm font-light p-2 bg-slate-50 rounded-md">
                <RiLockPasswordLine />
                <div className="h-5 w-[1px] bg-gray-400"></div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  className="bg-transparent border-none outline-none text-black w-full"
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-full justify-center items-center gap-2 text-sm font-light p-2 bg-slate-50 rounded-md">
                <RiLockPasswordLine />
                <div className="h-5 w-[1px] bg-gray-400"></div>
                <input
                  id="confirmpassword"
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm password"
                  className="bg-transparent border-none outline-none text-black w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-xs">
                Do not have an account. Please{' '}
                <span
                  className="text-sm text-orange-400 cursor-pointer underline"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
          <div className="w-full flex justify-end items-center">
            <button
              className="p-1 px-10 w-full md:w-auto rounded-full text-gray-50 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md hover:drop-shadow-lg hover:text-white"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center mt-2">
            <p className="text-xs">Or sign up using</p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="p-1 px-2 border border-spacing-0 rounded-2xl bg-slate-100 text-orange-400 cursor-pointer drop-shadow-sm hover:drop-shadow-lg"
                onClick={loginGoogle}
              >
                Google Login
              </div>
              <div
                className="p-1 px-2 border border-spacing-0 rounded-2xl bg-slate-100 text-blue-400 cursor-pointer drop-shadow-sm hover:drop-shadow-lg"
                onClick={loginFacebook}
              >
                Facebook Login
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Login;
