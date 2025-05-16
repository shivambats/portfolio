import React from 'react';
import Layout from '../components/Layout';
import Contact from '../components/Contact';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <Layout>
      <div className="container">
        <header className="page-header">
          <Link to="/" className="back-link">← Home</Link>
          <h1>Contact</h1>
        </header>
        <Contact />
      </div>
    </Layout>
  );
} 