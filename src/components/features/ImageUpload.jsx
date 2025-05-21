import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FaUpload, FaImage, FaSpinner } from 'react-icons/fa';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ImageUpload = ({ onImageUpload, loading = false }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setError('');
    
    // Check if there is at least one file
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (jpg, png, etc.)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    
    // Pass the file to parent component
    onImageUpload(file);
    
    // Clean up the preview URL when it's no longer needed
    return () => URL.revokeObjectURL(previewUrl);
  }, [onImageUpload]);
  
  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject 
  } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-dark-500">
        <h3 className="text-lg font-medium text-gray-200">Upload Image</h3>
        <p className="text-sm text-gray-400">Upload an image for object detection</p>
      </div>
      
      <div 
        {...getRootProps()} 
        className={`
          p-6 flex flex-col items-center justify-center cursor-pointer transition-all-medium
          ${isDragActive ? 'bg-dark-500' : 'bg-dark-600'}
          ${isDragAccept ? 'border-success-500' : ''}
          ${isDragReject || error ? 'border-error-500' : ''}
          ${preview ? 'p-4' : 'p-10 border-2 border-dashed border-dark-400 m-4 rounded-lg'}
        `}
      >
        <input {...getInputProps()} />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center p-6">
            <FaSpinner className="animate-spin text-3xl text-primary-500 mb-4" />
            <p className="text-gray-300">Processing image...</p>
          </div>
        ) : preview ? (
          <div className="w-full max-h-96 overflow-hidden rounded-lg relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
              <Button 
                variant="primary" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                }}
              >
                Choose Another Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 mx-auto rounded-full bg-dark-500 flex items-center justify-center mb-4"
            >
              {isDragActive ? (
                <FaUpload className="text-primary-400 text-2xl" />
              ) : (
                <FaImage className="text-gray-400 text-2xl" />
              )}
            </motion.div>
            
            <p className="text-lg text-gray-300 mb-2">
              {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
            </p>
            <p className="text-sm text-gray-400 mb-4">or click to browse files</p>
            
            {error && (
              <p className="text-error-500 text-sm mt-2">{error}</p>
            )}
            
            <div className="text-xs text-gray-500 mt-4">
              Supported formats: JPEG, PNG, GIF, WebP (max 5MB)
            </div>
          </div>
        )}
      </div>
      
      {preview && (
        <div className="p-4 border-t border-dark-500 bg-dark-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Ready for processing</span>
            <Button 
              variant="primary" 
              size="sm" 
              disabled={loading}
              isLoading={loading}
            >
              {loading ? 'Processing...' : 'Process Image'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageUpload;