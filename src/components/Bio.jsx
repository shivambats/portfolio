import React from 'react';

export default function Bio() {
  return (
    <section className="section bio">
      <div className="bio-content">
        <h1 className="bio-name">Hi, I am Shivam,<br />Creative Technologist</h1>
        <p className="bio-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
          Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <a href="/resume.pdf" className="download-button">Download Resume</a>
      </div>
      <div className="bio-image">
        <img src="/public/images/profile.png" alt="Shivam" />
      </div>
    </section>
  );
} 