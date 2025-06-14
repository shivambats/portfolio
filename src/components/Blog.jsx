import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBlogs } from '../utils/contentLoader';

export default function Blog({ limit }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogData = await fetchAllBlogs();
        setBlogs(blogData);
      } catch (error) {
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
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  }, [blogs]);
  
  // Helper function to format date
  const formatDate = (dateValue) => {
    if (!dateValue) return '';
    
    // If it's already a string, return it
    if (typeof dateValue === 'string') return dateValue;
    
    // If it's a Date object, format it
    if (dateValue instanceof Date) {
      return dateValue.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
    
    // Try to parse it as a date
    try {
      const date = new Date(dateValue);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return String(dateValue);
    }
  };
  
  // If limit is provided, only show that many blogs
  const displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs;
  
  if (loading) {
    return <div className="loading">Loading recent posts...</div>;
  }
  
  return (
    <section className="section blog-section">
      <div className="section-header">
        <h2>Recent posts</h2>
        {limit && blogs.length > limit && (
          <Link to="/blogs" className="view-all">View all</Link>
        )}
      </div>
      
      {blogs.length === 0 ? (
        <div>No recent posts found. Check console for errors.</div>
      ) : (
        <div className="blog-grid">
          {displayedBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              {blog.image && (
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                </div>
              )}
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <div className="blog-meta">
                  <span className="blog-date">{formatDate(blog.date)}</span>
                  <span className="separator">|</span>
                  <span className="blog-tags">{blog.tags.join(', ')}</span>
                </div>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <Link to={`/blog/${blog.id}`} className="read-more">
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 