import React from 'react';

export default function Bio() {
  return (
    <section className="section bio">
      <div className="bio-content">
        <h1 className="bio-name">Hi, I am Shivam,<br />Creative Technologist</h1>
        <p className="bio-description">
        I’m a Technical Lead at Delhivery, where I lead a team of 8 engineers focused on solving complex challenges in logistics technology. My strength lies in identifying problems early and designing scalable, reliable solutions that drive business impact. I have hands-on expertise with Python, AWS (including large-scale cloud migrations like the Singapore to Mumbai infrastructure move), Typescript, Node.js, and Golang. My deep understanding of these technologies enables me to architect and deliver robust systems efficiently. Before Delhivery, I was a Senior Software Engineer at Ula, where I tackled real-world problems in supply chain tech, sharpening my ability to solve complex software challenges under demanding conditions. I’ve also partnered closely with clients across Healthcare, Payments, Card Tokenization, and Lending domains—delivering innovative, problem-driven solutions that meet critical business needs.

        </p>
        <a href="/resume.pdf" className="download-button">Download Resume</a>
      </div>
      <div className="bio-image">
        <img src="/images/profile.png" alt="Shivam" />
      </div>
    </section>
  );
} 