import React from 'react';
import CaseStudies from '../components/CaseStudies';
import { Link } from 'react-router-dom';

export default function AllCaseStudies() {
  return (
    <div className="container">
      <header className="page-header">
        <Link to="/" className="back-link">← Home</Link>
        <h1>All Case Studies</h1>
      </header>
      <CaseStudies />
    </div>
  );
} 