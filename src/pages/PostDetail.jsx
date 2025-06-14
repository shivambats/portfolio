import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';
import { CaseStudySkeleton } from '../components/SkeletonLoader';
import { fetchPost } from '../utils/contentLoader';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPost(id);
        setPost(postData);
      } catch (error) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadPost();
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
          <CaseStudySkeleton />
        </div>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout>
        <div className="container">
          <div className="error">Post not found</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container">
        <header className="page-header">
          <Link to="/" className="back-link">← Home</Link>
          <div className="post-type-badge">
            <span className={`type-badge ${post.type.toLowerCase().replace(' ', '-')}`}>
              {post.type}
            </span>
          </div>
          <h1>{post.title}</h1>
          <div className="post-meta">
            {post.type === 'Blog' ? (
              <span className="post-date">{formatDate(post.date)}</span>
            ) : (
              <span className="post-year">{post.year}</span>
            )}
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="separator"> | </span>
                <span className="post-tags">{post.tags.join(' • ')}</span>
              </>
            )}
          </div>
        </header>
        
        {post.image && (
          <div className="post-featured-image">
            <img src={post.image} alt={post.title} />
          </div>
        )}
        
        <div className="post-content">
          <ReactMarkdown className="markdown-content">
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
} 