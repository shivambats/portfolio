import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from '../utils/contentLoader';

export default function Posts({ limit, type }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postData = await fetchAllPosts();
        setPosts(postData);
      } catch (error) {
        // Fallback to empty array if fetch fails
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);
  
  // Filter posts by type if specified
  const filteredPosts = useMemo(() => {
    if (type) {
      return posts.filter(post => post.type === type);
    }
    return posts;
  }, [posts, type]);
  
  // Sort posts by year/date (newest first)
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      // For case studies, sort by year; for blogs, sort by date
      if (a.type === 'Case Study' && b.type === 'Case Study') {
        return b.year - a.year;
      }
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      if (a.year && b.year) {
        return b.year - a.year;
      }
      return 0;
    });
  }, [filteredPosts]);
  
  // Determine how many to display
  const getDisplayedPosts = () => {
    if (limit) {
      // When there's a limit, show up to 4 cards to go with the "View all" button (5 total items)
      if (!showAll) {
        return sortedPosts.slice(0, Math.min(4, sortedPosts.length));
      }
      // When showing all, return all posts
      return sortedPosts;
    }
    
    if (posts.length > 4 && !showAll) {
      return sortedPosts.slice(0, 4);
    }
    
    return sortedPosts;
  };
  
  const displayedPosts = getDisplayedPosts();
  const hasMoreThan4 = posts.length > 4;
  const shouldShowViewAllButton = limit && !showAll; // Always show when there's a limit and not showing all
  
  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }
  
  return (
    <section className="section case-studies-section">
      <div className={`section-header ${limit || posts.length <= 4 ? 'centered' : ''}`}>
        <h2>Posts ({filteredPosts.length})</h2>
        {!limit && posts.length > 4 && (
          <Link to="/posts" className="view-all">View all</Link>
        )}
      </div>
      
      {filteredPosts.length === 0 ? (
        <div>No posts found. Check console for errors.</div>
      ) : (
        <>
          <div className={`case-studies-list ${limit ? 'four-column-layout' : ''}`}>
            {displayedPosts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id} className="case-study-link">
                <div className="case-study-card">
                  <div className="case-study-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="case-study-content">
                    <h3 className="case-study-title">{post.title}</h3>
                    <div className="case-study-meta">
                      <span className="case-study-year">
                        {post.type === 'Blog' ? new Date(post.date).getFullYear() : post.year}
                      </span>
                      <span className="case-study-tags">{post.tags.join(' • ')}</span>
                    </div>
                    <p className="case-study-excerpt">{post.excerpt}</p>
                    <div className="post-type-badge">
                      <span className={`type-badge ${post.type.toLowerCase().replace(' ', '-')}`}>
                        {post.type}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            {shouldShowViewAllButton && (
              <Link to="/posts" className="view-all-arrow-card">
                <div className="arrow-content">
                  <span className="arrow-icon">→</span>
                  <span className="view-all-text">View all posts</span>
                </div>
              </Link>
            )}
          </div>
          
          {showAll && hasMoreThan4 && (
            <div className="show-less-container">
              <button 
                className="show-less-btn"
                onClick={() => setShowAll(false)}
              >
                Show less
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
} 