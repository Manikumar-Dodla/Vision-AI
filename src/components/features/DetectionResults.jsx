import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const DetectionResults = ({ image, results = [] }) => {
  // Generate random colors for bounding boxes
  const getRandomColor = (index) => {
    const colors = [
      'rgba(59, 130, 246, 0.5)', // primary
      'rgba(139, 92, 246, 0.5)',  // secondary
      'rgba(16, 185, 129, 0.5)',  // success
      'rgba(245, 158, 11, 0.5)',  // warning
      'rgba(239, 68, 68, 0.5)',   // error
    ];
    return colors[index % colors.length];
  };

  // Function to draw bounding boxes
  const drawBoundingBox = (result, index) => {
    const { box, label, confidence } = result;
    const { x, y, width, height } = box;
    
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: `${width}%`,
          height: `${height}%`,
          border: `2px solid ${getRandomColor(index)}`,
          backgroundColor: `${getRandomColor(index)}`,
          borderRadius: '4px',
          pointerEvents: 'none',
        }}
      >
        <div 
          className="absolute top-0 left-0 transform -translate-y-full bg-dark-700 px-2 py-1 rounded-t-md text-xs font-medium whitespace-nowrap"
          style={{ backgroundColor: getRandomColor(index).replace('0.5', '0.9') }}
        >
          {label} ({Math.round(confidence * 100)}%)
        </div>
      </motion.div>
    );
  };

  if (!results.length) return null;

  return (
    <Card animate>
      <h3 className="text-lg font-medium text-gray-200 mb-3">Detection Results</h3>
      
      <div className="relative mb-4 rounded-lg overflow-hidden" style={{ maxHeight: '500px' }}>
        <img src={image} alt="Analyzed" className="w-full object-contain" />
        {results.map((result, index) => drawBoundingBox(result, index))}
      </div>
      
      <div className="space-y-2 mt-4">
        <h4 className="text-gray-300 font-medium">Detected Objects</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="bg-dark-700 p-3 rounded-md border border-dark-500"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-200">{result.label}</span>
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: getRandomColor(index).replace('0.5', '0.2') }}
                >
                  {Math.round(result.confidence * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DetectionResults;