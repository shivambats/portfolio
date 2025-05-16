import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';
import { CaseStudySkeleton } from '../components/SkeletonLoader';
import { fetchCaseStudy } from '../utils/contentLoader';

export default function CaseStudyDetail() {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        const caseStudyData = await fetchCaseStudy(id);
        setCaseStudy(caseStudyData);
      } catch (error) {
        console.error(`Error loading case study ${id}:`, error);
        setCaseStudy(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadCaseStudy();
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container">
          <CaseStudySkeleton />
        </div>
      </Layout>
    );
  }
  
  if (!caseStudy) {
    return (
      <Layout>
        <div className="container">
          <div className="error">Case study not found</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container">
        <article className="case-study-detail">
          <header className="case-study-header">
            <Link to="/case-studies" className="back-link">← Back to case studies</Link>
            <h1>{caseStudy.title}</h1>
            <div className="case-study-meta">
              <span className="case-study-year">{caseStudy.year}</span>
              <span className="case-study-tags">{caseStudy.tags.join(' • ')}</span>
            </div>
          </header>
          
          <div className="case-study-featured-image">
            <img src={caseStudy.image} alt={caseStudy.title} />
          </div>
          
          <div className="case-study-content markdown-content">
            <ReactMarkdown>
              {caseStudy.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </Layout>
  );
} 