import React from 'react';
import { Link } from 'react-router-dom';

export default function Bio() {
  return (
    <section className="section bio">
      <div className="bio-content">
        <h1 className="bio-name">Hi, I am Shivam</h1>
        <h2 className="bio-subtitle">Helping Businesses Scale with <Link to="/posts?tag=Cloud" className="highlight-domain clickable-tag">Cloud</Link>, <Link to="/posts?tag=Automation" className="highlight-domain clickable-tag">Automation</Link>, and <Link to="/posts?tag=AI" className="highlight-domain clickable-tag">AI</Link></h2>
        <p className="bio-description">
        I'm <span className="highlight-impactful">Shivam Batra</span>, a <span className="highlight-impactful">backend engineer</span> with <span className="highlight-impactful">8+ years of experience</span> building distributed systems in the logistics, supply chain, and payments domains.
        </p>
        <p className="bio-description">
        At <strong className="highlight-company">Delhivery</strong>, I've led the architecture and scale-up of first-mile platforms handling <span className="highlight-impactful">5M+ shipments/day</span>, designed a payouts platform for <span className="highlight-impactful">100K+ users</span>, and integrated AI-driven dispatch using <span className="highlight-tech">Kafka</span>-based async systems. I've also modernized legacy systems by migrating monoliths to event-driven microservices, improving performance and reducing compute costs by over <span className="highlight-impactful">65%</span>.
        </p>
        <p className="bio-description">
        Previously at <strong className="highlight-company">Ula</strong>, I built procurement and warehouse systems using <span className="highlight-tech">Python</span> and <span className="highlight-tech">Golang</span>, improved inventory accuracy with smart inter-warehouse transfers, and developed order throttling infra with <span className="highlight-tech">Kafka</span>, <span className="highlight-tech">Redis</span>, and <span className="highlight-tech">AWS</span>.
        </p>
        <p className="bio-description">
        My focus areas include scalable logistics systems (pickup, dispatch, inventory orchestration), financial infrastructure (payouts, reconciliation, invoicing), and distributed architecture (<span className="highlight-tech">Kafka</span>, <span className="highlight-tech">Postgres</span>, <span className="highlight-tech">Redis</span>, <span className="highlight-tech">AWS Lambda</span>). I enjoy solving real-world scale problems and designing systems that are <span className="highlight-impactful">reliable, observable, and easy to evolve</span>.
        </p>
        <a href="https://calendly.com/shivambats/syncup" target="_blank" rel="noopener noreferrer" className="download-button">Schedule a Call</a>
      </div>
      <div className="bio-image">
        <img src="/images/A63563C1-6F1E-46CB-9D4E-526BF1F010DB-Photoroom.png" alt="Shivam" />
      </div>
    </section>
  );
} 