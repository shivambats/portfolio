import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllCaseStudies } from '../utils/contentLoader';

export default function CaseStudies({ limit }) {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        const caseStudyData = await fetchAllCaseStudies();
        setCaseStudies(caseStudyData);
      } catch (error) {
        console.error('Error loading case studies:', error);
        // Fallback to empty array if fetch fails
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadCaseStudies();
  }, []);
  
  // Sort case studies by year (newest first)
  const sortedCaseStudies = useMemo(() => {
    return [...caseStudies].sort((a, b) => {
      return b.year - a.year;
    });
  }, [caseStudies]);
  
  // If limit is provided, only show that many case studies
  const displayedCaseStudies = limit ? sortedCaseStudies.slice(0, limit) : sortedCaseStudies;
  
  if (loading) {
    return <div className="loading">Loading case studies...</div>;
  }
  
  return (
    <section className="section case-studies-section">
      <div className="section-header">
        <h2>Case Studies</h2>
        {limit && caseStudies.length > limit && (
          <Link to="/case-studies" className="view-all">View all</Link>
        )}
      </div>
      
      <div className="case-studies-list">
        {displayedCaseStudies.map((study) => (
          <Link to={`/case-study/${study.id}`} key={study.id} className="case-study-link">
            <div className="case-study-card">
              <div className="case-study-image">
                <img src={study.image} alt={study.title} />
              </div>
              <div className="case-study-content">
                <h3 className="case-study-title">{study.title}</h3>
                <div className="case-study-meta">
                  <span className="case-study-year">{study.year}</span>
                  <span className="case-study-tags">{study.tags.join(' • ')}</span>
                </div>
                <p className="case-study-excerpt">{study.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 