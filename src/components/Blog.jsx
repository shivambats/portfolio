import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBlogs } from '../utils/contentLoader';

// Mock data for blogs
const mockBlogs = [
  { 
    id: 'blog1', 
    title: 'Making a design system from scratch',
    date: '12 Feb 2020',
    tags: ['Design', 'Pattern'],
    excerpt: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  },
  { 
    id: 'blog2', 
    title: 'Creating pixel perfect icons in Figma',
    date: '12 Feb 2020',
    tags: ['Figma', 'Icon Design'],
    excerpt: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  },
  // Add more mock blog entries as needed
];

export default function Blog({ limit }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogData = await fetchAllBlogs();
        setBlogs(blogData);
      } catch (error) {
        console.error('Error loading blogs:', error);
        // Fallback to empty array if fetch fails
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogs();
  }, []);
  
  // Sort blogs in reverse chronological order (newest first)
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }, [blogs]);
  
  // If limit is provided, only show that many blogs
  const displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs;
  
  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }
  
  return (
    <section className="section blog-section">
      <div className="section-header">
        <h2>Recent posts</h2>
        {limit && blogs.length > limit && (
          <Link to="/blogs" className="view-all">View all</Link>
        )}
      </div>
      
      <div className="blog-grid">
        {displayedBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h3 className="blog-title">{blog.title}</h3>
            <div className="blog-meta">
              <span className="blog-date">{blog.date}</span>
              <span className="separator">|</span>
              <span className="blog-tags">{blog.tags.join(', ')}</span>
            </div>
            <p className="blog-excerpt">{blog.excerpt}</p>
            <Link to={`/blog/${blog.id}`} className="read-more">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
} 