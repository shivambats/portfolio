import React from 'react';

export function BlogSkeleton() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-meta"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
}

export function CaseStudySkeleton() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-meta"></div>
      </div>
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
} 