import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaMoon, FaSun, FaUser, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const TopNavbar = ({ toggleTheme, isDarkMode = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-dark-700 border-b border-dark-600 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center ml-8 lg:ml-0">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-md flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-lg font-bold">V</span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text hidden sm:block">
                Vision AI
              </span>
            </Link>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="rounded-full p-2"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-400" />}
            </Button>

            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link to="/profile">
                  <div className="flex items-center space-x-2 text-gray-300 hover:text-white">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <span className="hidden md:block">{user.username}</span>
                  </div>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white"
                  icon={<FaSignOutAlt />}
                >
                  <span className="hidden md:block">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <span className="hidden sm:block">Login</span>
                    <FaUser className="sm:hidden" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    <span className="hidden sm:block">Register</span>
                    <FaUserPlus className="sm:hidden" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;