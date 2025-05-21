import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaImage, FaBrain, FaHistory } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const FeatureCard = ({ title, description, icon, to }) => (
  <Link to={to}>
    <Card className="h-full hover-scale" hover>
      <div className="flex flex-col items-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-dark-500 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-200 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </Card>
  </Link>
);

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="pb-20">
      {/* Hero section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-dark-700 to-dark-800 rounded-xl p-8 mb-8 text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text mb-4">
          Object Detection + AI Assistant
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Upload images for intelligent object detection and interact with an AI assistant to analyze the results.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/upload">
            <Button variant="primary" size="lg" icon={<FaImage />}>
              Upload Image
            </Button>
          </Link>
          
          {user ? (
            <Link to="/history">
              <Button variant="outline" size="lg" icon={<FaHistory />}>
                View History
              </Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button variant="outline" size="lg">
                Sign Up Free
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
      
      {/* Features section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-200 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Object Detection"
            description="Upload images and get precise object detection with bounding boxes and labels."
            icon={<FaImage className="text-primary-500 text-3xl" />}
            to="/upload"
          />
          
          <FeatureCard
            title="AI Assistant"
            description="Chat with our AI assistant powered by LangChain and LLM's to analyze image results."
            icon={<FaBrain className="text-secondary-500 text-3xl" />}
            to="/assistant"
          />
          
          <FeatureCard
            title="Session History"
            description="Access your previous detection sessions and continue your work."
            icon={<FaHistory className="text-success-500 text-3xl" />}
            to="/history"
          />
        </div>
      </section>
      
      {/* How it works section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-200 mb-6">How It Works</h2>
        <div className="bg-dark-700 p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-900 flex items-center justify-center mb-4 text-xl font-bold text-primary-300">1</div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">Upload Image</h3>
              <p className="text-gray-400">Upload any image you want to analyze for object detection.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-secondary-900 flex items-center justify-center mb-4 text-xl font-bold text-secondary-300">2</div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">AI Processing</h3>
              <p className="text-gray-400">Our system analyzes the image and identifies objects with high precision.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-success-900 flex items-center justify-center mb-4 text-xl font-bold text-success-300">3</div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">Interactive Results</h3>
              <p className="text-gray-400">View detailed results and chat with our AI to understand the findings.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      {!user && (
        <section>
          <div className="bg-gradient-to-r from-primary-900 to-secondary-900 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              Create a free account to unlock all features and save your detection history.
            </p>
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;