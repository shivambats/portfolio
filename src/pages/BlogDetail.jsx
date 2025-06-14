import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';
import { BlogSkeleton } from '../components/SkeletonLoader';
import { fetchBlog } from '../utils/contentLoader';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blogData = await fetchBlog(id);
        setBlog(blogData);
      } catch (error) {
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlog();
  }, [id]);

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
  
  if (loading) {
    return (
      <Layout>
        <div className="container">
          <BlogSkeleton />
        </div>
      </Layout>
    );
  }
  
  if (!blog) {
    return (
      <Layout>
        <div className="container">
          <div className="error">Blog post not found</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container">
        <article className="blog-detail">
          <header className="blog-header">
            <Link to="/blogs" className="back-link">← Back to blogs</Link>
            <h1>{blog.title}</h1>
            <div className="blog-meta">
              <span className="blog-date">{formatDate(blog.date)}</span>
              <span className="separator">|</span>
              <span className="blog-tags">{blog.tags.join(', ')}</span>
            </div>
          </header>
          
          <div className="blog-content markdown-content">
            <ReactMarkdown>
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </Layout>
  );
} 