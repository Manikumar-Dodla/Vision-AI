import React from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const ChatMessage = ({ message, isUser, timestamp }) => {
  const formattedTime = format(new Date(timestamp || Date.now()), 'h:mm a');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div 
          className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${isUser ? 'ml-2 bg-primary-600' : 'mr-2 bg-secondary-600'}
          `}
        >
          {isUser ? <FaUser className="text-white text-xs" /> : <FaRobot className="text-white text-xs" />}
        </div>
        
        {/* Message bubble */}
        <div
          className={`
            py-3 px-4 rounded-xl 
            ${isUser 
              ? 'bg-primary-600 text-white rounded-tr-none' 
              : 'bg-dark-600 border border-dark-500 text-gray-200 rounded-tl-none'
            }
          `}
        >
          <div className="text-sm">
            {message}
          </div>
          <div className={`text-xs ${isUser ? 'text-primary-200' : 'text-gray-400'} mt-1`}>
            {formattedTime}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;