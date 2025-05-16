import React from 'react';
import Layout from '../components/Layout';
import Blog from '../components/Blog';
import { Link } from 'react-router-dom';

export default function AllBlogs() {
  return (
    <Layout>
      <div className="container">
        <header className="page-header">
          <Link to="/" className="back-link">← Home</Link>
          <h1>All Blog Posts</h1>
        </header>
        <Blog />
      </div>
    </Layout>
  );
} 