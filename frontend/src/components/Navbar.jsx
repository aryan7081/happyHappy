import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import config from '../config'

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const handleAuthClick = async () => {
    if (isAuthenticated) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${user.token}`);
      const payload = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };
      const response = await fetch(`${config.apiBaseUrl}/api/logout/`, payload);
      const data = await response.json();
      if (response.ok) {
        logout();
        navigate("/");
      }
      console.log("done", data);
      return;
    }
    navigate("/register");
  };

  return (
    <div className='flex justify-between items-center px-6 sm:px-12 py-6 fixed top-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-md shadow-md z-50 text-white'>
      
      {/* Logo */}
      <div
        className="text-2xl sm:text-3xl font-extrabold text-violet-400 hover:text-violet-300 transition-all duration-300 cursor-pointer"
        onClick={() => navigate('/')}
      >
        COREFIT
      </div>

      {/* Auth Button */}
      <div
        onClick={handleAuthClick}
        className=' text-sm sm:text-base font-light text-gray-200 hover:text-yellow-300 transition-colors duration-200 cursor-pointer'
      >
        {isAuthenticated ? "Logout" : "Register"}
      </div>
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50"></div> */}
    </div>
  );
};

export default Navbar;
