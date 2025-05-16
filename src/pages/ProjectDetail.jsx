import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProjectDetail() {
  const { id } = useParams();
  return (
    <div className="section">
      <h2>Project {id}</h2>
      <p>Project details coming soon...</p>
    </div>
  );
} 