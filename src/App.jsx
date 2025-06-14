import React from 'react';
import Layout from './components/Layout';
import Bio from './components/Bio';
import Companies from './components/Companies';
import Posts from './components/CaseStudies';
import Contact from './components/Contact';

export default function App() {
  return (
    <Layout>
      <div className="container">
        <Bio />
        <Companies />
        <Posts limit={5} />
        <Contact />
      </div>
    </Layout>
  );
} 