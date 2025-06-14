import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchAllCaseStudies } from '../utils/contentLoader';

export default function AllCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('');
  
  const location = useLocation();
  
  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        const caseStudyData = await fetchAllCaseStudies();
        setCaseStudies(caseStudyData);
      } catch (error) {
        console.error('Error loading case studies:', error);
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadCaseStudies();
  }, []);
  
  // Extract tag from URL parameters if present
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tagFromUrl = urlParams.get('tag');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
  }, [location.search]);
  
  // Get all unique tags from case studies
  const allTags = useMemo(() => {
    const tags = new Set();
    caseStudies.forEach(study => {
      study.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [caseStudies]);
  
  // Filter case studies based on selected tag
  const filteredCaseStudies = useMemo(() => {
    if (!selectedTag) return caseStudies;
    return caseStudies.filter(study => 
      study.tags?.includes(selectedTag)
    );
  }, [caseStudies, selectedTag]);
  
  // Sort case studies by year (newest first)
  const sortedCaseStudies = useMemo(() => {
    return [...filteredCaseStudies].sort((a, b) => b.year - a.year);
  }, [filteredCaseStudies]);
  
  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    // Update URL without page reload
    const newUrl = tag && tag !== selectedTag 
      ? `${window.location.pathname}?tag=${encodeURIComponent(tag)}`
      : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  };
  
  const clearFilter = () => {
    setSelectedTag('');
    window.history.pushState({}, '', window.location.pathname);
  };
  
  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading case studies...</div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <header className="page-header">
        <Link to="/" className="back-link">← Home</Link>
        <h1>Case Studies ({filteredCaseStudies.length})</h1>
      </header>
      
      {/* Tag Filter Section */}
      <div className="filter-section">
        <div className="filter-header">
          <h3>Filter by Domain</h3>
          {selectedTag && (
            <button onClick={clearFilter} className="clear-filter">
              Clear Filter
            </button>
          )}
        </div>
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
        {selectedTag && (
          <div className="active-filter">
            Showing case studies for: <strong>{selectedTag}</strong>
          </div>
        )}
      </div>
      
      {/* Case Studies Grid */}
      {sortedCaseStudies.length === 0 ? (
        <div className="no-results">
          {selectedTag ? 
            `No case studies found for "${selectedTag}". Try a different filter.` : 
            'No case studies available.'
          }
        </div>
      ) : (
        <div className="case-studies-list">
          {sortedCaseStudies.map((study) => (
            <Link to={`/case-study/${study.id}`} key={study.id} className="case-study-link">
              <div className="case-study-card">
                <div className="case-study-image">
                  <img src={study.image} alt={study.title} />
                </div>
                <div className="case-study-content">
                  <h3 className="case-study-title">{study.title}</h3>
                  <div className="case-study-meta">
                    <span className="case-study-year">{study.year}</span>
                    <span className="case-study-tags">{study.tags?.join(' • ')}</span>
                  </div>
                  <p className="case-study-excerpt">{study.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 