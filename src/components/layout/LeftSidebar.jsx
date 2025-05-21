import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaHistory, FaImage, FaHome, FaBrain, FaBars, FaTimes } from 'react-icons/fa';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', icon: <FaHome />, label: 'Home' },
    { to: '/assistant', icon: <FaBrain />, label: 'AI Assistant' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <button className="toggle-button" onClick={togglePanel}>
        {isOpen ? '<' : '>'}
      </button>

      <div className={`side-panel ${isOpen ? 'open' : 'collapsed'}`}>
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-dark-600 text-gray-200 hover:bg-dark-500"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`
            fixed left-0 top-16 bottom-0 w-64 bg-dark-700 border-r border-dark-600 z-40
            transform transition-transform duration-300 ease-in-out
            lg:translate-x-0
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="p-4">
            {/* User profile section */}
            {user && (
              <div className="mb-6 pb-4 border-b border-dark-500">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user.username ? user.username[0].toUpperCase() : user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium">{user.username}</p>
                  </div>
                </div>
              </div>
            )}

            {/* New Session button */}
            <Link to="/new-session" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="primary" 
                fullWidth 
                icon={<FaPlus />}
                className="mb-6"
              >
                New Session
              </Button>
            </Link>

            {/* Navigation items */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link 
                  to={item.to} 
                  key={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`
                      flex items-center space-x-3 px-3 py-2.5 rounded-md
                      ${location.pathname === item.to ? 'bg-primary-900/50 text-primary-400' : 'text-gray-300 hover:bg-dark-600'}
                      transition-all-medium
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    {location.pathname === item.to && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="w-1.5 h-5 bg-primary-500 absolute left-0 rounded-r-md"
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Recent sessions */}
            <div className="mt-8">
              <h3 className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-3">
                Recent Sessions
              </h3>
              <div className="space-y-1">
                <div className="text-gray-500 text-sm italic p-2">
                  {user ? "No recent sessions" : "Please login to view sessions"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default LeftSidebar;