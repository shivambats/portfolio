import React from 'react';
import Layout from './components/Layout';
import Bio from './components/Bio';
import CaseStudies from './components/CaseStudies';
import Blog from './components/Blog';
import Contact from './components/Contact';

export default function App() {
  return (
    <Layout>
      <div className="container">
        <Bio />
        <Blog limit={5} />
        <CaseStudies limit={5} />
        <Contact />
      </div>
    </Layout>
  );
} 