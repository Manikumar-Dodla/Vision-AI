import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import TopNavbar from './components/layout/TopNavbar';
import LeftSidebar from './components/layout/LeftSidebar';
import MainPanel from './components/layout/MainPanel';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// App Layout
const AppLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : 'light'}`}>
      <LeftSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainPanel isSidebarOpen={isSidebarOpen}>
        <TopNavbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        {children}
      </MainPanel>
    </div>
  );
};

// App Component
function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Public routes */}
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />

          <Route
            path="/upload"
            element={
              <AppLayout>
                <Upload />
              </AppLayout>
            }
          />

          {/* Protected routes */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-4">
                    <h1 className="text-2xl font-bold text-white mb-4">History Page</h1>
                    <p className="text-gray-300">View your past detection sessions here.</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/assistant"
            element={
              <AppLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold text-white mb-4">AI Assistant</h1>
                  <p className="text-gray-300">Chat with our AI assistant to analyze your images.</p>
                </div>
              </AppLayout>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
