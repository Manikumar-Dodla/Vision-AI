import React from 'react';
import { motion } from 'framer-motion';

const MainPanel = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="lg:ml-64 mt-16 min-h-[calc(100vh-64px)] bg-dark-800 p-4 sm:p-6 animate-fadeIn"
    >
      <div className="max-w-screen-lg mx-auto">
        {children}
      </div>
    </motion.main>
  );
};

export default MainPanel;