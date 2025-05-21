import React from 'react';

const Input = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  error,
  className = '',
  fullWidth = false,
  required = false,
  disabled = false,
  autoComplete = "off",
  ...props
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-gray-200"
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`
          w-full px-4 py-2.5 text-base
          bg-dark-600 border border-dark-400
          text-gray-200 placeholder-gray-400
          rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          transition-all-medium
          ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error-500">{error}</p>
      )}
    </div>
  );
};

export default Input;