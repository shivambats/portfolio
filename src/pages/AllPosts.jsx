import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchAllPosts } from '../utils/contentLoader';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  const location = useLocation();
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postData = await fetchAllPosts();
        setPosts(postData);
      } catch (error) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);
  
  // Extract filters from URL parameters if present
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tagFromUrl = urlParams.get('tag');
    const typeFromUrl = urlParams.get('type');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
    if (typeFromUrl) {
      setSelectedType(typeFromUrl);
    }
  }, [location.search]);
  
  // Get all unique tags and types from posts
  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const allTypes = useMemo(() => {
    const types = new Set();
    posts.forEach(post => {
      if (post.type) types.add(post.type);
    });
    return Array.from(types).sort();
  }, [posts]);
  
  // Filter posts based on selected filters
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    if (selectedType) {
      filtered = filtered.filter(post => post.type === selectedType);
    }
    
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags?.includes(selectedTag));
    }
    
    return filtered;
  }, [posts, selectedType, selectedTag]);
  
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
  
  const handleTagClick = (tag) => {
    const newTag = tag === selectedTag ? '' : tag;
    setSelectedTag(newTag);
    updateURL(newTag, selectedType);
  };

  const handleTypeClick = (type) => {
    const newType = type === selectedType ? '' : type;
    setSelectedType(newType);
    updateURL(selectedTag, newType);
  };
  
  const updateURL = (tag, type) => {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (type) params.set('type', type);
    
    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  };
  
  const clearFilters = () => {
    setSelectedTag('');
    setSelectedType('');
    window.history.pushState({}, '', window.location.pathname);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div className="loading">Loading posts...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container">
        <header className="page-header">
          <Link to="/" className="back-link">← Home</Link>
          <h1>All Posts ({filteredPosts.length})</h1>
        </header>
        
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-header">
            <h3>Filters</h3>
            {(selectedTag || selectedType) && (
              <button onClick={clearFilters} className="clear-filter">
                Clear Filters
              </button>
            )}
          </div>
          
          {/* Type Filters */}
          <div className="filter-group">
            <h4>Post Type</h4>
            <div className="tag-filters">
              {allTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeClick(type)}
                  className={`tag-filter ${selectedType === type ? 'active' : ''}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tag Filters */}
          <div className="filter-group">
            <h4>Tags</h4>
            <div className="tag-filters">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`tag-filter ${selectedTag === tag ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {(selectedTag || selectedType) && (
            <div className="active-filter">
              Showing posts for: 
              {selectedType && <strong> {selectedType}</strong>}
              {selectedType && selectedTag && <span> • </span>}
              {selectedTag && <strong> {selectedTag}</strong>}
            </div>
          )}
        </div>
        
        {/* Posts Grid */}
        {sortedPosts.length === 0 ? (
          <div className="no-results">
            {selectedTag || selectedType ? 
              'No posts found for the selected filters. Try different filters.' : 
              'No posts available.'
            }
          </div>
        ) : (
          <div className="case-studies-list">
            {sortedPosts.map((post) => (
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
                      <span className="case-study-tags">{post.tags?.join(' • ')}</span>
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
          </div>
        )}
      </div>
    </Layout>
  );
} 