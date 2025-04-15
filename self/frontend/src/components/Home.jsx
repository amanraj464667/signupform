import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    toast.success('User logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full opacity-20"></div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2 z-10 relative">
          Welcome, {loggedInUser} 👋
        </h1>
        <p className="text-lg text-gray-600 mb-6 z-10 relative">
          You're successfully logged in. Have a great day!
        </p>

        <img
          src="https://illustrations.popsy.co/white/web-design.svg"
          alt="hero"
          className="w-64 mx-auto mb-6 z-10 relative"
        />

        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition duration-300 z-10 relative"
        >
          Logout
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
