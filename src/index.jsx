import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './styles.css';

// Import the App component normally since it's the initial load
import App from './App';

// Lazy load other components
const PostDetail = lazy(() => import('./pages/PostDetail'));
const AllPosts = lazy(() => import('./pages/AllPosts'));
const ContactPage = lazy(() => import('./pages/Contact'));

// Legacy components for backward compatibility
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const AllBlogs = lazy(() => import('./pages/AllBlogs'));
const AllCaseStudies = lazy(() => import('./pages/AllCaseStudies'));

// Create a loading component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            
            {/* New unified routes */}
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/posts" element={<AllPosts />} />
            
            {/* Legacy routes for backward compatibility */}
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/case-study/:id" element={<CaseStudyDetail />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/case-studies" element={<AllCaseStudies />} />
            
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

// At the bottom of your index.jsx file
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
} 