import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  onClick, 
  hover = false,
  animate = false,
  ...props 
}) => {
  const cardProps = {
    className: `
      bg-dark-600 rounded-lg border border-dark-500
      p-4 shadow-md ${className}
      ${hover ? 'hover-scale' : ''}
      ${onClick ? 'cursor-pointer' : ''}
    `,
    onClick,
    ...props
  };

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...cardProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div {...cardProps}>
      {children}
    </div>
  );
};

export default Card;