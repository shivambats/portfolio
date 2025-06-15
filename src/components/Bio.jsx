import React from 'react';
import { Link } from 'react-router-dom';

export default function Bio() {
  return (
    <section className="section bio">
      <div className="bio-content">
        <h1 className="bio-name">Hi, I am Shivam</h1>
        <h2 className="bio-subtitle">Helping Businesses Scale with <Link to="/posts?tag=Cloud" className="highlight-domain clickable-tag">Cloud</Link>, <Link to="/posts?tag=Automation" className="highlight-domain clickable-tag">Automation</Link>, and <Link to="/posts?tag=AI" className="highlight-domain clickable-tag">AI</Link></h2>
        <p className="bio-description">
        A <span className="highlight-impactful">seasoned software developer</span> with <span className="highlight-impactful">over a decade of experience</span> helping businesses embrace technology that drives real impact. I specialize in working with small and medium-sized businesses (SMBs), offering <span className="highlight-impactful">cost-effective, secure, and scalable solutions</span> that follow industry best practices.
        </p>
        <p className="bio-description">
        Over the years, I've helped <span className="highlight-impactful">dozens of clients</span> successfully migrate to the cloud, modernize their infrastructure, and automate time-consuming processes using <span className="highlight-impactful">cloud-native software and AI-driven tools</span>. Whether you're moving from on-premise systems, manual spreadsheets, or outdated software, I design solutions that are reliable, efficient, and tailored to your budget.
        </p>
        <p className="bio-description">
        Previously, I <span className="highlight-impactful">led engineering teams</span> at <strong className="highlight-company">Delhivery</strong>, India's leading logistics company, where I <span className="highlight-impactful">designed and scaled large systems</span> handling complex operations, including cloud migrations from Singapore to Mumbai. I've also solved critical challenges in supply chain technology at <strong className="highlight-company">Ula</strong> and delivered software for clients across <Link to="/posts?tag=Healthcare" className="highlight-domain clickable-tag">Healthcare</Link>, <Link to="/posts?tag=Payments" className="highlight-domain clickable-tag">Payments</Link>, <Link to="/posts?tag=Card%20Tokenization" className="highlight-domain clickable-tag">Card Tokenization</Link>, <Link to="/posts?tag=Lending" className="highlight-domain clickable-tag">Lending</Link>, and <Link to="/posts?tag=Logistics" className="highlight-domain clickable-tag">Logistics</Link>—all with a sharp focus on security, compliance, and business value.
        </p>
        <p className="bio-description">
        I bring hands-on expertise in <span className="highlight-tech">Python</span>, <span className="highlight-tech">AWS</span>, <span className="highlight-tech">Typescript</span>, <span className="highlight-tech">Node.js</span>, and <span className="highlight-tech">Golang</span> to build <span className="highlight-impactful">robust, future-ready systems</span>. More importantly, I pride myself on <span className="highlight-impactful">understanding your business first</span>, building only what you need, and doing it right the first time.
        </p>
        <p className="bio-description">
        If you're looking for a <span className="highlight-impactful">reliable partner</span> to modernize your systems, lower costs, and automate your workflows, let's talk.
        </p>
        <a href="https://calendly.com/shivambats/syncup" target="_blank" rel="noopener noreferrer" className="download-button">Schedule a Call</a>
      </div>
      <div className="bio-image">
        <img src="/images/A63563C1-6F1E-46CB-9D4E-526BF1F010DB-Photoroom.png" alt="Shivam" />
      </div>
    </section>
  );
} 