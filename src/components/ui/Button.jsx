import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
  success: 'bg-success-600 hover:bg-success-700 text-white',
  warning: 'bg-warning-600 hover:bg-warning-700 text-white',
  error: 'bg-error-600 hover:bg-error-700 text-white',
  ghost: 'bg-transparent hover:bg-dark-600 text-gray-200',
  outline: 'bg-transparent border border-dark-400 hover:border-primary-600 text-gray-200',
  link: 'bg-transparent text-primary-400 hover:text-primary-300 p-0 h-auto',
};

const sizes = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-2.5',
  xl: 'text-xl px-6 py-3',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  return (
    <motion.button
      type={type}
      className={`
        rounded-md font-medium transition-all-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
        ${variants[variant]} 
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {icon && !isLoading && <span>{icon}</span>}
        {children}
      </div>
    </motion.button>
  );
};

export default Button;